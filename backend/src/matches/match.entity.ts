import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { MatchDay } from "../match-days/match-day.entity";
import { Team } from "../teams/team.entity";
import { BaseResource } from "../shared/database/base-resource.entity";

@Entity({ name: 'matches' })
export class Match extends BaseResource {
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
}