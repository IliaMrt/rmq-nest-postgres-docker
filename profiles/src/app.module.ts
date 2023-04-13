import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
// import { FilesModule } from "./files/files.module";
// import { ServeStaticModule } from "@nestjs/serve-static";
import {ProfileModule} from "./profile/profile.module";
// import * as path from "path";
import {Profile} from "./profile/profile.model";
// import { BlocksModule } from "./blocks/blocks.module";
// import { Block } from "./blocks/blocks.model";
import {JwtModule} from "@nestjs/jwt";

// import { File } from "./files/file.model";

@Module({


    imports: [
        // получаем конфигурацию.
        // имя файла с конфигурацией берём из переменной окружения NODE_ENV.
        ConfigModule.forRoot({envFilePath: `.${process.env.NODE_ENV}.env`}),

        // инициализируем базу данных
        // используем переменные окружения из предыдущего пункта
        // в models явно указываем все таблицы, с которыми собираемя работать
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: 'postgres-profiles',//process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Profile/*, Block, File*/],
            autoLoadModels: true

        }),

        // регистрируем модули, котрые используются в приложении
        ProfileModule,
        JwtModule
    ]

})
export class AppModule {
}