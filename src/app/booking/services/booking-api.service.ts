import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingTimeSlots } from '../interface/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {


  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCourseTimeSlots(reqObject: any): Observable<BookingTimeSlots[]> {
    const { id = '', date = '' } = reqObject || {};

    return this.http.get<BookingTimeSlots[]>(`${this.url}/courses/${id}/time_slots`, {
      params: new HttpParams()
        .set('slot_date', date)
    })
  }

  bookACourse(reqObject: any) {
    const { id = '', reqBody = '' } = reqObject || {};

    return this.http.post(`${this.url}/courses/${id}/book`, reqBody)
  }

}
