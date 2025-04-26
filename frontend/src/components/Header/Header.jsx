import React, { useRef, useEffect, useContext, useState } from 'react'
// import { Container, Row, Button, ButtonDropdown } from 'reactstrap'
import { Container, Row, Button} from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
// import logo from '../../assets/images/logo.png'
import logo from '../../assets/images/rideNguide.png'
import './header.css'
import { AuthContext } from '../../context/AuthContext'

const nav_links = [
  {
    path: '/home',
    display: 'Home',
  },
  // {
  //   path: '/about',
  //   display: 'About',
  // },
  {
    path: '/tours',
    display: 'Tours',
  },
  {
    path: '/guides',
    display: 'Guides',
  },
]


const Header = () => {


  const headerRef = useRef(null)
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate("/")
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }


  useEffect(() => {
    stickyHeaderFunc()
    return window.removeEventListener('scroll', stickyHeaderFunc)
  })

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navigation') && !event.target.closest('.mobile__menu')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return <header className='header' ref={headerRef}>
    <Container>
      <Row>
        <div className='nav_wrapper d-flex align-items-center justify-content-between w-screen'>
          {/*=============logo===========*/}
          <div className='logo'>
            <Link to="/" onClick={handleNavClick}>
              <img src={logo} alt="RideNGuide Logo" />
            </Link>
          </div>
          {/*=============logo end========== */}
          {/*=============menu start===========*/}
          <div className={`navigation ${isMenuOpen ? 'active' : ''}`}>
            <ul className={`menu d-flex align-items-center gap-4 ${isMenuOpen ? 'active' : ''}`}>
              {
                nav_links.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink 
                      to={item.path} 
                      className={navClass => navClass.isActive ? "active__link" : ""}
                      onClick={handleNavClick}
                    >
                      {item.display}</NavLink>
                  </li>
                ))}
            </ul>
              {/*=============menu end============= */}
          <div className='nav_right d-flex align-items-center gap-4'>
            <div className='nav__btns d-flex align-items-center gap-4 mx-auto'>

              {
                user ? (<>
                  <Link to='/users/profile' className="profile-btn" onClick={handleNavClick}>{user.username}</Link>
                  <Button className="btn btn-dark" onClick={logout}>Logout</Button>
                </>) : (<>
                  <Button className='btn secondary__btn'>
                    <Link to='/login' onClick={handleNavClick}>
                      Login
                    </Link>
                  </Button>
                  <Button className='btn primary__btn'>
                    <Link to='/register' onClick={handleNavClick}>
                      Register
                    </Link>
                  </Button>
                </>
                )
              }

            </div>
          </div>
              </div>
            <span className='mobile__menu' onClick={toggleMenu}>
              <i className={`ri-${isMenuOpen ? 'close-line' : 'menu-line'}`}></i>
            </span>
        </div>
      </Row>
    </Container>
  </header>
}

export default Header
