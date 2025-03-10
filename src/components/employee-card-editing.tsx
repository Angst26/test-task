import React, {FC, useState} from "react";
import styles from './employee-card.module.scss'
import {Role} from "../roles.ts";
import {useAction} from "../hooks/useAction.ts";
import {JobCheckbox} from "./job-checkbox.tsx";
import {ActionCreator} from "@reduxjs/toolkit";

interface Props {
    id: number;
    name: string,
    phoneNumber: string,
    jobTitle: string,
    handleDoubleClick: (id: number) => void;
    actionCreator: ActionCreator<any>;
    handleOnClickSave?: () => void;
}

export const EmployeeCardEditing: FC<Props> = ({id, handleDoubleClick, name, phoneNumber, jobTitle, actionCreator, handleOnClickSave}) => {
    const [editedName, setEditedName] = useState<string>(name)
    const [editedJobTitle, setEditedJobTitle] = useState<Role>(jobTitle as Role)
    const [editedPhoneNumber, setEditedPhoneNumber] = useState<string>(phoneNumber)

    const dispatchSave = useAction(actionCreator)

    const handleSave = () => {
        dispatchSave({id: id, name: editedName, isArchive: false, role: editedJobTitle as Role, phone: editedPhoneNumber, birthday: '01-01-1991'})
        if(handleOnClickSave) {
            handleOnClickSave()
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLElement
        const tag = target.tagName.toLowerCase()
        if(tag === 'input' || tag ===  'select' || tag === 'button') return
        handleDoubleClick(id)
    }

    return <div className={styles.employeeCardEdit} onDoubleClick={(e) => handleClick(e)}>
        <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Имя"
        />
        <JobCheckbox editedJobTitle={editedJobTitle} handleChange={(e) => setEditedJobTitle(e)}/>
        <input
            type="text"
            value={editedPhoneNumber}
            onChange={(e) => setEditedPhoneNumber(e.target.value)}
            placeholder="Номер телефона"
        />
        <button onClick={handleSave}>Сохранить</button>
    </div>
}