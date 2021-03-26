import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProbeTag } from './enums/probe-tag.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Probe extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ProbeTag,
    default: ProbeTag.THERAPIST,
  })
  tag: ProbeTag;

  @ManyToOne(() => User, user => user.probes, { eager: false })
  user: User;

  @Column('uuid')
  userId: string;
}