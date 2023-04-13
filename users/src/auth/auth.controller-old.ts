import {Body, Controller, Get, Inject, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {Observable} from "rxjs";
import {MessagePattern} from "@nestjs/microservices";


@ApiTags("Authorisation")
@Controller()
export class AuthControllerOld {
    constructor(private authService: AuthService) {
    }


    async login(data): Promise<any> {

        const userDto: CreateUserDto = data.body;
        const result = await this.authService.login(userDto);
        return result
    }

    @MessagePattern("registration")
    accumulate(data): Observable<any> {
        return (data);
    }

}
