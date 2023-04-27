import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'categories'})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30})
  name: string;

  @Column({ type: 'varchar', length: 100})
  url: string;

}