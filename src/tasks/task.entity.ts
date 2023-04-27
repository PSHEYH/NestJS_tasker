
import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

enum NotificationTimeFormat {
  NONE = 'none',
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month'
}

enum RetryFormat {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 80, select: false })
  device_id: string;

  @Column({ type: 'unsigned big int' })
  category_id: number;

  @ManyToOne((type) => User, (user) => user.device_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: "device_id", referencedColumnName: "device_id" })
  user: User;

  @ManyToOne((type) => Category, (category) => category.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column("varchar", { length: 80 })
  title: string;
  ß
  @Column("varchar", { length: 150 })
  body: string;

  @Column({ type: 'enum', enum: RetryFormat })
  retry: string;

  @Column({ type: 'enum', enum: NotificationTimeFormat })
  notification_time: string;

  @Column({ default: false, type: 'bool' })
  is_closed: boolean;

  @Column({ type: "timestamp" })
  date: string;

  @CreateDateColumn({ select: false })
  created_at: string;
}