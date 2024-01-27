import { Body, Controller, Inject, Post } from '@nestjs/common';
import { BookingsService } from '../services/bookings.service';

@Controller({ version: '1', path: 'bookings' })
export class BookingsController {
  constructor(
    @Inject('IBookingsService')
    private readonly bookingsService: BookingsService,
  ) {}
  @Post()
  arrangeBookings(@Body() body) {
    return this.bookingsService.arrangeBookings(body);
  }
}
