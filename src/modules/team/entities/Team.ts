import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Bet } from "../../bet/entities/Bet";
import { Championship } from "../../championship/entities/Championship";

@Entity("teams")
export class Team {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column("uuid")
  championship_id: string;

  @ManyToOne(() => Championship, (championship) => championship.teams)
  @JoinColumn({ name: "championship_id" })
  championship: Championship;

  @ManyToMany(() => Bet)
  @JoinTable()
  bets: Bet[];

  @Column({ nullable: true })
  shield: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
