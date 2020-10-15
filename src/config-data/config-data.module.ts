import { Module } from '@nestjs/common';
import { ConfigDataController } from './config-data.controller';

@Module({
  controllers: [ConfigDataController],
})
export class ConfigDataModule {}
