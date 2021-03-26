import { Module } from '@nestjs/common';
import { ProbesController } from './probes.controller';
import { ProbesService } from './probes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProbesRepository } from './probes.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProbesRepository]),
    AuthModule,
  ],
  controllers: [ProbesController],
  providers: [ProbesService],
})
export class ProbesModule {}
