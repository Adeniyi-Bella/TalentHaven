import { DataSource } from "typeorm";
import { JobOffer } from "./entities/JobOffer";

/**
 * Database configuration details for PostgreSQL
 */
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST_SERVER,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER, 
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE, 
    synchronize: true, // Automatically sync the schema (use cautiously in production)
    entities: [JobOffer], // Specify the entities (tables) that TypeORM will manage
    migrations: ["src/migrations/*.ts"],
    ssl: {
        rejectUnauthorized: false, // To be set to True later
    },
});
