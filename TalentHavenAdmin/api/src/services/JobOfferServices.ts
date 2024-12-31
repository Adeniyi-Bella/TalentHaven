import { JobOfferRepository } from "../repository/JobOfferRepository";
import { JobOffer } from "../entities/JobOffer";
import { validate } from "class-validator";
import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

/**
 * Interface defining the methods for managing job offers.
 */
export interface IJobOfferService {
    createJobOffer(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit>;
    getJobOffer(id: string): Promise<HttpResponseInit>;
    updateJobOffer(request: HttpRequest, id: string): Promise<HttpResponseInit>;
    deleteJobOffer(id: string): Promise<HttpResponseInit>;
}

/**
 * Service class for managing job offers.
 * This class provides methods for creating, retrieving, updating, and deleting job offers.
 * It interacts with the JobOfferRepository for database operations and includes validation logic.
 */
export class JobOfferService implements IJobOfferService {
    private jobOfferRepository: JobOfferRepository;

    /**
     * Initializes a new instance of the JobOfferService class.
     * The constructor initializes an instance of JobOfferRepository.
     */
    constructor() {
        this.jobOfferRepository = new JobOfferRepository();
    }

    /**
     * Creates a new job offer.
     * @async
     * @param {HttpRequest} request - The HTTP request containing the job offer data in JSON format.
     * @param {InvocationContext} context - The Azure Functions invocation context for logging and metadata.
     * @returns {Promise<HttpResponseInit>} - An HTTP response object with the result of the create operation.
     * @throws {Error} - If the request contains invalid JSON or validation fails.
     */
    async createJobOffer(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
        let jobOfferData: JobOffer;
        const rawRequestBody = await request.text();

        try {
            jobOfferData = JSON.parse(rawRequestBody);
        } catch (error) {
            throw new Error("Invalid JSON format");
        }

        const jobOffer = new JobOffer();
        Object.assign(jobOffer, jobOfferData);

        const errors = await validate(jobOffer);
        if (errors.length > 0) {
            throw new Error("Validation failed");
        }

        const newJobOffer = await this.jobOfferRepository.createJobOffer(jobOffer);
        context.log(`Job offer saved successfully with ID: ${newJobOffer.id}`);

        return {
            status: 200,
            body: JSON.stringify({
                message: "Job offer saved successfully.",
                id: newJobOffer.id.toString(),
            }),
        };
    }

    /**
     * Retrieves a specific job offer by ID.
     * @async
     * @param {string} id - The ID of the job offer to retrieve.
     * @returns {Promise<HttpResponseInit>} - An HTTP response object containing the job offer data or an error message.
     */
    async getJobOffer(id: string): Promise<HttpResponseInit> {
        const jobOffer = await this.jobOfferRepository.getJobOffer(id);
        if (!jobOffer) {
            return {
                status: 404,
                body: JSON.stringify({ error: "Job offer not found." }),
            };
        }

        return {
            status: 200,
            body: JSON.stringify({ jobOffer }),
        };
    }

    /**
     * Updates an existing job offer by ID.
     * @async
     * @param {HttpRequest} request - The HTTP request containing the updated job offer data in JSON format.
     * @param {string} id - The ID of the job offer to update.
     * @returns {Promise<HttpResponseInit>} - An HTTP response object with the result of the update operation.
     * @throws {Error} - If the request contains invalid JSON or validation fails.
     */
    async updateJobOffer(request: HttpRequest, id: string): Promise<HttpResponseInit> {
        const rawRequestBody = await request.text();
        let jobOfferData: JobOffer;

        try {
            jobOfferData = JSON.parse(rawRequestBody);
        } catch (error) {
            throw new Error("Invalid JSON format");
        }

        const jobOffer = await this.jobOfferRepository.getJobOffer(id);
        if (!jobOffer) {
            return {
                status: 404,
                body: JSON.stringify({ error: "Job offer not found." }),
            };
        }

        Object.assign(jobOffer, jobOfferData);

        const errors = await validate(jobOffer);
        if (errors.length > 0) {
            throw new Error("Validation failed");
        }

        await this.jobOfferRepository.updateJobOffer(jobOffer);

        return {
            status: 200,
            body: JSON.stringify({ message: "Job offer updated successfully." }),
        };
    }

    /**
     * Deletes a job offer by ID.
     * @async
     * @param {string} id - The ID of the job offer to delete.
     * @returns {Promise<HttpResponseInit>} - An HTTP response object with the result of the delete operation.
     */
    async deleteJobOffer(id: string): Promise<HttpResponseInit> {
        const jobOffer = await this.jobOfferRepository.getJobOffer(id);
        if (!jobOffer) {
            return {
                status: 404,
                body: JSON.stringify({ error: "Job offer not found." }),
            };
        }

        await this.jobOfferRepository.deleteJobOffer(id);

        return {
            status: 200,
            body: JSON.stringify({ message: "Job offer deleted successfully." }),
        };
    }
}
