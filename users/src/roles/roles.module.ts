import { forwardRef, Module } from "@nestjs/common";
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Role} from "./roles.model";
import {UserRoles} from "./user-role.model";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";

@Module({
  controllers: [RolesController],
  providers: [RolesService, UsersService, JwtService],
  imports:[
    forwardRef(()=>UsersModule),
    SequelizeModule.forFeature([Role,User,UserRoles]),
    JwtModule,
    forwardRef(()=>AuthModule)],
  exports: [RolesService]

})
export class RolesModule {}
