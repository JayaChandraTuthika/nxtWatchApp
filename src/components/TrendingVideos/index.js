import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Sidebar from '../Sidebar'

import MainContext from '../../context/MainContext'

import {
  TrendingBackgroundContainer,
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

class TrendingVideos extends Component {
  state = {
    status: statusConstants.initial,
    trendingVideos: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({status: statusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const trendingApiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendingApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        id: each.id,
        channel: each.channel,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        status: statusConstants.success,
        trendingVideos: updatedData,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  renderTrendingVideos = () => {
    const {trendingVideos} = this.state
    return (
      <MainContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <SavedBannerContainer isDark={isDark}>
                <BannerLogoContainer isDark={isDark}>
                  <HiFire className="saved-list-icon-banner" />
                </BannerLogoContainer>
                <h1 className="banner-text-saved">Trending</h1>
              </SavedBannerContainer>
              <ul className="saved-videos-list-container">
                {trendingVideos.map(each => (
                  <li className="saved-video-list-item" key={each.id}>
                    <Link
                      to={`/videos/${each.id}`}
                      className="link-style-saved-video"
                    >
                      <img
                        src={each.thumbnailUrl}
                        alt="video thumbnail"
                        className="saved-video-image"
                      />
                      <div className="saved-video-text-container">
                        <TitleTextVideo isDark={isDark}>
                          {each.title}
                        </TitleTextVideo>
                        <p className="saved-video-channel-name">
                          {each.channel.name}
                        </p>
                        <div className="views-date-container">
                          <p className="vd-views">{each.viewCount} views</p> •
                          <p className="vd-views">{each.publishedAt} </p>
                        </div>
                      </div>
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

  onRetryTrending = () => {
    this.getTrendingVideos()
  }

  renderTrendingFailure = () => (
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
              onClick={this.onRetryTrending}
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
        pageContent = this.renderTrendingVideos()
        break
      case statusConstants.failure:
        pageContent = this.renderTrendingFailure()
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
            <TrendingBackgroundContainer isDark={isDark} data-testid="trending">
              <Header />
              <div className="sidebar-content-section">
                <Sidebar />
                <div className="content-section--saved-videos">
                  {pageContent}
                </div>
              </div>
            </TrendingBackgroundContainer>
          )
        }}
      </MainContext.Consumer>
    )
  }
}

export default TrendingVideos
