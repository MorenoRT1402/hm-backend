enum UserStatus {
    Active = "Active", Inactive = "Inactive"
}
export interface User {
    "id": number,
    "name": string,
    "picture": string,
    "position": string,
    "email": string,
    "contact": string,
    "joined": string,
    "jobDesk": string,
    "schedule": string[],
    "status": UserStatus,
    "password": string,
}