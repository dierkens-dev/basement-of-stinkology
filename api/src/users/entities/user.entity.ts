import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Achievement } from '../../achievements/entities/achievement.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  email?: string;
  @Column({ nullable: true })
  firstName?: string;
  @Column({ nullable: true })
  lastName?: string;
  @Column({ nullable: true })
  slogan?: string;
  @Column({ nullable: true })
  gamertag?: string;
  @Column({ nullable: true })
  avatar?: string;
  @ManyToMany(() => Achievement, (ach) => ach.id, { eager: true })
  @JoinTable()
  achievements?: Achievement[];
}
