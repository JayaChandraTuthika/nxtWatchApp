import styled from 'styled-components'

export const VideoBackgroundContainer = styled.div`
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
  min-height: 100vh;
  padding: 0;
  margin: 0;
`

export const VideoContainer = styled.div`
  width: 100%;
  height: 450px;
  @media screen and (max-width: 1000px) {
    height: 450px;
  }
  @media screen and (max-width: 600px) {
    height: 250px;
  }
`
export const VideoTextContainer = styled.div`
  color: ${props => (props.isDark ? '#e2e8f0' : '#1e293b')};
`
