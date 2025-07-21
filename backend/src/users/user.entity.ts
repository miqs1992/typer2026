import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Team } from "../teams/team.entity";
import { Player } from "../teams/player.entity";
import { BaseResource } from "../shared/database/base-resource.entity";
import { Bet } from "../betting/bet.entity";

@Entity({ name: 'users' })
export class User extends BaseResource {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, select: false })
  clerkId: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  hasPaid: boolean;

  @Column({ type: 'float', default: 0 })
  points: number;

  @Column({ type: 'int', default: 0 })
  exactBetCount: number;

  @Column({ type: 'int', default: 0 })
  leagueRank: number;

  @ManyToOne(
    () => Team,
    undefined,
    { eager: true, nullable: true }
  )
  winner: Team;

  @ManyToOne(
    () => Player,
    undefined,
    { eager: true, nullable: true }
  )
  topScorer: Player;

  @OneToMany(() => Bet, (bet) => bet.user)
  bets: Bet[];
}