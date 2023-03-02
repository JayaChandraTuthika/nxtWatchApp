import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GrFormClose} from 'react-icons/gr'
import {BiSearch} from 'react-icons/bi'
import './index.css'

import MainContext from '../../context/MainContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import HomeMovieCardItem from '../HomeMovieCardItem'

import {
  HomeBackground,
  BannerContainer,
  FailureContainer,
  RetryButton,
} from './styledComponents'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    showBanner: true,
    homeMoviesList: [],
    homeStatus: statusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchForSelectedMovies = () => {
    this.getHomeVideos()
  }

  hideBanner = () => {
    this.setState({showBanner: false})
  }

  getHomeVideos = async () => {
    this.setState({homeStatus: statusConstants.inProgress})
    const {searchInput} = this.state
    const getHomeMoviesApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(getHomeMoviesApiUrl, options)
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
      console.log(data)
      this.setState({
        homeStatus: statusConstants.success,
        homeMoviesList: updatedData,
      })
    } else {
      this.setState({homeStatus: statusConstants.failure})
    }
  }

  onRetryHome = () => {
    this.getHomeVideos()
  }

  renderBanner = () => (
    <BannerContainer className="banner-container" data-testid="banner">
      <div className="banner-text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="banner-website-logo"
        />
        <p className="banner-text">
          Buy Nxt Watch Premium prepaid plans with UPI
        </p>
        <button type="button" className="banner-get-it-button">
          GET IT NOW
        </button>
      </div>
      <button
        data-testid="close"
        type="button"
        className="banner-close-btn"
        onClick={this.hideBanner}
      >
        <GrFormClose className="banner-close-icon" />
      </button>
    </BannerContainer>
  )

  renderFailureHome = () => (
    <MainContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <FailureContainer isDark={isDark}>
            <img
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt="failure view"
              className="no-saved-videos-image"
            />
            <h1 className="no-videos-heading">Oops! Something Went Wrong</h1>
            <p className="no-videos-para">
              We are having some trouble to complete your request. PLease try
              again.
            </p>
            <RetryButton
              type="button"
              onClick={this.onRetryHome}
              className="no-videos-retry-btn"
            >
              Retry
            </RetryButton>
          </FailureContainer>
        )
      }}
    </MainContext.Consumer>
  )

  renderHomeMovies = () => {
    const {homeMoviesList} = this.state
    if (homeMoviesList.length === 0) {
      return (
        <MainContext.Consumer>
          {value => {
            const {isDark} = value
            return (
              <FailureContainer isDark={isDark}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                  alt="no videos"
                  className="no-videos-image"
                />
                <h1 className="no-videos-heading">No Search results found</h1>
                <p className="no-videos-para">
                  Try different key words or remove search filter
                </p>
                <RetryButton
                  type="button"
                  onClick={this.onRetryHome}
                  className="no-videos-retry-btn"
                >
                  Retry
                </RetryButton>
              </FailureContainer>
            )
          }}
        </MainContext.Consumer>
      )
    }
    return (
      <ul className="home-movies-list-container">
        {homeMoviesList.map(each => (
          <HomeMovieCardItem key={each.id} videoDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {showBanner, homeStatus, searchInput} = this.state
    let home
    switch (homeStatus) {
      case statusConstants.success:
        home = this.renderHomeMovies()
        break
      case statusConstants.failure:
        home = this.renderFailureHome()
        break
      case statusConstants.inProgress:
        home = this.renderLoader()
        break

      default:
        home = null
        break
    }
    return (
      <MainContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <HomeBackground isDark={isDark} data-testid="home">
              <Header />
              <div className="sidebar-content-section">
                <Sidebar />
                <div className="content-section-container">
                  {showBanner && this.renderBanner()}
                  <div className="search-movies-list-container">
                    <div className="search-container">
                      <input
                        type="search"
                        className="search-input-home"
                        value={searchInput}
                        onChange={this.changeSearchInput}
                      />
                      <button
                        data-testid="searchButton"
                        type="button"
                        className="search-btn-home"
                        onClick={this.searchForSelectedMovies}
                      >
                        <BiSearch className="search-icon-home" />
                      </button>
                    </div>
                    {home}
                  </div>
                </div>
              </div>
            </HomeBackground>
          )
        }}
      </MainContext.Consumer>
    )
  }
}

export default Home
