import employees from '../data/employees.json'

export async function getEmployees(): Promise<unknown> {

        return new Promise<unknown>((resolve, reject) => {
            setTimeout(() => {
                const data = JSON.stringify(employees)
                if(data){
                    resolve(data)
                } else {
                     reject(new Error('Ошибка получения данных о сотрудниках!'));
                }
            }, 2000)
        })

}