import { Column, CreateDateColumn, Entity, ManyToOne, Unique, BeforeInsert, BeforeUpdate } from "typeorm";
import { MatchDay } from "../match-days/match-day.entity";
import { Team } from "../teams/team.entity";
import { BaseResource } from "../shared/database/base-resource.entity";

@Entity({ name: 'matches' })
@Unique(["firstTeam", "secondTeam", "matchDay"])
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

  @Column({ type: 'int', default: 0 })
  firstTeamResult: number;

  @Column({ type: 'int', default: 0 })
  secondTeamResult: number;

  @CreateDateColumn({ type: "timestamp" })
  startsAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  validateTeamsDifferent() {
    if (this.firstTeam && this.secondTeam && this.firstTeam.id === this.secondTeam.id) {
      throw new Error('First team and second team must be different');
    }
  }
}