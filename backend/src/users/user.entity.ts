import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Team } from "../teams/team.entity";
import { Player } from "../teams/player.entity";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  encryptedPassword: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  hasPaid: boolean;

  @Column({ type: 'int', default: 0 })
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


  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}