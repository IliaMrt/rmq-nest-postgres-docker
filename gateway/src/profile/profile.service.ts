import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class ProfileService {
    constructor(@Inject("SECOND") private readonly second: ClientProxy) {
    }

    async delete(headers, body) {
        return Promise.resolve(undefined);
    }

    async editProfile(headers, body) {
        const result = await this.second.send(
            {cmd: "edit-profile"},
            {"dto": body, "headers": headers});

        return result
    }

    async create(headers, body) {
        const result = await this.second.send(
            {cmd: "create-profile"},
            {"dto": body, "headers": headers});

        return result
    }

    async getByNick(headers, body) {
        const result = await this.second.send(
            {cmd: "get-by-nick"},
            {"nick": body, "headers": headers});

        return result
    }

    async getAllProfiles(headers) {
        const result = await this.second.send(
            {cmd: "get-all-profiles"},
            {});

        return result
    }
}
