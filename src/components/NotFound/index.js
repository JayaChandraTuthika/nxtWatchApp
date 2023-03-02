import Header from '../Header'
import Sidebar from '../Sidebar'

import MainContext from '../../context/MainContext'

import {
  NotFoundBackgroundContainer,
  NoSavedVideosPara,
} from './styledComponents'

import './index.css'

const NotFound = () => (
  <MainContext.Consumer>
    {value => {
      const {isDark} = value

      return (
        <NotFoundBackgroundContainer isDark={isDark} data-testid="notFound">
          <Header />
          <div className="sidebar-content-section">
            <Sidebar />
            <div className="content-section-saved-videos">
              <div className="no-saved-videos-container">
                <img
                  src={
                    isDark
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                  }
                  alt="not found"
                  className="no-saved-videos-image"
                />
                <h1 className="no-saved-heading">Page Not Found</h1>
                <NoSavedVideosPara>
                  we are sorry, the page you requested could not be found.
                </NoSavedVideosPara>
              </div>
            </div>
          </div>
        </NotFoundBackgroundContainer>
      )
    }}
  </MainContext.Consumer>
)

export default NotFound
