// entities/JobOffer.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsNotEmpty, MaxLength } from "class-validator";

@Entity()
export class JobOffer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @Column({ length: 100 })
    @IsString()
    @IsNotEmpty({ message: "Position is required" })
    @MaxLength(100, { message: "Position must not exceed 100 characters" })
    position: string;
}
