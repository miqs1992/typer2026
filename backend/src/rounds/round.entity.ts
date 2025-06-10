import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { RoundStage } from "./rounds.type";
import { MatchDay } from "../match-days/match-day.entity";

@Entity({ name: 'rounds' })
export class Round {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, type: 'int' })
  order: number;

  @Column({ type: 'float', default: 1 })
  scoreFactor: number;

  @Column({
    type: "enum",
    enum: RoundStage,
    default: RoundStage.GROUP
  })
  stage: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  updatedAt: Date;

  @OneToMany(() => MatchDay, (matchDay) => matchDay.round)
  matchDays: MatchDay[];
}