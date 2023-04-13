import * as process from "process";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {

  const app2 = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://rabbitmq:5672"],
        queue: "firstQueue",
        // queue: "second_queue",
        queueOptions: {
          durable: false
        }
      }
    }
  );

  await app2.listen();
  console.log("start listening");
}

start();
