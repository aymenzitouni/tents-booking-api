import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from '../models/users.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  @InjectRepository(UsersModel) private readonly users: Repository<UsersModel>;

  async findOneByEmail(email: string) {
    return await this.users.findOne({ where: { email } });
  }
}
