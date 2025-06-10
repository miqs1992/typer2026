import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Team } from "./team.entity";

@Entity({ name: 'players' })
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Team,
    (team) => team.players,
    { eager: true, nullable: false }
  )
  team: Team;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'int', default: 0 })
  goals: number;

  @Column({ type: 'int', default: 0 })
  assists: number;

  @Column({ default: false })
  king: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  updatedAt: Date;
}