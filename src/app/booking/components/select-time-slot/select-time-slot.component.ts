import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingTimeSlots } from '../../interface/booking';
import { BookingRepositoryService } from '../../services/booking-repository.service';

interface StoredTimeSlots {
  slotDate: string;
  availableSlots: BookingTimeSlots[];
}

@Component({
  selector: 'app-select-time-slot',
  templateUrl: './select-time-slot.component.html',
  styleUrls: ['./select-time-slot.component.scss']
})
export class SelectTimeSlotComponent implements OnInit, AfterViewInit {

  @ViewChild('date') date!: ElementRef;
  @ViewChild('selectedOption') selectedOption!: ElementRef;

  tomorrowDate !: string;
  selectedTimeSlotsIndex!: number;
  selectedTimeSlots!: string;
  selectedDate!: string;

  id: string = "b3556c22-84b1-437b-8438-940a89c5e998";

  storedTimeSlots: StoredTimeSlots[] = [];

  availableTimeSlots: BookingTimeSlots[] = [];

  constructor(private bookingRepositoryService: BookingRepositoryService) { }


  ngOnInit(): void {
    this.setTomorrowDate();

    this.getABookingTimeSlots(this.tomorrowDate);
  }

  getABookingTimeSlots(date: string) {
    this.bookingRepositoryService.getCourseTimeSlots({ id: this.id, date })
      .subscribe((bookingTimeSlots: BookingTimeSlots[]) => {
        if (bookingTimeSlots.length) {
          this.storedTimeSlots.push({ slotDate: bookingTimeSlots[0]?.slot_date, availableSlots: bookingTimeSlots })
          this.availableTimeSlots = bookingTimeSlots;
        } else {
          console.log('Slot not available');
          this.availableTimeSlots = [];
        }
      })
  }

  ngAfterViewInit(): void {
    this.date.nativeElement.value = this.tomorrowDate;
    this.selectedDate = this.tomorrowDate;
  }

  setTomorrowDate() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrowDate = new Date(tomorrow).toISOString().split('T')[0];
    return this.tomorrowDate;
  }


  isTimeSlotsStored(selectedDate: string) {
    if (this.storedTimeSlots.some(timeSlot => timeSlot.slotDate === selectedDate)) {
      this.storedTimeSlots.filter((timeSlot) => {
        if (timeSlot.slotDate === selectedDate) {
          this.availableTimeSlots = timeSlot.availableSlots;
        }
      })
    } else {
      this.getABookingTimeSlots(selectedDate);
    }
  }


  redirectTo() {

  }

  bookACourse() {

    if (this.selectedDate && this.selectedTimeSlots) {

      const reqObject = {
        id: this.id,
        body: {
          time_slot: this.selectedTimeSlots
        }
      }

      this.bookingRepositoryService.bookACourse(reqObject).subscribe((response) => {
        console.log(response);
      })
    }

  }

  getSelectedTimeSlots(timeSlots: string, i: number) {
    this.selectedTimeSlots = timeSlots;
    this.selectedTimeSlotsIndex = i;
  }

  getAvailableSlots(selectedDate: string) {
    this.selectedDate = selectedDate;
    this.isTimeSlotsStored(selectedDate);
  }


}
