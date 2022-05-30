import React, { useContext } from 'react'
import logo from './img/dmg FOUNDATION.png'
import logoutIcon from './img/logout icon.png'
import { IntranetContext } from '../context'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'

const MyNavbar = () => {
  const { user, logout } = useContext(IntranetContext)
  const { userName } = user?.userData

  return (
    <Navbar bg='light' expand='md'>
      <Container fluid className='d-flex flex-column flex-md-row mx-3'>
        <Navbar.Brand>
          <Link className='nav-link' to='/'>
            Surveys
          </Link>
        </Navbar.Brand>
        <h5 className='text-center d-md-none'>Welcome, {userName}</h5>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse
          id='basic-navbar-nav'
          className='flex-column   flex-md-row'
        >
          <ul className='navbar-nav d-flex flex-column flex-md-row my-3 m-md-0'>
            <li>
              <Link
                className='btn btn-success text-white nav-link'
                to='/creator'
              >
                Create Survey [+]
              </Link>
            </li>
          </ul>
          <div className='   d-flex d-flex flex-column flex-md-row align-item-start align-item-md-end  my-3 m-md-0'>
            <h5 className='text-center d-none d-md-flex align-self-md-center'>
              Welcome, {userName}
            </h5>

            <div
              className='logout d-flex align-items-center ms-md-2'
              onClick={logout}
            >
              <img
                src={logoutIcon}
                alt='logout'
                height='40'
                width='40'
                className=' ms-2  '
              />
              <h5 className='nav-link'>logout</h5>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavbar
