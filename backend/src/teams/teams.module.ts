import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "./team.entity";
import { Player } from "./player.entity";
import { PlayersService } from "./players.service";
import { TeamsService } from "./teams.service";
import { TeamsController } from './teams.controller';
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player]), AuthModule, UsersModule],
  providers: [PlayersService, TeamsService, AuthService, UsersService],
  controllers: [TeamsController],
})
export class TeamsModule {}
