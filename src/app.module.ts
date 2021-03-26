import { Module } from '@nestjs/common';
import { ProbesModule } from './probes/probes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProbesModule,
    AuthModule,
  ],
})
export class AppModule {}
