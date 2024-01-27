import { Module } from '@nestjs/common';
import { BookingsController } from './controllers/bookings.controller';
import { BookingsService } from './services/bookings.service';

@Module({
  controllers: [BookingsController],
  providers: [{ provide: 'IBookingsService', useClass: BookingsService }],
})
export class BookingsModule {}
