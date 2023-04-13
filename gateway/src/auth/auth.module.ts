import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports:[
    ClientsModule.register([
      /*{
        name: "TOKEN",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: "token",
          queueOptions: {
            durable: false
          }
        }
      },*/
      {
        name: "SECOND",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://rabbitmq:5672"],
          queue: "secondQueue",
          queueOptions: {
            durable: false
          }
        }
      },
      {
        name: "FIRST",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://rabbitmq:5672"],
          queue: "firstQueue",
          queueOptions: {
            durable: false
          }
        }
      }

    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
