import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Player } from "./player.entity";

@Entity({ name: 'teams' })
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  flag: string;

  @Column({ default: false })
  winner: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  updatedAt: Date;
}