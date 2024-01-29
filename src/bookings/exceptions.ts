import {
  BaseException,
  BaseExceptionCause,
} from '../common/filters/exceptions.filter';

export class InavlidCsvFileException extends BaseException {
  constructor(message: any) {
    super(/* cause= */ BaseExceptionCause.CONFLICT, /* message= */ message);
  }
}
