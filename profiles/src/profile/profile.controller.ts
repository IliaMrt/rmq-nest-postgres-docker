import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {ProfileService} from "./profile.service";
import {MessagePattern} from "@nestjs/microservices";

@Controller("profile")
export class ProfileController {
    constructor(private profileService: ProfileService) {
    }

    @MessagePattern({cmd: "get-all-profiles"})
    async getAllProfiles() {
        const profiles = await this.profileService.getAllProfiles();
        return profiles;
    }

    @MessagePattern({cmd: "create-profile"})
    async create(data) {
        const profile = this.profileService.create(data);
        return profile;
    }

    @MessagePattern({cmd: "edit-profile"})
    async edit(data) {
        const profile = this.profileService.update(data);
        return profile;
    }

    @MessagePattern({cmd: "get-by-nick"})
    async getByNick(data) {
        const profile = await this.profileService.getUserByNick(data.nick.nick);
        return profile;
    }

}
