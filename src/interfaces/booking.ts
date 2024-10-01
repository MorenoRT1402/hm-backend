enum BookingStatus {
    Pending = "Pending", Booked = "Booked", Cancelled = "Cancelled", Refund = "Refund"
}
export interface Booking {
    "id": number,
    "guest": string,
    "picture": string,
    "orderDate": string,
    "checkIn": string,
    "checkOut": string,
    "discount": number,
    "notes": string[],
    "roomId": number,
    "status": BookingStatus
}