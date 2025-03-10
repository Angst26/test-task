import {JobCheckbox} from "./job-checkbox.tsx";
import styles from '../pages/dashboard.module.scss'
import {ChangeEvent, Dispatch, FC, SetStateAction} from "react";
import {Role} from "../roles.ts";

interface IProps {
    textButton: string;
    isFiltered: boolean;
    setIsFiltered: (value: boolean) => void;
    jobTitle: Role;
    isArchived: boolean;
    handleChangeTitle: Dispatch<SetStateAction<Role>>;
    handleChangeIsArchived: Dispatch<SetStateAction<boolean>>;
}


export const FilterComponent: FC<IProps> = ({
                                                textButton,
                                                isFiltered,
                                                setIsFiltered,
                                                jobTitle,
                                                isArchived,
                                                handleChangeTitle,
                                                handleChangeIsArchived
                                            }) => {



    return (
        <div className={styles.filterContainer}>
            <JobCheckbox handleChange={handleChangeTitle} editedJobTitle={jobTitle}/>
            <span>в архиве</span>
            <input
                type="checkbox"
                checked={isArchived}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeIsArchived(e.target.checked)}/>
            <button onClick={() => setIsFiltered(!isFiltered)}>{textButton}</button>
        </div>
    )
}