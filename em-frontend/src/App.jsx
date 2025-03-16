import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import DepartmentComponent from './components/DepartmentComponent'
import RegisterComponent from './components/RegisterComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/* http://localhost:3000/employees */}
            <Route path='/employees' element = { <ListEmployeeComponent /> }></Route>

            {/* http://localhost:3000/employees/add */}
            <Route path='/employees/add' element = { <EmployeeComponent /> }></Route>

            {/* http://localhost:3000/employees/update/{id} */}
            <Route path='/employees/update/:id' element = { <EmployeeComponent /> }></Route>

            {/* http://localhost:3000/departments */}
            <Route path='/departments' element = { <ListDepartmentComponent /> }></Route>

            {/* http://localhost:3000/departments/add */}
            <Route path='/departments/add' element = { <DepartmentComponent /> }></Route>

            {/* http://localhost:3000/departments/update/{id} */}
            <Route path='/departments/update/:id' element = { <DepartmentComponent /> }></Route>

            {/* http://localhost:3000/register*/}
            <Route path='/register' element = { <RegisterComponent /> }></Route>
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
