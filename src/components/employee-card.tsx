import {FC} from "react";
import styles from './employee-card.module.scss'
import {Role, RoleMap} from "../roles.ts";
import {EmployeeCardEditing} from "./employee-card-editing.tsx";
import {editEmployee} from "../store/employees.slice.ts";

interface IProps {
    id: number;
    name: string,
    phoneNumber: string,
    jobTitle: string,
    handleDoubleClick: (id: number) => void;
    handleDelete: (id: number) => void;
    editing: boolean;
}


export const EmployeeCard: FC<IProps> = ({id, name, phoneNumber, jobTitle, handleDoubleClick, editing, handleDelete}) => {

    const onDoubleClick = () => {
        if(handleDoubleClick){
            handleDoubleClick(id)
        }
    }

    const handleClickDelete = () => {
        handleDelete(id)
    }

    if(editing){
        return <EmployeeCardEditing
            actionCreator={editEmployee}
            id={id} handleDoubleClick={handleDoubleClick} name={name} jobTitle={jobTitle} phoneNumber={phoneNumber}></EmployeeCardEditing>
    }

    return <div className={styles.employeeCard} onDoubleClick={onDoubleClick}>
        <h1> {name}</h1>
        <h1> {RoleMap[jobTitle as Role]}</h1>
        <h1> {phoneNumber}</h1>
        <button onClick={handleClickDelete}>удалить</button>
    </div>
};