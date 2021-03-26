import * as bcrypt from 'bcrypt';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { Probe } from 'src/probes/probe.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @Column('text')
  salt: string;

  @OneToMany(() => Probe, probe => probe.user, { eager: true })
  probes: Probe[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}