import React from 'react'

const MainContext = React.createContext({
  isDark: false,
  toggleDarkMode: () => {},
  savedVideos: [],
  onSaveVideo: () => {},
})
export default MainContext
