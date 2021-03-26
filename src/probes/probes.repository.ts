import { EntityRepository, Repository } from 'typeorm';
import { Probe } from './probe.entity';
import { CreateProbeDto } from './dto/create-probe.dto';
import { FilterProbesDto } from './dto/filter-probes.dto';
import { User } from 'src/auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Probe)
export class ProbesRepository extends Repository<Probe> {
  private logger = new Logger('ProbesRepository');

  async createProbe(
    createProbeDto: CreateProbeDto,
    user: User,
  ): Promise<Probe> {
    const { title, description } = createProbeDto;

    const probe = new Probe();
    probe.title = title;
    probe.description = description;
    probe.user = user;
    await probe.save();

    delete probe.user;

    return probe;
  }

  async getProbes(
    filterProbesDto: FilterProbesDto,
    user: User
  ): Promise<Probe[]> {
    const { search } = filterProbesDto;
    const query = this.createQueryBuilder('probe');

    query.where('probe.userId = :userId', {
      userId: user.id,
    });

    if (search) {
      query.andWhere('probe.title ILIKE :search OR probe.description ILIKE :search', {
        search: `%${search}%`,
      });
    }
    
    try {
      const probes = await query.getMany();
      return probes;
    } catch (error) {
      this.logger.error(`Failed to get probes for user "${user.username}". Reason: ${error.message}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}