import {Link} from 'react-router-dom'
// import {formatDistanceToNow} from 'date-fns'

import MainContext from '../../context/MainContext'

import './index.css'
import MovieCardTitle from './StyledComponents'

const HomeMovieCardItem = props => {
  const {videoDetails} = props
  const {
    id,
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = videoDetails
  //   const date = new Date(publishedAt)

  return (
    <MainContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <li className="home-movie-card-list-item">
            <Link className="link-style" to={`/videos/${id}`}>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="movie-thumbnail-home"
              />
              <div className="video-card-bottom-container">
                <img
                  src={channel.profile_image_url}
                  alt="channel logo"
                  className="channel-image-home-movie-card"
                />
                <div className="video-card-home-text-container">
                  <MovieCardTitle isDark={isDark}>{title}</MovieCardTitle>
                  <p className="home-movie-card-channel-name">{channel.name}</p>
                  <div className="views-time-container-home-movie-card">
                    <p className="views-count-home-movie">{viewCount} views</p>{' '}
                    ·<p className="views-count-home-movie">{publishedAt}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </MainContext.Consumer>
  )
}

export default HomeMovieCardItem
