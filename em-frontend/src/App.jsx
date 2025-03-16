import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import DepartmentComponent from './components/DepartmentComponent'
import RegisterComponent from './components/RegisterComponent'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'

function App() {

  function AuthenticatedRoute({children}) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    } else {
      return <Navigate to="/"/>
    }
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/* http://localhost:3000/ */}
            <Route path='/' element = { <LoginComponent /> }></Route>

            {/* http://localhost:3000/employees */}
            <Route path='/employees' element = { 
              <AuthenticatedRoute>
                <ListEmployeeComponent />
              </AuthenticatedRoute>
            }></Route>

            {/* http://localhost:3000/employees/add */}
            <Route path='/employees/add' element = { 
              <AuthenticatedRoute>
                <EmployeeComponent />
              </AuthenticatedRoute>
            }></Route>

            {/* http://localhost:3000/employees/update/{id} */}
            <Route path='/employees/update/:id' element = { 
              <AuthenticatedRoute>
                <EmployeeComponent />
              </AuthenticatedRoute>
            }></Route>

            {/* http://localhost:3000/departments */}
            <Route path='/departments' element = { 
              <AuthenticatedRoute>
                <ListDepartmentComponent />
              </AuthenticatedRoute>
            }></Route>

            {/* http://localhost:3000/departments/add */}
            <Route path='/departments/add' element = { 
              <AuthenticatedRoute>
                <DepartmentComponent />
              </AuthenticatedRoute>
            }></Route>

            {/* http://localhost:3000/departments/update/{id} */}
            <Route path='/departments/update/:id' element = { 
              <AuthenticatedRoute>
                <DepartmentComponent />
              </AuthenticatedRoute>
            }></Route>

            {/* http://localhost:3000/register */}
            <Route path='/register' element = { <RegisterComponent /> }></Route>

            {/* http://localhost:3000/login */}
            <Route path='/login' element = { <LoginComponent /> }></Route>
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
