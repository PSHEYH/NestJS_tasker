import { Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Task } from 'src/tasks/task.entity';
import { Role } from 'src/roles/roles.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ type: 'varchar', length: 80 })
  device_id: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  fcm_token: string;

  @Column({ type: 'varchar', length: 100 })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ type: "varchar", length: 40, nullable: true })
  name: string;

  @Column({ type: "bool", default: true })
  is_notify: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  avatar: string;

  @OneToMany((type) => Task, (task) => task.user, {
    cascade: true,
  })
  tasks: Task[]

  @ManyToMany(() => Role, {
    cascade: true,
    eager: true
  })
  @JoinTable(({
    name: "user_roles",
    joinColumn: {
      name: "users",
      referencedColumnName: "device_id"
    },
    inverseJoinColumn: {
      name: "roles",
      referencedColumnName: "id"
    }
  }))
  roles: Role[];

  @CreateDateColumn({ select: false })
  created_at: string;

  @UpdateDateColumn({ select: false })
  updated_at: string;
}