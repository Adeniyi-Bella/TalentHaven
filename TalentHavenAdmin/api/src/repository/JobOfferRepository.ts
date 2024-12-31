import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";  // Import the data source
import { JobOffer } from "../entities/JobOffer"; // Import the JobOffer entity

/**
 * Repository class for managing job offers in the database.
 * This class abstracts the database operations for job offers and ensures that the database connection is initialized once.
 */
export class JobOfferRepository {

    private jobOfferRepository: Repository<JobOffer>;

    /**
     * Initializes an instance of the JobOfferRepository class.
     * The constructor ensures that the database connection is initialized only once.
     */
    constructor() {
        // Initialize repository and ensure the database connection is only initialized once
        this.initializeDatabase();
        this.jobOfferRepository = AppDataSource.getRepository(JobOffer);
    }

    /**
     * Ensures the database connection is initialized.
     * This method checks if the database is already initialized and if not, initializes it.
     */
    private async initializeDatabase() {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
    }

    /**
     * Creates a new job offer in the database.
     * @param {JobOffer} jobOffer - The job offer object to be created.
     * @returns {Promise<JobOffer>} - The saved job offer object.
     */
    async createJobOffer(jobOffer: JobOffer): Promise<JobOffer> {
        const newJobOffer = this.jobOfferRepository.create(jobOffer);
        return await this.jobOfferRepository.save(newJobOffer);
    }

    /**
     * Retrieves a job offer by its ID.
     * @param {string} id - The ID of the job offer to retrieve.
     * @returns {Promise<JobOffer | null>} - The job offer object, or null if not found.
     */
    async getJobOffer(id: string): Promise<JobOffer | null> {
        return await this.jobOfferRepository.findOne({ where: { id: Number(id) } });
    }

    /**
     * Updates an existing job offer in the database.
     * @param {JobOffer} jobOffer - The job offer object with updated data.
     * @returns {Promise<JobOffer>} - The updated job offer object.
     */
    async updateJobOffer(jobOffer: JobOffer): Promise<JobOffer> {
        return await this.jobOfferRepository.save(jobOffer);
    }

    /**
     * Deletes a job offer by its ID.
     * @param {string} id - The ID of the job offer to delete.
     * @returns {Promise<void>} - Resolves when the job offer is deleted.
     */
    async deleteJobOffer(id: string): Promise<void> {
        const jobOffer = await this.jobOfferRepository.findOne({ where: { id: Number(id) } });
        if (jobOffer) {
            await this.jobOfferRepository.remove(jobOffer);
        }
    }
}
