import {MessagePattern} from "@nestjs/microservices";
import {UsersService} from "./users.service";
import {Controller} from "@nestjs/common";
@Controller()

export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @MessagePattern({cmd: "add-role"})
    addRole(data) {
        return this.usersService.addRole(data);
    }

    @MessagePattern({cmd: "delete"})
    async delete(data): Promise<any> {
        let result = await this.usersService.delete(data);
        return result;
    }

    @MessagePattern({cmd: "edit-user"})
    async editUser(data): Promise<any> {
        return await this.usersService.editUser(data);
    }

    @MessagePattern({cmd: "get-all-users"})
    async getAllUsers(data): Promise<any> {
        return await this.usersService.gettAllUsers(data);
    }
}

