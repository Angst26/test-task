import {Role} from "../roles.ts";

 interface IEmployee {
    id: number,
    name: string,
    isArchive: boolean,
    role: Role,
    phone: string,
    birthday: string
}

export type {IEmployee}