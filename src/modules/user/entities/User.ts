import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Bet } from "../../bet/entities/Bet";
import { Championship } from "../../championship/entities/Championship";

@Entity("user")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @Column("decimal", { default: 0 })
  balance: number;

  @OneToMany(() => Bet, (bet) => bet.user)
  bets: Bet[];

  @ManyToMany(() => Championship)
  @JoinTable()
  championships: Championship[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.isAdmin = false;
    }
  }
}
