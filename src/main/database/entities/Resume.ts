import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column()
  experience: string;

  @Column()
  education: string;

  @Column({ type: "text", nullable: true })
  skills: string;

  @Column({ type: "text", nullable: true })
  workExperience: string;

  @Column({ type: "text", nullable: true })
  educationHistory: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
