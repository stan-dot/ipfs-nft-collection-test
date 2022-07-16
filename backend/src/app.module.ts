import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: '../upload',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
