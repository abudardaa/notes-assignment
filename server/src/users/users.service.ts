import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  create(createUserDto: UsersDTO): Promise<User> {
    const user = new User();

    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({
      email,
    });
  }
  async update({ userId, updateUserDto }) {
    const updatedUser = await this.usersRepository.createQueryBuilder().update(User).set(updateUserDto).where({ id: userId }).execute();

    if (!updatedUser) {
      return null;
    }
    return { msg: 'user has been updated!' };
  }
}
