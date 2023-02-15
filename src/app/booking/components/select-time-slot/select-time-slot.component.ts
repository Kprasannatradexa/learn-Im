import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingSlots } from '../../interface/booking';
import { BookingApiService } from '../../services/booking-api.service';

interface timeSlots {
  slotDate: string;
  availableSlots: BookingSlots[];
}

@Component({
  selector: 'app-select-time-slot',
  templateUrl: './select-time-slot.component.html',
  styleUrls: ['./select-time-slot.component.scss']
})
export class SelectTimeSlotComponent implements OnInit, AfterViewInit {

  @ViewChild('date') date!: ElementRef;
  @ViewChild('selectedOption') selectedOption!: ElementRef;

  minDate: any;
  selectedTimeSlotsIndex!: number;
  selectedTimeSlots!: string;
  selectedDate!: string;

  id: string = "b3556c22-84b1-437b-8438-940a89c5e998";

  timeSlots: timeSlots[] = [];

  availableTimeSlots: BookingSlots[] = [];

  constructor(private bookingApiService: BookingApiService) { }


  ngOnInit(): void {
    this.getTomorrowDate();

    this.getABookingTimeslots(this.minDate);
  }

  getABookingTimeslots(date: string) {
    this.bookingApiService.getCourseTimeslots({ id: this.id, date })
      .subscribe((bookingTimeSlots: BookingSlots[]) => {
        if (bookingTimeSlots.length) {
          this.timeSlots.push({ slotDate: bookingTimeSlots[0]?.slot_date, availableSlots: bookingTimeSlots })
          this.availableTimeSlots = bookingTimeSlots;
        } else {
          console.log('Slot not available');
          this.availableTimeSlots = [];
        }
      })
  }

  ngAfterViewInit(): void {
    this.date.nativeElement.value = this.minDate;
    this.selectedDate = this.minDate;
  }

  getTomorrowDate() {
    const today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1);
    this.minDate = new Date(tomorrow).toISOString().split('T')[0];
    return this.minDate;
  }


  isTimeSlotResponsePresent(selectedDate: string) {
    if (this.timeSlots.some(timeSlot => timeSlot.slotDate === selectedDate)) {
      this.timeSlots.filter((timeSlot) => {
        if (timeSlot.slotDate === selectedDate) {
          this.availableTimeSlots = timeSlot.availableSlots;
        }
      })
    } else {
      this.getABookingTimeslots(selectedDate);
    }
  }


  redirectTo() {

  }

  bookACourse() {

    if (this.selectedDate && this.selectedTimeSlots) {

      const reqObject = {
        id: this.id,
        reqBody: {
          time_slot: this.selectedTimeSlots
        }
      }

      this.bookingApiService.bookCourse(reqObject).subscribe((response) => {
        console.log(response);
      })
    }

  }

  getSelectedTimeslots(timeslots: string, i: number) {
    this.selectedTimeSlots = timeslots;
    this.selectedTimeSlotsIndex = i;
  }

  getAvailableSlots(selectedDate: string) {
    this.selectedDate = selectedDate;
    this.isTimeSlotResponsePresent(selectedDate);
  }


}
