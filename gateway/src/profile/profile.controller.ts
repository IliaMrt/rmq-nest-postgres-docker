import {Body, Controller, Get, Headers, Post, Put} from "@nestjs/common";
import {ProfileService} from "./profile.service";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }

    @Post("delete")
    async delete(@Body() body, @Headers() headers) {
        return await this.profileService.delete(headers, body);
    }

    @Put("edit")
    async editProfile(@Body() body, @Headers() headers) {
        return await this.profileService.editProfile(headers, body);
    }

    @Post("create")
    async addRole(@Body() body, @Headers() headers) {
        return await this.profileService.create(headers, body);
    }

    @Post("get-by-nick")
    async addUserRole(@Body() body, @Headers() headers) {
        return await this.profileService.getByNick(headers, body);
    }

    @Get()
    async getAllUsers(@Headers() headers) {
        return await this.profileService.getAllProfiles(headers);

    }
}