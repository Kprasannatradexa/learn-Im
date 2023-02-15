import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {


  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCourseTimeslots(reqObject: any) {
    const { id = '', date = '' } = reqObject || {};

    return this.http.get(`${this.url}/courses/${id}/time_slots`, {
      params: new HttpParams()
        .set('slot_date', date)
    })
  }

  bookCourse(reqObject: any) {
    const { id = '', reqBody = '' } = reqObject || {};

    return this.http.post(`${this.url}/courses/${id}/book`, reqBody)
  }

}
