import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Cookies from 'js-cookie'

import Header from '../Header'
import Sidebar from '../Sidebar'

import MainContext from '../../context/MainContext'

import {
  VideoBackgroundContainer,
  VideoContainer,
  VideoTextContainer,
  VideoButton,
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
    this.setState(prev => ({liked: !prev.liked, disliked: false}))
  }

  onDislikeVideo = () => {
    this.setState(prev => ({disliked: !prev.disliked, liked: false}))
  }

  renderVideoDetails = () => {
    const {videoDetails, liked, disliked} = this.state
    const {
      id,
      videoUrl,
      title,
      channel,
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
            const {isDark, onSaveVideo, savedVideos} = value
            const onSave = () => {
              const video = {...videoDetails}
              onSaveVideo(video)
            }
            const vid = savedVideos.find(each => each.id === id)
            let saved
            if (vid === undefined) {
              saved = false
            } else {
              saved = true
            }
            return (
              <VideoTextContainer isDark={isDark}>
                <p className="vd-title">{title}</p>
                <div className="vd-second-details-container">
                  <div className="views-date-container">
                    <p className="vd-views">{views} views</p> •
                    <p className="vd-views">{publishedAt} </p>
                  </div>
                  <div className="like-container">
                    <VideoButton
                      type="button"
                      active={liked}
                      onClick={this.onLikeVideo}
                    >
                      <BiLike className="like-icon" /> Like
                    </VideoButton>
                    <VideoButton
                      type="button"
                      active={disliked}
                      onClick={this.onDislikeVideo}
                    >
                      <BiDislike className="like-icon" /> Dislike
                    </VideoButton>
                    <VideoButton type="button" active={saved} onClick={onSave}>
                      <MdPlaylistAdd className="like-icon" />{' '}
                      {saved ? 'Saved' : 'Save'}
                    </VideoButton>
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

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {status} = this.state
    let details
    switch (status) {
      case statusConstants.success:
        details = this.renderVideoDetails()
        break
      case statusConstants.inProgress:
        details = this.renderLoader()
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
