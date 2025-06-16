import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from "typeorm";
import { Round } from "../rounds/round.entity";
import { Match } from "../matches/match.entity";
import { BaseResource } from "../shared/database/base-resource.entity";

@Entity({ name: 'match_days' })
export class MatchDay extends BaseResource {
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
}