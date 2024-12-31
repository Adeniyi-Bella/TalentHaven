/**
 * This module defines HTTP endpoints for managing job offers using Azure Functions.
 * It provides handlers for creating, retrieving, updating, and deleting job offers.
 * Each endpoint delegates the request processing to the JobOfferController.
 */
import {
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
    app,
} from "@azure/functions";
import { JobOfferController } from "../controllers/JobOfferController";
import { JobOfferService } from "../services/JobOfferServices";


// The following instances are created once per Azure Functions host process lifecycle. 
// These instances are reused for all incoming HTTP requests handled by this module.
const jobOfferService = new JobOfferService();
const jobOfferController = new JobOfferController(jobOfferService); 

/**
 * HTTP endpoint for creating a job offer.
 * @function createJobOffer
 * @method POST
 * @authLevel anonymous
 * @param {HttpRequest} request - The incoming HTTP request object.
 * @param {InvocationContext} context - The Azure Functions invocation context.
 * @returns {Promise<HttpResponseInit>} - The HTTP response with the result of the create operation.
 */
app.http("createJobOffer", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
        return await jobOfferController.createJobOffer(request, context);
    },
});

/**
 * HTTP endpoint for retrieving a job offer.
 * @function getJobOffer
 * @method GET
 * @authLevel anonymous
 * @param {HttpRequest} request - The incoming HTTP request object.
 * @param {InvocationContext} context - The Azure Functions invocation context.
 * @returns {Promise<HttpResponseInit>} - The HTTP response with the retrieved job offer data.
 */
app.http("getJobOffer", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
        return await jobOfferController.getJobOffer(request, context);
    },
});

/**
 * HTTP endpoint for updating a job offer.
 * @function updateJobOffer
 * @method PUT
 * @authLevel anonymous
 * @param {HttpRequest} request - The incoming HTTP request object.
 * @param {InvocationContext} context - The Azure Functions invocation context.
 * @returns {Promise<HttpResponseInit>} - The HTTP response with the result of the update operation.
 */
app.http("updateJobOffer", {
    methods: ["PUT"],
    authLevel: "anonymous",
    handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
        return await jobOfferController.updateJobOffer(request, context);
    },
});

/**
 * HTTP endpoint for deleting a job offer.
 * @function deleteJobOffer
 * @method DELETE
 * @authLevel anonymous
 * @param {HttpRequest} request - The incoming HTTP request object.
 * @param {InvocationContext} context - The Azure Functions invocation context.
 * @returns {Promise<HttpResponseInit>} - The HTTP response with the result of the delete operation.
 */
app.http("deleteJobOffer", {
    methods: ["DELETE"],
    authLevel: "anonymous",
    handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
        return await jobOfferController.deleteJobOffer(request, context);
    },
});
