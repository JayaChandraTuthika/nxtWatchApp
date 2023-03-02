import {MdPlaylistAddCheck} from 'react-icons/md'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Sidebar from '../Sidebar'

import MainContext from '../../context/MainContext'

import {
  SavedBackgroundContainer,
  NoSavedVideosPara,
  SavedBannerContainer,
  BannerLogoContainer,
  TitleTextVideo,
} from './styledComponents'

import './index.css'

const SavedVideos = () => (
  <MainContext.Consumer>
    {value => {
      const {isDark, savedVideos} = value
      let pageContent
      if (savedVideos.length === 0) {
        pageContent = (
          <div className="no-saved-videos-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
              className="no-saved-videos-image"
            />
            <h1 className="no-saved-heading">No saved videos found</h1>
            <NoSavedVideosPara>
              You can save your videos while watching them
            </NoSavedVideosPara>
          </div>
        )
      } else {
        pageContent = (
          <>
            <SavedBannerContainer isDark={isDark}>
              <BannerLogoContainer isDark={isDark}>
                <MdPlaylistAddCheck className="saved-list-icon-banner" />
              </BannerLogoContainer>
              <h1 className="banner-text-saved">Saved Videos</h1>
            </SavedBannerContainer>
            <ul className="saved-videos-list-container">
              {savedVideos.map(each => (
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
                        <p className="vd-views">{each.views} views</p> •
                        <p className="vd-views">{each.publishedAt} </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )
      }
      return (
        <SavedBackgroundContainer isDark={isDark} data-testid="savedVideos">
          <Header />
          <div className="sidebar-content-section">
            <Sidebar />
            <div className="content-section-saved-videos">{pageContent}</div>
          </div>
        </SavedBackgroundContainer>
      )
    }}
  </MainContext.Consumer>
)

export default SavedVideos
