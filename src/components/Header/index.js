import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import MainContext from '../../context/MainContext'

import {Navbar, LogoutButton} from './styledComponents'
import './index.css'

const Header = props => (
  <MainContext.Consumer>
    {value => {
      const {isDark, toggleDarkMode} = value

      const onChangeTheme = () => {
        toggleDarkMode()
      }

      const onLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      return (
        <Navbar isDark={isDark}>
          <Link to="/">
            <img
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="website logo"
              className="nav-logo"
            />
          </Link>

          <div className="nav-links-container">
            <button
              type="button"
              data-testid="theme"
              className="theme-btn"
              onClick={onChangeTheme}
            >
              <img
                src={
                  isDark
                    ? 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'
                }
                alt="theme"
                className="theme-image"
              />
            </button>
            <button type="button" data-testid="profile" className="theme-btn">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-icon"
              />
            </button>
            <LogoutButton isDark={isDark} onClick={onLogout}>
              Logout
            </LogoutButton>
          </div>
        </Navbar>
      )
    }}
  </MainContext.Consumer>
)

export default withRouter(Header)
