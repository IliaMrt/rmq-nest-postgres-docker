import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles-guard";
import {MessagePattern} from "@nestjs/microservices";

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {
    }

    @MessagePattern({cmd: "create-role"})
    async createRole(data) {
        return await this.roleService.createRole(data);
    }

    @MessagePattern({cmd: "provide-role"})
    async provideRole(data) {
        return await this.roleService.provideRole(data);
    }

}
