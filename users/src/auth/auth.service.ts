import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }

  async login(userDto: CreateUserDto) {
    console.log(111111111111111111)
    const user = await this.validateUser(userDto);

    if (user.status == "error") {
      return user.message;
    }

    return this.generateToken(user.user);

  }

  async registration(dto: CreateUserDto) {
    // проверяем, существует ли пользователь с таким мейлом. Если да -
    // пробрасываем ошибку.
    console.log(1)
    const candidateMail = await this.userService.getUserByEmail(dto.email);
    console.log(2)
    let result={
      status:undefined,
      message:undefined,
      token:undefined
    };

    if (candidateMail) {
      result.status='error'
      result.message="User with this email is already exist"
      return result
    }
    console.log(3)
    // получаем хэш пароля, создаём пользователя и профиль
    const hashPassword = await bcrypt.hash(dto.password, 3);
    const user = await this.userService.createUser({ email: dto.email, password: hashPassword });
    console.log(4)
    // await this.profileService.create({ ...dto, userId: user.id });
    // возвращаем токен в случае успешной регистрации

    result.token = await this.generateToken(user);
    console.log(5)
    return result;

  }

  private async generateToken(user) {

    console.log(`generateToken, user: ${JSON.stringify(user)}`);
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return await this.jwtService.sign(payload)

  }

  private async validateUser(userDto: CreateUserDto) {

    const user = {
      "user": undefined,
      "status": undefined,
      "message": undefined,
      "token": undefined

    };
    user.user = await this.userService.getUserByEmail(userDto.email);

    if (!user.user) {
      user.status = "error";
      user.message = "Wrong email";
      return user;
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.user.password);
    if (passwordEquals && user.user) {
      return user;
    }

    user.status = "error";
    user.message = "Wrong password";
    return user;
  }

}
