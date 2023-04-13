import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
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

    ]),
  ]
})
export class UsersModule {}
