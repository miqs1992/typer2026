
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from "./user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(order?: FindOptionsOrder<User>): Promise<User[]> {
    return this.usersRepository.find({ order });
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create({ password, passwordConfirmation, ...rest }: CreateUserDto): Promise<User> {
    if(password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (password !== passwordConfirmation) {
      throw new Error('Password and password confirmation do not match');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      ...rest,
      encryptedPassword,
    });
    return this.usersRepository.save(user);
  }
}
