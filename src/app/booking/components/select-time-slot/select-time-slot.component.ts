import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookingApiService } from '../../services/booking-api.service';


@Component({
  selector: 'app-select-time-slot',
  templateUrl: './select-time-slot.component.html',
  styleUrls: ['./select-time-slot.component.scss']
})
export class SelectTimeSlotComponent implements OnInit, AfterViewInit {

  @ViewChild('date') date!: ElementRef;
  @ViewChild('selectedOption') selectedOption!: ElementRef;

  minDate: any;
  selectedTimeSlots!: number;

  id: string = "b3556c22-84b1-437b-8438-940a89c5e998";

  timeSlots!: { [key: string]: any }

  constructor(private bookingApiService: BookingApiService) { }


  ngOnInit(): void {
    this.getTomorrowDate();

    this.bookingApiService.getCourseTimeslots({ id: this.id, date: this.minDate })
      .subscribe((timeSlots) => {
        if (timeSlots) {

        }
      })
  }

  ngAfterViewInit(): void {
    this.date.nativeElement.value = this.minDate;
  }

  getTomorrowDate() {
    const today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1);
    this.minDate = new Date(tomorrow).toISOString().split('T')[0];
    return this.minDate;
  }

  redirectTo() {

  }

  bookASlot() {
    const selectedDate = this.date.nativeElement.value;

    console.log(selectedDate);

  }

  options = [
    {
      id: "642a866d-179c-4c33-8ace-6a67dcb4d5df",
      slot_date: "2023-02-15",
      start_time: "09:00:00",
      end_time: "12:00:00"
    },
    {
      id: "642a866d-179c-4c33-8ace-6a67dcb4d5df",
      slot_date: "2023-02-15",
      start_time: "01:00:00",
      end_time: "04:00:00"
    },
    {
      id: "642a866d-179c-4c33-8ace-6a67dcb4d5df",
      slot_date: "2023-02-15",
      start_time: "05:00:00",
      end_time: "08:00:00"
    }
  ]

  getSelectedTimeslots(timeslots: string, i: number) {
    this.selectedTimeSlots = i;
    console.log(timeslots);
  }


}
