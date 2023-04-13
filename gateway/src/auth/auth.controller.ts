import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post("login")
    async login(@Body() body): Promise<any> {
        const result = this.authService.login(body);
        return result;
    }

    @Post("registration")
    async registration(@Body() body) {
        return await this.authService.registartion(body)
    }
}
