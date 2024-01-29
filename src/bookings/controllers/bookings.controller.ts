import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookingsService } from '../services/bookings.service';
import * as XLSX from 'xlsx';
import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
  ValidatorOptions,
  validate,
} from 'class-validator';
import { BookingType } from '../entities/booking';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFilter } from 'src/common/filters/files.filter';
import { InavlidCsvFileException } from '../exceptions';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiProperty,
  ApiQuery,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AuthGuard } from '../../users/services/auth.guard';
export class ArrangeBookingsDTO {
  @IsNumber()
  availableTents: number;

  @ApiProperty()
  @Type(() => BookingRequestDTO)
  @ValidateNested()
  @IsOptional()
  requestedBookings: [];
}

export class BookingRequestDTO {
  fullName: string;
  bookingType: BookingType;
}

export class RequestedBookingDTO {
  @IsString()
  fullName: string;

  @IsEnum(BookingType)
  bookingType: BookingType;
}

export class QueryDTO {
  @ApiProperty()
  @IsNumber()
  availableTents: number;
}
@Controller({ version: '1', path: 'bookings' })
@UseGuards(AuthGuard)
@ApiHeader({ name: 'Authorization' })
export class BookingsController {
  constructor(
    @Inject('IBookingsService')
    private readonly bookingsService: BookingsService,
  ) {}
  @Post()
  @ApiBody({ type: ArrangeBookingsDTO })
  arrangeBookings(@Body() body: ArrangeBookingsDTO) {
    return this.bookingsService.arrangeBookings({
      ...body,
    });
  }

  @Post('csv')
  @UseInterceptors(
    FileInterceptor('file', { fileFilter: FileFilter(['.csv']) }),
  )
  @ApiOperation({ summary: 'Upload CSV File To Arrange Booking' })
  @ApiQuery({ type: QueryDTO })
  async arrageBookingsFromCsv(@UploadedFile() file, @Query() query: QueryDTO) {
    const { data, validationErrors } = await this.processCsv(file.buffer);
    if (validationErrors.length > 0)
      throw new InavlidCsvFileException(validationErrors);
    return this.bookingsService.arrangeBookings({
      availableTents: Number(query.availableTents),
      requestedBookings: data,
    });
  }

  private async processCsv(fileBuffer: Buffer) {
    const validatorOptions: ValidatorOptions = {
      whitelist: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
      validationError: {
        target: false,
        value: false,
      },
    };
    const data = [];
    const validationErrors = [];
    const csvData = fileBuffer.toString().split('\n');
    const cells = {
      fullName: 0,
      bookingType: 1,
    };
    let index = 0;
    for (const rowData of csvData) {
      const columns = rowData.split(',').map((column) => column.trim());
      const item = new RequestedBookingDTO();
      item.fullName = columns[cells.fullName];
      item.bookingType = columns[cells.bookingType] as BookingType;

      const errors = await validate(item, validatorOptions);
      if (!errors.length) {
        console.log('@item', item);

        data.push(item);
      }
      if (errors.length > 0) {
        errors.forEach(
          ({ property, constraints }) =>
            cells[property] &&
            validationErrors.push({
              row: `${cells[property]}${index}`,
              property,
              constraints,
              value: item[property],
            }),
        );
        index += 1;
      }
    }

    return { data, validationErrors };
  }
}
