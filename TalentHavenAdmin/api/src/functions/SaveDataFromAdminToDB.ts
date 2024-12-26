import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { JobOffer } from "../entities/JobOffer"; // Import the JobOffer entity class
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";

/**
 * Handles saving job offer data to the PostgreSQL database using TypeORM.
 *
 * @param {HttpRequest} request - The HTTP request object containing the job offer data.
 * @param {InvocationContext} context - Azure Functions context object for logging and execution context.
 * @returns {Promise<HttpResponseInit>} The HTTP response object indicating success or failure.
 */
export async function handleSaveJobOffer(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    context.log(`Processing HTTP request for URL: "${request.url}"`);

    let jobOfferData: JobOffer;

    try {
        // Extract and parse the request body
        const rawRequestBody = await request.text();

        try {
            jobOfferData = JSON.parse(rawRequestBody);
        } catch {
            context.log("Malformed JSON in the request body.");
            return createHttpResponse(400, { error: "Invalid JSON format" });
        }

         // Create entity instance
         const jobOffer = new JobOffer();
         Object.assign(jobOffer, jobOfferData);
 
         // Validate the entity
         const errors = await validate(jobOffer);
         if (errors.length > 0) {
             const validationErrors = errors.reduce((acc, err) => {
                 return {
                     ...acc,
                     [err.property]: Object.values(err.constraints || {})
                 };
             }, {});
             
             return createHttpResponse(400, {
                 error: "Validation failed",
                 details: validationErrors
             });
         }

        // Ensure the connection is established
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        context.log("Connected to the database successfully.");
        // Get the repository for the JobOffer entity
        const jobOfferRepository = AppDataSource.getRepository(JobOffer);

        // Create and save the job offer data to the PostgreSQL database
        const newJobOffer = jobOfferRepository.create(jobOfferData);
        await jobOfferRepository.save(newJobOffer);

        context.log(`Job offer saved successfully with ID: ${newJobOffer.id}`);

        return createHttpResponse(200, {
            message: "Job offer saved successfully.",
            id: newJobOffer.id.toString(),
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
        context.log(`An error occurred: ${errorMessage}`);
        return createHttpResponse(500, {
            error: "An internal server error occurred.",
            details: errorMessage,
        });
    }
}

/**
 * Creates a structured HTTP response.
 *
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {Record<string, unknown>} responseBody - The response body as a JSON object.
 * @returns {HttpResponseInit} A formatted HTTP response object.
 */
function createHttpResponse(statusCode: number, responseBody: Record<string, unknown>): HttpResponseInit {
    return {
        status: statusCode,
        body: JSON.stringify(responseBody),
    };
}

// Register the HTTP function with the Azure Functions runtime
app.http("handleSaveJobOffer", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: handleSaveJobOffer,
});
