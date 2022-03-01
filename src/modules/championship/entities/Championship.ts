import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Bet } from "../../bet/entities/Bet";
import { Round } from "../../round/entities/Round";
import { Team } from "../../team/entities/Team";

@Entity("championship")
class Championship {
  @PrimaryColumn("uuid")
  readonly id: string;
  @Column()
  name: string;

  @OneToMany(() => Bet, (bet) => bet.chapionship)
  bets: Bet[];

  @OneToMany(() => Round, (round) => round.championship)
  rounds: Round[];

  @OneToMany(() => Team, (team) => team.championship)
  teams: Team[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Championship };
