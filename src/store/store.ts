import {configureStore} from "@reduxjs/toolkit";
import employeeSlice from './employees.slice.ts'

export const store = configureStore({
    reducer: {
        employeeSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch
