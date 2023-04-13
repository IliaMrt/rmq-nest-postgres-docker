import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {Transport} from "@nestjs/microservices";

async function start() {

    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://rabbitmq:5672"],
            queue: "secondQueue",
            queueOptions: {
                durable: false
            }
        }
    });

    await app.listen();
}

start();
