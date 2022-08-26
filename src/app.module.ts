import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {resolve} from 'path'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RECOMENDATION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'x',
          protoPath: resolve(__dirname, '../x.proto'),
          url: 'localhost:50051',
          loader:{keepCase:true}
          //credentials:grpc.ChannelCredentials.createSsl(rootCert)

        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
