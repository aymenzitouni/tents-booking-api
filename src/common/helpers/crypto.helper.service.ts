import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoHelperService {
  compare(hash: string, payload: string) {
    return true;
  }
}
