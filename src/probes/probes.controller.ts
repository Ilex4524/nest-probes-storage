import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, Inject, UseGuards, Logger } from '@nestjs/common';
import { ProbesService } from './probes.service';
import { CreateProbeDto } from './dto/create-probe.dto';
import { UpdateProbeDto } from './dto/update-probe.dto';
import { FilterProbesDto } from './dto/filter-probes.dto';
import { Probe } from './probe.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('probes')
@UseGuards(AuthGuard())
export class ProbesController {
  private logger = new Logger('ProbesController');

  @Inject()
  private probesService: ProbesService;

  @Get()
  @UsePipes(ValidationPipe)
  getProbes(
    @Query() filterProbesDto: FilterProbesDto,
    @GetUser() user: User,
  ): Promise<Probe[]> {
    this.logger.verbose(`User "${user.username}" retrieving all probes. Filters: ${JSON.stringify(filterProbesDto)}`);
    return this.probesService.getProbes(filterProbesDto, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProbe(
    @Body() createProbeDto: CreateProbeDto,
    @GetUser() user: User,
  ): Promise<Probe> {
    return this.probesService.createProbe(createProbeDto, user);
  }

  @Get('/:id')
  getProbeById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Probe> {
    return this.probesService.getProbeById(id, user);
  }

  @Delete('/:id')
  deleteProbe(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<void> {
    return this.probesService.deleteProbe(id, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateProbe(
    @Param('id') id: string, 
    @Body() updateProbeDto: UpdateProbeDto,
    @GetUser() user: User
  ): Promise<void> {
    return this.probesService.updateProbe(id, updateProbeDto, user);
  }
}
