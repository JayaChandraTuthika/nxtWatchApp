import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {MdPlaylistAddCheck} from 'react-icons/md'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'

import MainContext from '../../context/MainContext'

// import SidebarOption from '../SidebarOption'

import './index.css'
import {
  SidebarContainer,
  SidebarBottomContainer,
  Option,
} from './styledComponents'

class Sidebar extends Component {
  state = {
    activeTab: '',
  }

  componentDidMount() {
    const {match} = this.props
    const {path} = match
    if (path === '/') {
      this.setState({activeTab: 'HOME'})
    } else if (path === '/trending') {
      this.setState({activeTab: 'TRENDING'})
    } else if (path === '/gaming') {
      this.setState({activeTab: 'GAMING'})
    } else if (path === '/saved-videos') {
      this.setState({activeTab: 'SAVED_VIDEOS'})
    }
  }

  render() {
    const {activeTab} = this.state
    return (
      <MainContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <SidebarContainer isDark={isDark}>
              <ul className="sidebar-nav-links-container">
                <Link to="/" className="link-text" onClick={this.goHome}>
                  <Option active={activeTab === 'HOME'} isDark={isDark}>
                    <AiFillHome
                      className={
                        activeTab === 'HOME' ? 'active-icon' : 'inactive-icon'
                      }
                    />
                    Home
                  </Option>
                </Link>

                <Link
                  to="/trending"
                  className="link-text"
                  onClick={this.goTrending}
                >
                  <Option active={activeTab === 'TRENDING'} isDark={isDark}>
                    <HiFire
                      className={
                        activeTab === 'TRENDING'
                          ? 'active-icon'
                          : 'inactive-icon'
                      }
                    />
                    Trending
                  </Option>
                </Link>
                <Link to="/gaming" className="link-text">
                  <Option active={activeTab === 'GAMING'} isDark={isDark}>
                    <SiYoutubegaming
                      className={
                        activeTab === 'GAMING' ? 'active-icon' : 'inactive-icon'
                      }
                    />
                    Gaming
                  </Option>
                </Link>
                <Link to="/saved-videos" className="link-text">
                  <Option active={activeTab === 'SAVED_VIDEOS'} isDark={isDark}>
                    <MdPlaylistAddCheck
                      className={
                        activeTab === 'SAVED_VIDEOS'
                          ? 'active-icon'
                          : 'inactive-icon'
                      }
                    />
                    Saved videos
                  </Option>
                </Link>
              </ul>
              <SidebarBottomContainer isDark={isDark}>
                <p className="contact-us-text">CONTACT US</p>
                <div className="sidebar-bottom-icons-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="sidebar-bottom-icons-container-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="sidebar-bottom-icons-container-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="sidebar-bottom-icons-container-icon"
                  />
                </div>
                <p className="last-text-sidebar">
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </SidebarBottomContainer>
            </SidebarContainer>
          )
        }}
      </MainContext.Consumer>
    )
  }
}

export default withRouter(Sidebar)
