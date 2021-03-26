import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProbeDto } from './dto/create-probe.dto';
import { UpdateProbeDto } from './dto/update-probe.dto';
import { FilterProbesDto } from './dto/filter-probes.dto';
import { ProbesRepository } from './probes.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Probe } from './probe.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProbesService {
  @InjectRepository(ProbesRepository)
  private probesRepository: ProbesRepository;

  getProbes(
    filterProbesDto: FilterProbesDto,
    user: User,
  ): Promise<Probe[]> {
    return this.probesRepository.getProbes(filterProbesDto, user);
  }

  createProbe(
    createProbeDto: CreateProbeDto,
    user: User
  ): Promise<Probe> {
    return this.probesRepository.createProbe(createProbeDto, user);
  }

  async getProbeById(id: string, user: User): Promise<Probe> {
    const probe = await this.probesRepository.findOne({ where: { id, userId: user.id } });

    if (!probe) {
      throw new NotFoundException(`Probe with ID "${id}" not found`);
    }

    return probe;
  }

  async deleteProbe(id: string, user: User): Promise<void> {
    const result = await this.probesRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Probe with ID "${id}" not found`);
    }
  }

  async updateProbe(
    id: string, 
    updateProbeDto: UpdateProbeDto,
    user: User
  ): Promise<void> {
    const result = await this.probesRepository.update({ id, userId: user.id }, updateProbeDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Probe with ID "${id}" not found`);
    }
  }
}
