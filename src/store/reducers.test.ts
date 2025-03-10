import {employeesSlice, IEmployeeState} from './employees.slice';
import {  IEmployee } from '../types/employee'; // Adjust the path to where IEmployeeState and IEmployee are defined

describe('employeesSlice reducers', () => {
    let initialState: IEmployeeState;

    beforeEach(() => {
        initialState = {
            employees: [],
            currentChangeEmployeeId: null,
        };
    });

    it('should handle addEmployee', () => {
        const newEmployee: IEmployee = { id: 1, name: 'John Doe', phone: '1234567890', isArchive: false, role: 'waiter', birthday: '1990-01-01' };
        const action = { type: employeesSlice.actions.addEmployee.type, payload: newEmployee };
        const state = employeesSlice.reducer(initialState, action);
        expect(state.employees).toContainEqual(newEmployee);
    });

    it('should handle deleteEmployee', () => {
        const stateWithEmployee: IEmployeeState = {
            ...initialState,
            employees: [{ id: 1, name: 'John Doe', phone: '1234567890', isArchive: false, role: 'cook', birthday: '1990-01-01' }],
        };
        const action = { type: employeesSlice.actions.deleteEmployee.type, payload: 1 };
        const state = employeesSlice.reducer(stateWithEmployee, action);
        expect(state.employees).toHaveLength(0);
    });

    it('should handle setCurrentChangeEmployeeId', () => {
        const action = { type: employeesSlice.actions.setCurrentChangeEmployeeId.type, payload: 1 };
        const state = employeesSlice.reducer(initialState, action);
        expect(state.currentChangeEmployeeId).toBe(1);

        const toggleAction = { type: employeesSlice.actions.setCurrentChangeEmployeeId.type, payload: 1 };
        const toggledState = employeesSlice.reducer(state, toggleAction);
        expect(toggledState.currentChangeEmployeeId).toBeNull();
    });

    it('should handle editEmployee', () => {
        const stateWithEmployee: IEmployeeState = {
            ...initialState,
            employees: [{ id: 1, name: 'John Doe', phone: '1234567890', isArchive: false, role: 'waiter', birthday: '1990-01-01' }],
            currentChangeEmployeeId: 1,
        };
        const updatedData: Partial<IEmployee> = { name: 'Jane Doe', phone: '0987654321' };
        const action = { type: employeesSlice.actions.editEmployee.type, payload: updatedData };
        const state = employeesSlice.reducer(stateWithEmployee, action);
        expect(state.employees[0]).toEqual({ id: 1, ...updatedData, isArchive: false, role: 'waiter', birthday: '1990-01-01' });
        expect(state.currentChangeEmployeeId).toBeNull();
    });
});

   
