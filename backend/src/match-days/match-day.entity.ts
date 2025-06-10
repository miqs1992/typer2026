import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Round } from "../rounds/round.entity";
import { Match } from "../matches/match.entity";

@Entity({ name: 'match_days' })
export class MatchDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Round,
    (round) => round.matchDays,
    { eager: true, nullable: false }
  )
  round: Round;

  @OneToMany(() => Match, (match) => match.matchDay)
  matches: Match[];

  @Column({ unique: true, type: 'int' })
  dayNumber: number;

  @CreateDateColumn({ type: "timestamp" })
  stopBetTime: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  updatedAt: Date;
}