import { Module } from '@nestjs/common';
import { HomeModule } from './app/module/home.module';
import { ModulesUsingPrisma } from './factory/prisma/modules-using-prisma.module';

@Module({
  imports: [HomeModule, ModulesUsingPrisma],
})
export class AppModule {}
