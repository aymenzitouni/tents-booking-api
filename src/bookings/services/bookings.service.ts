import { Injectable } from '@nestjs/common';
import { Booking, BookingType } from '../entities/booking';
import { Tent, TentStatus } from '../entities/tent.entity';
``;
export class ArrangeBookingCommand {
  fullName: string;
  bookingType: BookingType;
}
export class ArrangeBookingsCommand {
  requestedBookings: ArrangeBookingCommand[];
  availableTents: number;
}
@Injectable()
export class BookingsService {
  constructor() {}

  arrangeBookings(command: ArrangeBookingsCommand) {
    const tents = this.initializeTents(command.availableTents);
    const bookings: Booking[] = [];
    for (const requestedBooking of command.requestedBookings) {
      const bookingType = requestedBooking.bookingType;
      const availableTent = this.findOrCreateAvailableTent(tents, bookingType);
      this.updateTentAndCreateBooking(
        availableTent,
        requestedBooking,
        bookings,
      );
    }

    const tentsToBeAdded = tents.filter(
      (tent) => tent.status === TentStatus.TO_BE_ADDED,
    ).length;

    return {
      tentsTotal: tents.length,
      tentsToBeAdded,
      tentsAvailable: command.availableTents,
      tents,
      bookings,
    };
  }

  private initializeTents(tentsNumber: number) {
    const tents: Tent[] = [];
    for (let index = 0; index < tentsNumber; index++) {
      const tent = new Tent();
      tent.id = index + 1;
      tent.bookedPlaces = 0;
      tent.status = TentStatus.AVAIALABLE;
      tents.push(tent);
    }
    return tents;
  }

  private updateTentAndCreateBooking(
    tent: Tent,
    requestedBooking: ArrangeBookingCommand,
    bookings: Booking[],
  ) {
    tent.bookedPlaces +=
      requestedBooking.bookingType === BookingType.GROUP ? 5 : 1;
    const booking = new Booking();
    booking.type = requestedBooking.bookingType;
    booking.fullName = requestedBooking.fullName;
    booking.tent = tent;
    bookings.push(booking);
  }

  private findOrCreateAvailableTent(
    tents: Tent[],
    bookingType: BookingType,
  ): Tent {
    const bookingTent =
      bookingType === BookingType.GROUP
        ? (tent: Tent) => tent.bookedPlaces === 0
        : (tent: Tent) => tent.bookedPlaces < 5;
    const availableTent = tents.find(bookingTent);

    if (!availableTent) {
      const tentToBeAdded = new Tent();
      tentToBeAdded.status = TentStatus.TO_BE_ADDED;
      tentToBeAdded.id = tents.length + 1;
      tentToBeAdded.bookedPlaces = 0;
      tents.push(tentToBeAdded);
      return tentToBeAdded;
    }

    return availableTent;
  }
}
