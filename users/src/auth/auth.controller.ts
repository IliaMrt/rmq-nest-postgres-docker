import {MessagePattern} from "@nestjs/microservices";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {Controller} from "@nestjs/common";


@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @MessagePattern({cmd: "login"})
    async login(data): Promise<any> {
        console.log(22222222222)
        const userDto: CreateUserDto = data;
        const result = await this.authService.login(userDto);
        return result
    }

    @MessagePattern({cmd: "registration"})
    async registration(data) {
        const userDto: CreateUserDto = data;
        const result = await this.authService.registration(userDto);
        return result
    }
}

