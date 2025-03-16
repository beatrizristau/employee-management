import React from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

function HeaderComponent() {
  const isAuth = isUserLoggedIn();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div>
        <header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <a href='/employees' className='navbar-brand'>Employee Management App</a>

                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                      {
                        isAuth && 
                        <li className='nav-item'>
                          <NavLink className='nav-link' to='/employees'>Employees</NavLink>
                        </li>
                      }
                      {
                        isAuth && 
                        <li className='nav-item'>
                          <NavLink className='nav-link' to='/departments'>Departments</NavLink>
                        </li>
                      }
                    </ul>
                </div>

                <ul className='navbar-nav'>
                  {
                    !isAuth &&
                    <li className='nav-item'>
                      <NavLink className='nav-link' to='/register'>Register</NavLink>
                    </li>
                  }
                  {
                    !isAuth &&
                    <li className='nav-item'>
                      <NavLink className='nav-link' to='/login'>Login</NavLink>
                    </li>
                  }
                  {
                    isAuth &&
                    <li className='nav-item'>
                      <NavLink className='nav-link' to='/login' onClick={handleLogout}>Logout</NavLink>
                    </li>
                  }
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent