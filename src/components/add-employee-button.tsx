import styles from "../pages/dashboard.module.scss";

export function AddEmployeeButton(props: { onClick: () => void }) {
    return <button className={styles.addEmployee}
                   onClick={props.onClick}>
        добавить сотрудника
    </button>;
}