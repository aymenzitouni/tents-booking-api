import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class CryptoHelperService {
  compare(hash: string, payload: string) {
    return bcrypt.compare(payload, hash);
  }

  hash(payload: string) {
    return bcrypt.hash(payload, 10);
  }
}
