import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Categories } from "./Categories";

@Entity("videos")
class Videos {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Categories)
  @JoinColumn({ name: "category_id" })
  category: Categories;

  @Column()
  category_id: string;

  @Column()
  duration: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Videos };
