import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Sidebar from '../Sidebar'

import MainContext from '../../context/MainContext'

import {
  GamingBackgroundContainer,
  NoSavedVideosPara,
  SavedBannerContainer,
  BannerLogoContainer,
  TitleTextVideo,
  RetryButtonTrending,
} from './styledComponents'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GamingVideos extends Component {
  state = {
    status: statusConstants.initial,
    gamingVideos: [],
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({status: statusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const trendingApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendingApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(each => ({
        id: each.id,

        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))

      this.setState({
        status: statusConstants.success,
        gamingVideos: updatedData,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  renderGamingVideos = () => {
    const {gamingVideos} = this.state
    return (
      <MainContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <SavedBannerContainer isDark={isDark}>
                <BannerLogoContainer isDark={isDark}>
                  <SiYoutubegaming className="saved-list-icon-banner" />
                </BannerLogoContainer>
                <h1 className="banner-text-saved">Gaming</h1>
              </SavedBannerContainer>
              <ul className="gaming-videos-list-container">
                {gamingVideos.map(each => (
                  <li className="gaming-video-list-item" key={each.id}>
                    <Link
                      to={`/videos/${each.id}`}
                      className="link-style-gaming"
                    >
                      <img
                        src={each.thumbnailUrl}
                        alt="video thumbnail"
                        className="gaming-video-item-image"
                      />
                      <TitleTextVideo isDark={isDark}>
                        {each.title}
                      </TitleTextVideo>
                      <p className="game-video-card-para">
                        {each.viewCount} Watching Worldwide
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )
        }}
      </MainContext.Consumer>
    )
  }

  onRetryGaming = () => {
    this.getGamingVideos()
  }

  renderGamingFailure = () => (
    <MainContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <div className="no-saved-videos-container">
            <img
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt="failure view"
              className="no-saved-videos-image"
            />
            <h1 className="no-saved-heading">Oops! Something Went Wrong</h1>
            <NoSavedVideosPara>
              We are having some trouble to complete your request. PLease try
              again
            </NoSavedVideosPara>
            <RetryButtonTrending
              type="button"
              onClick={this.onRetryGaming}
              className="no-videos-retry-btn"
            >
              Retry
            </RetryButtonTrending>
          </div>
        )
      }}
    </MainContext.Consumer>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {status} = this.state
    let pageContent
    switch (status) {
      case statusConstants.success:
        pageContent = this.renderGamingVideos()
        break
      case statusConstants.failure:
        pageContent = this.renderGamingFailure()
        break
      case statusConstants.inProgress:
        pageContent = this.renderLoader()
        break

      default:
        pageContent = null
        break
    }
    return (
      <MainContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <GamingBackgroundContainer isDark={isDark} data-testid="gaming">
              <Header />
              <div className="sidebar-content-section">
                <Sidebar />
                <div className="content-section-saved-videos">
                  {pageContent}
                </div>
              </div>
            </GamingBackgroundContainer>
          )
        }}
      </MainContext.Consumer>
    )
  }
}

export default GamingVideos
