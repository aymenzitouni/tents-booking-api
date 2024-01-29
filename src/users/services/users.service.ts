import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UsersRepository } from '../../common/repositories/users.repository';
import { CryptoHelperService } from '../../common/helpers/crypto.helper.service';
import globalConfigs from '../../common/configs/global.configs';
import { Connection } from 'typeorm';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    private readonly connection: Connection,
    @Inject('IUsersRepository')
    private readonly usersRepository: UsersRepository,
    @Inject('ICryptoHelperService')
    private readonly cryptoHelperService: CryptoHelperService,
  ) {}

  async onModuleInit() {
    console.log('<--> Running Migrations Start <-->');
    await this.connection.runMigrations();
    console.log('<--> Running Migrations Done <-->');

    console.log('<--> Init User Start <-->');
    const doesUserExist = await this.usersRepository.findOneByEmail(
      'aymen.zitouni@gmail.com',
    );
    if (!doesUserExist) {
      await this.usersRepository.create({
        id: 'default',
        email: globalConfigs().defaultUser.email,
        password: await this.cryptoHelperService.hash(
          globalConfigs().defaultUser.password,
        ),
      });
    }
    console.log('<--> Init User Done <-->');
  }
}
