import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
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
        </Routes>
        
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
