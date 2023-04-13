import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "./auth/auth.module";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {UsersModule} from './users/users.module';
import {ProfileModule} from './profile/profile.module';

@Module({


    imports: [
        // получаем конфигурацию.
        // имя файла с конфигурацией берём из переменной окружения NODE_ENV.
        ConfigModule.forRoot({envFilePath: `.${process.env.NODE_ENV}.env`}),

        // устанавливаем папку для get запросов статики
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, "static")
        }),
        // регистрируем модули, котрые используются в приложении
        JwtModule,
        AuthModule,
        // AppModule,
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
                    urls: ["amqp://localhost:5672"],
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
                    urls: ["amqp://localhost:5672"],
                    queue: "firstQueue",
                    queueOptions: {
                        durable: false
                    }
                }
            }

        ]),
        UsersModule,
        ProfileModule
    ],
    controllers: [],
    providers: []

})
export class AppModule {
}