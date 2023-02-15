import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingSlots } from '../interface/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {


  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCourseTimeslots(reqObject: any): Observable<BookingSlots[]> {
    const { id = '', date = '' } = reqObject || {};

    return this.http.get<BookingSlots[]>(`${this.url}/courses/${id}/time_slots`, {
      params: new HttpParams()
        .set('slot_date', date)
    })
  }

  bookCourse(reqObject: any) {
    const { id = '', reqBody = '' } = reqObject || {};

    return this.http.post(`${this.url}/courses/${id}/book`, reqBody)
  }

}
