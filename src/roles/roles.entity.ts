import { User } from 'src/auth/user.entity';
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

@Entity({ name: 'roles'})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50 })
  value: string;

  @Column("varchar", { length: 100})
  description: string;

  @ManyToMany(() => User, user => user.roles)
  users: User[];
}