import { Controller, Get } from '@nestjs/common';
import { Prisma } from './prisma';

@Controller()
export class AppController {
  constructor(private _prisma: Prisma) {}

  @Get()
  async index() {
    const entities = await this._prisma.entity.findMany({
      include: {
        type: true,
        camera: true,
      },
    });

    return {
      entities,
    };
  }
}
