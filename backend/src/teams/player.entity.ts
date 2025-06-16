import { Column, Entity, ManyToOne } from "typeorm";
import { Team } from "./team.entity";
import { BaseResource } from "../shared/database/base-resource.entity";

@Entity({ name: 'players' })
export class Player extends BaseResource {
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
}