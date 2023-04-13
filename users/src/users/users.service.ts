import {ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {Role} from "../roles/roles.model";


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                @InjectModel(Role) private roleRepository: typeof Role,
                private roleService: RolesService,
                private jwtService: JwtService) {
    }


    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        let role;
        if (user.id == 1) {
            await this.roleRepository.create({value: 'Admin', description: 'Administrator'})
            await this.roleRepository.create({value: 'USER', description: 'User'});
            let value = 'Admin'
            role = await this.roleRepository.findOne({where: {value}})
        } else {
            role = await this.roleService.getRolebyValue("USER");
        }
        await user.$set("roles", [role.id]);

        user.roles = [role];
        return user;

    }

    async gettAllUsers(data) {
        const isAdmin = this.isAdmin(data.headers);
        if (!isAdmin.status) return isAdmin.message;

        const users = await this.userRepository.findAll({include: {all: true}});
        return users;

    }


    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne(
            {where: {email}, include: {all: true}});
        return user;

    }

    async addRole(data) {
        const dto: AddRoleDto = data.dto;
        const isAdmin = this.isAdmin(data.headers);
        if (!isAdmin.status) return isAdmin;

        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRolebyValue(dto.value);

        if (role && user) {
            await user.$add("role", role.id);
            return dto;
        }

        return "User or role not found";

    }

    async edit(userDto: CreateUserDto, req) {
        // если не переданы данные авторизации - отказываем в доступе
        if (req.authorization == undefined) {
            return "You is not authorised";
        }
        // получаем из базы пользователя, на которого поступил запрос на редактирование
        const checkUser = await this.getUserByEmail(userDto.email);

        // получаем информацию из JWT токена о пользователе, направившем запрос
        const firstUserId = await this.jwtService.verify(req.authorization.split(" ")[1]);

        // проверяем, является ли пользователь, направивший запрос, администратором
        const isReqUserAdmin = firstUserId.roles.reduce((res, obj) => {
            return res || obj.value == "Admin";
        }, false);

        // если пользователь, отправивший запрос редактрует не свой профиль
        // и не является администратором - отказываем в доступе
        if (!(firstUserId.email == userDto.email || isReqUserAdmin)) {
            throw new HttpException("You have no permission", HttpStatus.FORBIDDEN);
        }

        // если пользователя, которого надо отредактровать, не существует -
        // отказываем в доступе
        if (!checkUser) {
            throw new HttpException("User with this email not found", HttpStatus.NOT_FOUND);
        }

        // применяем изменения к данным пользователя и профилю
        const user = await checkUser.update({...userDto});
        const profile = null;//await this.profileService.update(profileDto);

        return {user, profile};
    }


    async delete(data) {
        // id: number, req
        // если не переданы данные авторизации - отказываем в доступе
        let result;
        if (data.headers.authorization == undefined) {
            // throw new HttpException("You is not authorised", HttpStatus.FORBIDDEN);
            return "You is not authorised";
        }

        // получаем информацию из JWT токена о пользователе, направившем запрос
        const firstUserId = this.jwtService.verify(data.headers.authorization.split(" ")[1]);

        // проверяем, является ли пользователь, направивший запрос, администратором
        const isReqUserAdmin = firstUserId.roles.reduce((res, obj) => {
            return res || obj.value == "Admin";
        }, false);

        // если пользователь, отправивший запрос удаляет не свой профиль
        // и не является администратором - отказываем в доступе
        if (!(firstUserId.id == data.body.id || isReqUserAdmin)) {
            return "You have no permission";
            // throw new HttpException("You have no permission", HttpStatus.FORBIDDEN);
        }

        // удаляем данные пользователя, профиль и данные из FileTable
        let id = data.body.id;
        const user = await this.userRepository.destroy({where: {id}});
        // const profile = await this.profileService.delete(id);
        // await this.fileService.deleteUserFromFileTable(id);

        return "User was deleted";

    }

    async editUser(data) {
        let req = data.headers;
        let userDto = data.body;
        // если не переданы данные авторизации - отказываем в доступе
        if (req.authorization == undefined) {
            throw new HttpException("You is not authorised", HttpStatus.FORBIDDEN);
        }
        // получаем из базы пользователя, на которого поступил запрос на редактирование
        const checkUser = await this.getUserByEmail(userDto.email);

        // получаем информацию из JWT токена о пользователе, направившем запрос
        const firstUserId = this.jwtService.verify(req.authorization.split(" ")[1]);

        // проверяем, является ли пользователь, направивший запрос, администратором
        const isReqUserAdmin = firstUserId.roles.reduce((res, obj) => {
            return res || obj.value == "Admin";
        }, false);

        // если пользователь, отправивший запрос редактрует не свой профиль
        // и не является администратором - отказываем в доступе
        if (!(firstUserId.email == userDto.email || isReqUserAdmin)) {
            throw new HttpException("You have no permission", HttpStatus.FORBIDDEN);
        }

        // если пользователя, которого надо отредактровать, не существует -
        // отказываем в доступе
        if (!checkUser) {
            throw new HttpException("User with this email not found", HttpStatus.NOT_FOUND);
        }

        if (userDto.password) {
            userDto.password = await bcrypt.hash(userDto.password, 3);

        }
        // применяем изменения к данным пользователя и профилю
        const user = await checkUser.update({...userDto});
        // const profile = await this.profileService.update(profileDto);

        return "User was edited";
    }

    isAdmin(headers) {

        if (!headers.authorization) return {
            "status": false,
            "answer": "You are not authorized"
        };

        const UserId = this.jwtService.verify(headers.authorization.split(" ")[1], {secret: 'SECRET'});
        const isReqUserAdmin = UserId.roles.reduce((res, obj) => {
            return res || obj.value == "Admin";
        }, false);
        return isReqUserAdmin ? {"status": true} : {"status": false, "message": "You have no permission"};
    }

    da() {
        return 'ook'
    }
}
