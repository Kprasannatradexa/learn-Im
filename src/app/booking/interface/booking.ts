import { User } from "src/app/core/models/user.model";

export interface BookingTimeSlots {
    id: string;
    slot_date: string;
    start_time: string;
    end_time: string;
}

export interface TimeSlot {
    time_slot: string;
}

export interface BookedCourses {
    id: string;
    buyer: User;
    course: CourseDetails;
    time_slot: BookingTimeSlots;
    booked_on: string;
    booking_status: string;
    payment_status: string;
    pdf: any
}

export interface CourseDetails {
    id: string;
    title: string;
    description: string;
    price: string;
    product: string[];
    institute: string;
    start_date: string;
    end_date: string;
    maximum_bookings: number;
    time_slots: string[];
    course_mode: string;
    terms_and_conditions: string;
    is_active: boolean;
}
