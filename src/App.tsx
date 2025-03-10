import './App.css'
import Dashboard from "./pages/dashboard.tsx";
import {Navigate, Route, Routes} from "react-router-dom";

function App() {

    return <Routes>
        <Route path="/" element={<Navigate to={'employees-list'} replace={true}/>} />
        <Route path='/employees-list' element={<Dashboard/>}/>
    </Routes>


}

export default App
