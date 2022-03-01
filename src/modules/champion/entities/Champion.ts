import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Round } from "../../round/entities/Round";
import { User } from "../../user/entities/User";

@Entity("chanpion")
class Champion {
  @PrimaryColumn("uuid")
  readonly id: string;
  @Column()
  name: string;

  @Column()
  puntuação: string;

  @ManyToMany(() => Round)
  @JoinTable()
  rounds: Round[];

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Champion };
