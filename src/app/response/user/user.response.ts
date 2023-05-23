export interface User {
    userId: Number
    userName: string
    password: string
    email: string
    CreateAt: Date
}

export interface UserApi{
    data: any
    totalRecords: number
}

