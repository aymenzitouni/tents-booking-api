import { Tent } from './tent.entity';

export enum BookingType {
  INDIVIDUAL = 'INDIVIDUAL',
  GROUP = 'GROUP',
}
export class Booking {
  id: number;
  type: BookingType;
  fullName: string;
  tent: Tent;
}
