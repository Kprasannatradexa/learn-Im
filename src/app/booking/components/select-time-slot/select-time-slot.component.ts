import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-time-slot',
  templateUrl: './select-time-slot.component.html',
  styleUrls: ['./select-time-slot.component.scss']
})
export class SelectTimeSlotComponent implements OnInit {

  @ViewChild('date') date!: ElementRef;
  @ViewChild('selectedOption') selectedOption!: ElementRef;

  constructor(private fb: FormBuilder) { }

  selected_date = this.fb.control([new Date(), [Validators.required]])

  ngOnInit(): void {
  }

  redirectTo() {

  }

  bookASlot() {
    const selectedDate = this.date.nativeElement.value;
    const selectedTimeSlot = this.selectedOption.nativeElement.value;

    console.log(selectedDate, selectedTimeSlot);

  }

  options = [
    { start_time: "09:00:00", end_time: "12:00:00" },
    { start_time: "01:00:00", end_time: "04:00:00" },
    { start_time: "05:00:00", end_time: "08:00:00" },
  ]


}
