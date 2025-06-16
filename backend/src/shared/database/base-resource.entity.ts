import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export abstract class BaseResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "now()" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "now()",
    onUpdate: "now()"
  })
  updatedAt: Date;
}