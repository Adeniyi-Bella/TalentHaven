import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { IJobOfferService  } from "../services/JobOfferServices";

/**
 * Controller for managing job offers.
 * This class defines methods for creating, retrieving, updating, and deleting job offers.
 * It interacts with the JobOfferService to perform the underlying operations.
 */
export class JobOfferController {
    private jobOfferService: IJobOfferService ;

    /**
     * Initializes a new instance of the JobOfferController class.
     * The constructor initializes an instance of JobOfferService.
     */
    constructor(jobOfferService: IJobOfferService) {
        this.jobOfferService = jobOfferService;
    }

    /**
     * Handles the creation of a new job offer.
     * @async
     * @param {HttpRequest} request - The incoming HTTP request containing job offer data.
     * @param {InvocationContext} context - The Azure Functions invocation context for logging and metadata.
     * @returns {Promise<HttpResponseInit>} - The HTTP response containing the result of the operation.
     */
    async createJobOffer(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
        try {
            return await this.jobOfferService.createJobOffer(request, context);
        } catch (error) {
            context.log(`Error: ${error.message}`);
            return {
                status: 500,
                body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
            };
        }
    }

    /**
     * Retrieves a specific job offer by ID.
     * @async
     * @param {HttpRequest} request - The incoming HTTP request containing the job offer ID as a query parameter.
     * @param {InvocationContext} context - The Azure Functions invocation context for logging and metadata.
     * @returns {Promise<HttpResponseInit>} - The HTTP response containing the job offer data or an error message.
     */
    async getJobOffer(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
        try {
            const id = request.query.get("id");
            if (!id) {
                return {
                    status: 400,
                    body: JSON.stringify({ error: "ID is required to retrieve a job offer." }),
                };
            }

            return await this.jobOfferService.getJobOffer(id);
        } catch (error) {
            context.log(`Error: ${error.message}`);
            return {
                status: 500,
                body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
            };
        }
    }

    /**
     * Updates an existing job offer by ID.
     * @async
     * @param {HttpRequest} request - The incoming HTTP request containing updated job offer data.
     * @param {InvocationContext} context - The Azure Functions invocation context for logging and metadata.
     * @returns {Promise<HttpResponseInit>} - The HTTP response containing the result of the update operation.
     */
    async updateJobOffer(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
        try {
            const id = request.query.get("id");
            if (!id) {
                return {
                    status: 400,
                    body: JSON.stringify({ error: "ID is required to update a job offer." }),
                };
            }

            return await this.jobOfferService.updateJobOffer(request, id);
        } catch (error) {
            context.log(`Error: ${error.message}`);
            return {
                status: 500,
                body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
            };
        }
    }

    /**
     * Deletes a job offer by ID.
     * @async
     * @param {HttpRequest} request - The incoming HTTP request containing the job offer ID as a query parameter.
     * @param {InvocationContext} context - The Azure Functions invocation context for logging and metadata.
     * @returns {Promise<HttpResponseInit>} - The HTTP response containing the result of the delete operation.
     */
    async deleteJobOffer(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
        try {
            const id = request.query.get("id");
            if (!id) {
                return {
                    status: 400,
                    body: JSON.stringify({ error: "ID is required to delete a job offer." }),
                };
            }

            return await this.jobOfferService.deleteJobOffer(id);
        } catch (error) {
            context.log(`Error: ${error.message}`);
            return {
                status: 500,
                body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
            };
        }
    }
}
