import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class AuthService {

    constructor(@Inject("SECOND") private readonly second: ClientProxy,
                @Inject("FIRST") private readonly first: ClientProxy) {
    }

    async login(body) {

        const result = await this.first.send({cmd: "login"}, body);
        return result

    }

    async registartion(body) {

        let result = await this.first.send({cmd: "registration"}, body);

        return result

    }

}
