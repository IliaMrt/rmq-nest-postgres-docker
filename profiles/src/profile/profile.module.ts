import { forwardRef, Module } from "@nestjs/common";
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Profile } from "./profile.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports:[SequelizeModule.forFeature([Profile]),
    JwtModule],
  exports:[ProfileService]

})
export class ProfileModule {}
