import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Prisma } from './prisma';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [Prisma],
})
export class AppModule {}
