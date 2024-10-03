enum RoomStatus {
    Available = "Available", Booked = "Booked"
}
export interface Room {
    "id": number,
    "dateAdded": string,
    "roomType": string,
    "number": number,
    "picture": string,
    "bedType": string,
    "roomFloor": string,
    "facilities": string[],
    "rate": string,
    "discount": number,
    "status": RoomStatus
}

export type RoomInput = Omit<Room, 'id'>;