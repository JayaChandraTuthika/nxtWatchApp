import {Component} from 'react'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd, MdPlaylistAddCheck} from 'react-icons/md'
import Cookies from 'js-cookie'

import Header from '../Header'
import Sidebar from '../Sidebar'

import MainContext from '../../context/MainContext'

import {
  VideoBackgroundContainer,
  VideoContainer,
  VideoTextContainer,
} from './styledComponents'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    status: statusConstants.initial,
    videoDetails: {},
    liked: false,
    disliked: false,
    saved: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({status: statusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const getMovieDetailsApi = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(getMovieDetailsApi, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedVideoDetails = {
        id: data.video_details.id,
        title: data.video_details.title,
        channel: data.video_details.channel,
        thumbnailUrl: data.video_details.thumbnail_url,
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        videoUrl: data.video_details.video_url,
        views: data.video_details.view_count,
      }
      this.setState({
        status: statusConstants.success,
        videoDetails: updatedVideoDetails,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  onLikeVideo = () => {
    this.setState(prev => ({liked: !prev.liked}))
  }

  onDislikeVideo = () => {
    this.setState(prev => ({disliked: !prev.disliked}))
  }

  renderVideoDetails = () => {
    const {videoDetails, liked, disliked, saved} = this.state
    const {
      videoUrl,
      title,
      channel,
      thumbnailUrl,
      description,
      publishedAt,
      views,
    } = videoDetails
    console.log(channel)
    return (
      <>
        <VideoContainer>
          <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
        </VideoContainer>
        <MainContext.Consumer>
          {value => {
            const {isDark, onSaveVideo} = value
            const onSave = () => {
              this.setState(prev => ({saved: !prev.saved}))
              const video = {...videoDetails}
              onSaveVideo(video)
            }
            return (
              <VideoTextContainer isDark={isDark}>
                <h1 className="vd-title">{title}</h1>
                <div className="vd-second-details-container">
                  <div className="views-date-container">
                    <p className="vd-views">{views} views</p> •
                    <p className="vd-views">{publishedAt} </p>
                  </div>
                  <div className="like-container">
                    <button
                      type="button"
                      className={`like-button ${liked ? 'active' : ''}`}
                      onClick={this.onLikeVideo}
                    >
                      <BiLike className="like-icon" /> Like
                    </button>
                    <button
                      type="button"
                      className={`like-button ${disliked ? 'active' : ''}`}
                      onClick={this.onDislikeVideo}
                    >
                      <BiDislike className="like-icon" /> Dislike
                    </button>
                    <button
                      type="button"
                      className={`like-button ${saved ? 'active' : ''}`}
                      onClick={onSave}
                    >
                      <MdPlaylistAdd className="like-icon" /> Save
                    </button>
                  </div>
                </div>
                <hr className="vd-separator-line" />
                <div className="vd-channel-container">
                  <img
                    src={channel.profile_image_url}
                    alt="channel logo"
                    className="channel-profile-pic"
                  />
                  <div>
                    <p className="vd-channel-name">{channel.name}</p>
                    <p className="vd-channel-details">
                      {channel.subscriber_count} subscribers
                    </p>
                    <p className="vd-description">{description}</p>
                  </div>
                </div>
              </VideoTextContainer>
            )
          }}
        </MainContext.Consumer>
      </>
    )
  }

  render() {
    const {status} = this.state
    let details
    switch (status) {
      case statusConstants.success:
        details = this.renderVideoDetails()
        break

      default:
        details = null
        break
    }
    return (
      <MainContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <VideoBackgroundContainer
              isDark={isDark}
              data-testid="videoItemDetails"
            >
              <Header />
              <div className="sidebar-content-section">
                <Sidebar />
                <div className="content-section-video-details">{details}</div>
              </div>
            </VideoBackgroundContainer>
          )
        }}
      </MainContext.Consumer>
    )
  }
}

export default VideoItemDetails
