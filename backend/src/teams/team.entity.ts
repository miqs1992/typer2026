import { Column, Entity, OneToMany } from "typeorm";
import { Player } from "./player.entity";
import { BaseResource } from "../shared/database/base-resource.entity";

@Entity({ name: 'teams' })
export class Team extends BaseResource {
  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  flag: string;

  @Column({ default: false })
  winner: boolean;
}