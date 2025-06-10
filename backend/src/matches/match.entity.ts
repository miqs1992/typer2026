import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MatchDay } from "../match-days/match-day.entity";
import { Team } from "../teams/team.entity";

@Entity({ name: 'matches' })
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => MatchDay,
    (matchDay) => matchDay.matches,
    { eager: true, nullable: false }
  )
  matchDay: MatchDay;

  @ManyToOne(
    () => Team,
    undefined,
    { eager: true, nullable: false }
  )
  firstTeam: Team;

  @ManyToOne(
    () => Team,
    undefined,
    { eager: true, nullable: false }
  )
  secondTeam: Team;

  @Column({ unique: true, type: 'int', default: 0 })
  firstTeamResult: number;

  @Column({ unique: true, type: 'int', default: 0 })
  secondTeamResult: number;

  @CreateDateColumn({ type: "timestamp" })
  startsAt: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  updatedAt: Date;
}