import React from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn } from '../services/AuthService'

function HeaderComponent() {
  const isAuth = isUserLoggedIn();

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
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent