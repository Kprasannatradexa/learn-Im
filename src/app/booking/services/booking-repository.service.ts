import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBody } from 'src/app/core/interface/request-body';
import { BookingTimeSlots, TimeSlot } from '../interface/booking';
import { BookingApiService } from './booking-api.service';

export interface TimeSlotRequestBody {
  id: string;
  date: string;
}
@Injectable({
  providedIn: 'root'
})
export class BookingRepositoryService {

  constructor(private bookingApiService: BookingApiService) { }


  getCourseTimeSlots(reqObject: TimeSlotRequestBody): Observable<BookingTimeSlots[]> {
    return this.bookingApiService.getCourseTimeSlots(reqObject);
  }

  bookACourse(reqObject: RequestBody<TimeSlot>) {
    return this.bookingApiService.bookACourse(reqObject);
  }

}
