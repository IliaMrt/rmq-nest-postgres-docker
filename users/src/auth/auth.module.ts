import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { AuthController } from "./auth.controller";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
  /*  ClientsModule.register([
      {
        name: 'FIRST',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'firstQueue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),*/
   /* ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'USERS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),*/
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: /*process.env.PRIVATE_KEY ||*/ "SECRET",
      signOptions: { expiresIn: "24h" }
    })],
  exports: [AuthService, JwtModule]
})
export class AuthModule {
}
