import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Championship } from "../../championship/entities/Championship";
import { Round } from "../../round/entities/Round";
import { User } from "../../user/entities/User";

@Entity("bet")
export class Bet {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  status: string;

  @Column("smallint")
  scoreboard: number;

  @Column("uuid")
  round_id: string;
  @ManyToOne(() => Round, (round) => round.bets)
  @JoinColumn({ name: "round_id" })
  round: Round;

  @Column("uuid")
  chapionship_id: string;
  @ManyToOne(() => Championship, (championship) => championship.bets)
  @JoinColumn({ name: "chapionship_id" })
  chapionship: Championship;

  @Column("uuid")
  user_id: string;
  @ManyToOne(() => User, (user) => user.bets)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column("smallint")
  punctuation: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
