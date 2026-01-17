import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // 1. Asegúrate de cargar el ConfigModule
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    // 2. Usa MongooseModule.forRootAsync para leer la variable de Render
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // <--- DEBE coincidir con el nombre en Render
      }),
    }),
  ],
})
export class AppModule {}
