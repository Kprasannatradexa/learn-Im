import { BookingTimeSlots } from "./booking";

export interface UserBookedCourses {
    booking: string;
    title: string;
    institute_name: string;
    certificate: any;
    booked_slot: BookingTimeSlots;
    booking_status: string;
    is_active: boolean;
}
