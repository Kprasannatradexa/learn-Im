import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBody } from 'src/app/core/interface/request-body';
import { environment } from 'src/environments/environment';
import { BookedCourses, BookingTimeSlots, TimeSlot } from '../interface/booking';
import { TimeSlotRequestBody } from './booking-repository.service';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {


  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCourseTimeSlots(reqObject: TimeSlotRequestBody): Observable<BookingTimeSlots[]> {

    const { id, date } = reqObject || {};

    return this.http.get<BookingTimeSlots[]>(`${this.url}/courses/${id}/time_slots`, {
      params: new HttpParams()
        .set('slot_date', date)
    })
  }

  bookACourse(reqObject: RequestBody<TimeSlot>): Observable<BookedCourses> {
    const { id, body } = reqObject || {};

    return this.http.post<BookedCourses>(`${this.url}/courses/${id}/book`, body)
  }

}
