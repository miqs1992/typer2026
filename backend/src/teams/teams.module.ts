import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "./team.entity";
import { Player } from "./player.entity";
import { PlayersService } from "./players.service";
import { TeamsService } from "./teams.service";
import { AdminTeamsController } from './admin-teams.controller';
import { AuthService } from "../auth/auth.service";
import { UsersService } from "../users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player])],
  providers: [PlayersService, TeamsService, AuthService, UsersService],
  controllers: [AdminTeamsController],
})
export class TeamsModule {}
