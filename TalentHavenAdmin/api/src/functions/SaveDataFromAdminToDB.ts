import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { MongoClient } from "mongodb";

interface JobOffer {
    description: string;
    position: string;
}

/** 
 * MongoDB configuration details
 */
const MONGO_URI: string = process.env.MONGO_URI;
const DATABASE_NAME: string = process.env.DB;
const JOB_OFFER_COLLECTION: string =process.env.OFFER_MONGO_COLLECTION;

/**
 * Handles saving job offer data to the MongoDB database.
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

    const mongoClient = new MongoClient(MONGO_URI);

    try {
        // Extract and parse the request body
        const rawRequestBody = await request.text();
        let jobOfferData: JobOffer;

        try {
            jobOfferData = JSON.parse(rawRequestBody);
        } catch {
            context.log("Malformed JSON in the request body.");
            return createHttpResponse(400, { error: "Unable to add data" });
        }

        // Check DataType
        if (!jobOfferData.description || !jobOfferData.position) {
            context.log("Missing required fields in the job offer data.");
            return createHttpResponse(400, { error: "Unable to add data" });
        }

        // Connect to the MongoDB database
        await mongoClient.connect();
        const jobOfferCollection = mongoClient.db(DATABASE_NAME).collection(JOB_OFFER_COLLECTION);

        // Insert the job offer data into the collection
        const insertResult = await jobOfferCollection.insertOne(jobOfferData);
        context.log(`Job offer saved successfully with ID: ${insertResult.insertedId}`);

        return createHttpResponse(200, {
            message: "Job offer saved successfully.",
            id: insertResult.insertedId.toString(),
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
        context.log(`An error occurred: ${errorMessage}`);
        return createHttpResponse(500, {
            error: "An internal server error occurred.",
            details: errorMessage,
        });

    } finally {
        // Ensure the MongoDB client is properly closed
        await mongoClient.close();
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
