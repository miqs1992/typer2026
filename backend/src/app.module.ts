import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { User } from "./users/user.entity";
import { AuthModule } from './auth/auth.module';
import { RoundsModule } from './rounds/rounds.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Round } from "./rounds/round.entity";
import { MatchDaysModule } from './match-days/match-days.module';
import { MatchDay } from "./match-days/match-day.entity";
import { MatchesModule } from './matches/matches.module';
import { TeamsModule } from './teams/teams.module';
import { Team } from "./teams/team.entity";
import { Match } from "./matches/match.entity";
import { Player } from "./teams/player.entity";
import { ClerkClientProvider } from "./providers/clerk-client.provider";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config: TypeOrmModuleOptions = {
          type: 'postgres',
          entities: [User, Round, MatchDay, Team, Match, Player],
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy(),
        }

        if (configService.get<string>('DATABASE_URL')) {
          return {
            ...config,
            url: configService.get<string>('DATABASE_URL'),
            ssl: {
              rejectUnauthorized: false,
            },
          };
        } else {
          return {
            ...config,
            host: configService.get<string>('DB_HOST'),
            port: Number(configService.get<string>('DB_PORT')),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
          }
        }
      },
    }),
    UsersModule,
    AuthModule,
    RoundsModule,
    MatchDaysModule,
    MatchesModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClerkClientProvider],
})
export class AppModule {}
