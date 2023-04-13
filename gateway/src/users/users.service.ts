import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class UsersService {

    constructor(@Inject("SECOND") private readonly second: ClientProxy,
                @Inject("FIRST") private readonly first: ClientProxy) {
    }

    async delete(headers, body) {
        let result = await this.first.send({cmd: "delete"}, {
            "body": body,
            "headers": headers
        });
        return result;
    }

    async editUser(headers, body) {
        let result = await this.first.send({cmd: "edit-user"}, {
            "body": body,
            "headers": headers
        });
        return result;
    }

    async getAllUsers(headers) {
        let result = await this.first.send({cmd:"get-all-users"}, {
            "headers": headers
        });
        return result;
    }


    async addRole(headers, body) {
        let result = await this.first.send({cmd: "add-role"}, {
            "dto": body,
            "headers": headers
        });
        return result;
    }

    async createRole(headers, body) {
        let result = await this.first.send({cmd: "create-role"}, {
            "dto": body,
            "headers": headers
        });
        return result;
    }

    async provideRole(headers, body) {
        let result = await this.first.send({cmd: "provide-role"}, {
            "body": body,
            "headers": headers
        });
        return result;
    }
}