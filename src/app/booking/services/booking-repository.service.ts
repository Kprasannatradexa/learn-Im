import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingSlots } from '../interface/booking';
import { BookingApiService } from './booking-api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingRepositoryService {

  constructor(private bookingApiService: BookingApiService) { }


  getCourseTimeSlots(reqObject: any): Observable<BookingSlots[]> {
    return this.bookingApiService.getCourseTimeSlots(reqObject);
  }

  bookACourse(reqObject: any) {
    return this.bookingApiService.bookACourse(reqObject);
  }

}
