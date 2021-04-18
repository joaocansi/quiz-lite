import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Player from '../../../players/typeorm/entities/Player';

@Entity()
class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  questions: string;

  @OneToMany(() => Player, player => player.quiz)
  players: Player[];

  @Column({ nullable: false })
  resultCode: string;

  @Column({ nullable: false })
  code: string;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Quiz;