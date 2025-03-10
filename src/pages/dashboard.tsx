import {useEffect, useState} from "react";
import {EmployeeCard} from "../components/employee-card.tsx";
import {
    addEmployee,
    deleteEmployee,
    fetchEmployees,
    setCurrentChangeEmployeeId
} from "../store/employees.slice.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {useAction, useAppSelector} from "../hooks/useAction.ts";
import {IEmployee} from "../types/employee";
import styles from './dashboard.module.scss'
import {FilterComponent} from "../components/filter-component.tsx";
import {Role} from "../roles.ts";
import {EmployeeCardEditing} from "../components/employee-card-editing.tsx";
import {AddEmployeeButton} from "../components/add-employee-button.tsx";




export default function Dashboard() {
    const employees: IEmployee[] = useAppSelector((state: RootState) => state.employeeSlice.employees)
    const currentEditingId = useSelector((state: RootState) => state.employeeSlice.currentChangeEmployeeId)
    const setEmployeeEditingId = useAction(setCurrentChangeEmployeeId);
    const dispatchFetchEmployees = useAction(fetchEmployees);

    //фильтрация списка
    const [isFiltered, setIsFiltered] = useState<boolean>(false); //флаг для фильтрации
    const [isArchived, setIsArchived] = useState<boolean>(false);
    const [filterJobTitle, setFilterJobTitle] = useState<Role>('waiter')
    const [isAddEmployeeForm, setIsAddEmployeeForm] = useState<boolean>(false);

    //добавление/удаление сотрудников
    const [nextId, setNextId] = useState<number>(employees.length);
    const dispatchDeleteEmployee = useAction(deleteEmployee);

    const handleDeleteEmployee = (id: number) => {
        dispatchDeleteEmployee(id)
    }

    useEffect(() => {
        dispatchFetchEmployees()
    }, []);

    const handleDoubleClick = (id: number) => {
        setEmployeeEditingId(id)
    }

    const handleAddEmployee = () => {
        setIsAddEmployeeForm(prev => !prev)
        setNextId( nextId + 1)
    }

    return <div className={styles.dashboardContainer}>
        <FilterComponent
            textButton={!isFiltered ? 'фильтровать' : 'сбросить фильтры'}
            isFiltered={isFiltered}
            setIsFiltered={setIsFiltered}
            jobTitle={filterJobTitle} isArchived={isArchived}
            handleChangeIsArchived={setIsArchived}
            handleChangeTitle={setFilterJobTitle}
        />

        <AddEmployeeButton onClick={() => setIsAddEmployeeForm(prev => !prev)}/>

        {isAddEmployeeForm &&
            <EmployeeCardEditing
                id={nextId}
                name={''}
                phoneNumber={''}
                jobTitle={'waiter'}
                handleDoubleClick={() => setIsAddEmployeeForm(prev => !prev)}
                actionCreator={addEmployee}
                handleOnClickSave={handleAddEmployee}
            />}

        {employees.length > 0 && employees
            .filter(e => {
                if (!isFiltered) {
                    return e
                } else {
                    return e.isArchive === isArchived && e.role === filterJobTitle;
                }
            })
            .map(emp =>
                <EmployeeCard
                    handleDelete={handleDeleteEmployee}
                    handleDoubleClick={handleDoubleClick}
                    editing={emp.id === currentEditingId}
                    id={emp.id}
                    key={emp.id} name={emp.name}
                    phoneNumber={emp.phone} jobTitle={emp.role}
                />
            )
        }
    </div>
}