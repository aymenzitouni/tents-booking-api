export enum TentStatus {
  AVAIALABLE = 'AVAIALABLE',
  TO_BE_ADDED = 'TO_BE_ADDED',
}

export class Tent {
  id: number;
  bookedPlaces: number;
  status: TentStatus;
}
