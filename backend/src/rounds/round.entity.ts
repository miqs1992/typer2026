import { Column, Entity, OneToMany } from 'typeorm';
import { RoundStage } from "./rounds.type";
import { MatchDay } from "../match-days/match-day.entity";
import { BaseResource } from "../shared/database/base-resource.entity";

@Entity({ name: 'rounds' })
export class Round extends BaseResource {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true, type: 'int' })
  order: number;

  @Column({ type: 'float', default: 1 })
  scoreFactor: number;

  @Column({
    type: "enum",
    enum: RoundStage,
    default: RoundStage.GROUP
  })
  stage: string;

  @OneToMany(() => MatchDay, (matchDay) => matchDay.round)
  matchDays: MatchDay[];
}