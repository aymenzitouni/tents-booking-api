import { Inject, Injectable } from '@nestjs/common';
import { SignInCommand } from './commands/auth.service.commands';
import { JwtHelperService } from '../../common/helpers/jwt.helper.service';
import { CryptoHelperService } from '../../common/helpers/crypto.helper.service';
import { UsersRepository } from '../../common/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IJwtHelperService')
    private readonly jwtHelperService: JwtHelperService,
    @Inject('ICryptoHelperService')
    private readonly cryptoHelperService: CryptoHelperService,
    @Inject('IUsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}
  async signIn(command: SignInCommand) {
    const user = await this.usersRepository.findOneByEmail(command.email);
    if (!user) throw new Error('User not found');
    const isPasswordCorrect = this.cryptoHelperService.compare(
      user.password,
      command.password,
    );
    if (!isPasswordCorrect) throw new Error('Wrong Credentials');
    const authToken = this.jwtHelperService.signAuthJwt(user.id);
    delete user.password;
    return { authToken, user };
  }
}
