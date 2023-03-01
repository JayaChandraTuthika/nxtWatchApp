import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import MainContext from './context/MainContext'

import LoginPage from './components/LoginPage'
import Home from './components/HomePage'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {
    isDark: false,
    savedVideos: [],
  }

  toggleDarkMode = () => {
    this.setState(prev => ({isDark: !prev.isDark}))
  }

  onToggleSaveVideo = video => {
    const {savedVideos} = this.state
    const vid = savedVideos.find(each => each.id === video.id)
    if (vid === undefined) {
      const newVideosList = [...savedVideos, video]
      this.setState({savedVideos: newVideosList})
    } else {
      const newVideosList = savedVideos.filter(each => each.id !== video.id)
      this.setState({savedVideos: newVideosList})
    }
  }

  render() {
    const {isDark, savedVideos} = this.state
    // console.log(savedVideos)
    return (
      <>
        <MainContext.Provider
          value={{
            isDark,
            toggleDarkMode: this.toggleDarkMode,
            savedVideos,
            onSaveVideo: this.onToggleSaveVideo,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
          </Switch>
        </MainContext.Provider>
      </>
    )
  }
}

export default App
