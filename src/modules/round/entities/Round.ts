import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Bet } from "../../bet/entities/Bet";
import { Championship } from "../../championship/entities/Championship";

@Entity("round")
class Round {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column("uuid")
  championship_id: string;

  @ManyToOne(() => Championship, (championship) => championship.rounds)
  @JoinColumn({ name: "championship_id" })
  championship: Championship;

  @OneToMany(() => Bet, (bet) => bet.round)
  bets: Bet[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Round };
