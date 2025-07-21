import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { BaseResource } from "../shared/database/base-resource.entity";
import { Match } from "../matches/match.entity";
import { User } from "../users/user.entity";

@Entity({ name: 'bets' })
@Unique(["user", "match"])
export class Bet extends BaseResource {
  @ManyToOne(
    () => Match,
    (match) => match.bets,
    { eager: true, nullable: false }
  )
  match: Match;

  @ManyToOne(
    () => User,
    (user) => user.bets,
    { nullable: false }
  )
  user: User;

  @Column({ type: 'int', default: 0 })
  firstTeamResult: number;

  @Column({ type: 'int', default: 0 })
  secondTeamResult: number;

  @Column({ type: 'boolean', default: false })
  hasBonus: boolean;

  @Column({ type: 'float', default: 0 })
  points: number;

  @Column({ type: 'boolean', default: false })
  isExact: boolean;
}