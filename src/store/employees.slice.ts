import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getEmployees} from "../api/api";
import {IEmployee} from "../types/employee";
import {PayloadAddEmployee, PayLoadCurrentChangeId, PayloadDeleteEmployee, PayloadEditEmployee} from "../types/actions";

export interface IEmployeeState {
    employees: IEmployee[]
    currentChangeEmployeeId?: number | null;
}

const initialState: IEmployeeState = {
    employees: [],
    currentChangeEmployeeId: null,
}


export const fetchEmployees = createAsyncThunk(
    'employees.fetchEmployees',
    async () => {
        const employees = await getEmployees()
        if (typeof employees === 'string') {
            return JSON.parse(employees) as IEmployee[]
        } else {
            return employees as IEmployee[]
        }
    }
)


export const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAddEmployee) => {
            debugger
            if (action.payload.name && action.payload.phone) {
                state.employees.push(action.payload);
            } else return;
        },
        deleteEmployee: (state, action: PayloadDeleteEmployee) => {

            state.employees = state.employees.filter(employee => employee.id !== action.payload)
        },
        setCurrentChangeEmployeeId: (state, action: PayLoadCurrentChangeId) => {
            if (state.currentChangeEmployeeId === action.payload) {
                state.currentChangeEmployeeId = null;
            } else {
                state.currentChangeEmployeeId = action.payload;
            }
        },
        editEmployee: (state, action: PayloadEditEmployee) => {
            if (!state.currentChangeEmployeeId) return
            const employeeIndex = state.employees.findIndex(
                employee => employee.id === state.currentChangeEmployeeId
            )

            if (employeeIndex !== -1) {
                state.employees[employeeIndex] = {
                    ...state.employees[employeeIndex],
                    ...action.payload
                }

                //убираем сотрудника с редактирования
                state.currentChangeEmployeeId = null;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
            state.employees = action.payload;
        })
    }
})


export default employeesSlice.reducer;
export const {addEmployee, setCurrentChangeEmployeeId, editEmployee, deleteEmployee} = employeesSlice.actions;