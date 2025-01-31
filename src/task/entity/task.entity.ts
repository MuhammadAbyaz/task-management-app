import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { Exclude } from 'class-transformer';

export enum TaskStatus {
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.IN_PROGRESS })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.task, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
