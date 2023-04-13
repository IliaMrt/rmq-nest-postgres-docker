import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function start1() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://localhost:5672"],
            queue: "users",
            queueOptions: {
                durable: false
            }
        }
    });

    const app2 = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://localhost:5672"],
            queue: "token",
            queueOptions: {
                durable: false
            }
        }
    });

    console.log("RMQ started1");
    await app.listen();
    await app2.listen();
}

start1();
