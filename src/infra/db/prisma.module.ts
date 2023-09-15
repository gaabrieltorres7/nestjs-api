import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//creating this to not be needed to import PrismaModule in every module that uses PrismaService
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
