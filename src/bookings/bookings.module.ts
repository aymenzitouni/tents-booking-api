import { Module } from '@nestjs/common';
import { BookingsController } from './controllers/bookings.controller';
import { BookingsService } from './services/bookings.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [BookingsController],
  providers: [{ provide: 'IBookingsService', useClass: BookingsService }],
  imports: [UsersModule],
})
export class BookingsModule {}
