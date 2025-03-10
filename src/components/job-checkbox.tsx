import {ChangeEvent, Dispatch, FC, SetStateAction} from "react";
import {Role} from "../roles.ts";

// @ts-i
interface IProps {
    editedJobTitle: string,
    handleChange: Dispatch<SetStateAction<Role>>;
}

export const JobCheckbox: FC<IProps> = ({editedJobTitle, handleChange}) => {


    return (
        <select value={editedJobTitle} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e.target.value as Role)}>
            <option value="driver">Водитель</option>
            <option value="waiter">Официант</option>
            <option value="cook">Повар</option>
        </select>
    )
}