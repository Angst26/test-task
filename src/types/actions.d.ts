import {PayloadAction} from "@reduxjs/toolkit";
import {IEmployee} from "./employee";

type PayloadEditEmployee = PayloadAction<Partial<IEmployee>>
type PayLoadCurrentChangeId = PayloadAction<number>
type PayloadDeleteEmployee = PayloadAction<number>
type PayloadAddEmployee = PayloadAction<IEmployee>


export {type PayloadEditEmployee, type PayLoadCurrentChangeId, type PayloadDeleteEmployee, type PayloadAddEmployee};