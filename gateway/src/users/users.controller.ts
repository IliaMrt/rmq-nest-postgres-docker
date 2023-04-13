import {Body, Controller, Get, Headers, Post, Res} from "@nestjs/common";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post("delete")
    async delete(@Body() body, @Headers() headers) {
        return await this.usersService.delete(headers, body);
    }

    @Post("edit")
    async editUser(@Body() body, @Headers() headers) {
        return await this.usersService.editUser(headers, body);
    }

    @Post("add-role")
    async addRole(@Body() body, @Headers() headers) {
        return await this.usersService.addRole(headers, body);
    }

    @Post("create-role")
    async createRole(@Body() body, @Headers() headers) {
        return await this.usersService.createRole(headers, body);
    }

    @Post("provide-role")
    async addUserRole(@Body() body, @Headers() headers) {
        return await this.usersService.provideRole(headers, body);
    }


    @Get()
    async getAllUsers(@Headers() headers) {
        return await this.usersService.getAllUsers(headers);
    }

}
