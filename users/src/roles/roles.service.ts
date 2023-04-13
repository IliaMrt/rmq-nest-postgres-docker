import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/user.model";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role,
                @Inject(forwardRef(() => UsersService))
                private readonly usersService: UsersService,
                @InjectModel(User) private userRepository: typeof User,
                private jwtService: JwtService) {
    }

    async getRolebyValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}});
        return role;
    }

    async createRole(data) {
        const isAdmin = this.usersService.isAdmin(data.headers);
        if (!isAdmin.status) return isAdmin;

        const dto: CreateRoleDto = data.dto;

        const role = await this.getRolebyValue(dto.value);

        if (role) return "This role is already exist";
        return await this.roleRepository.create(dto);
    }

    async provideRole(data) {

        const isAdmin = this.usersService.isAdmin(data.headers);
        if (!isAdmin.status) return isAdmin;
        const user = await this.userRepository.findByPk(data.body.id);
        const role = await this.getRolebyValue(data.body.value);

        if (role && user) {
            await user.$add("role", role.id);
            return `Role ${data.body.value} add to user ${data.body.id}`;
        }

        return "User or role not found";
    }
}
