import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

interface Education {
  school: string;
  major: string;
  degree: string;
  period: string;
}

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  birth_date: string;

  @Column({ type: "simple-json", nullable: true })
  education: Education[];

  @Column({ type: "simple-json", nullable: true })
  experience: Experience[];

  @Column("simple-array", { nullable: true })
  skills: string[];

  @Column({ type: "text", nullable: true })
  self_evaluation: string;

  @Column({ nullable: true })
  job_intention: string;

  @Column({ nullable: true })
  intended_city: string;

  @Column("simple-array", { nullable: true })
  certificates: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
