import styled from 'styled-components'

export const VideoBackgroundContainer = styled.div`
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
  min-height: 100vh;
  padding: 0;
  margin: 0;
`
export const VideoButton = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.active ? '#2563eb' : '#64748b')};
  font-size: 17px;
  font-weight: 500;
  margin: 0px 5px;
  cursor: pointer;
  border: none;
  outline: none;
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
export const RetryButtonTrending = styled.button`
  background-color: #4f46e5;
  color: white;
  font-size: 15px;
  font-weight: 600;
  padding: 13px 28px;
  border: none;
  outline: none;
  border-radius: 7px;
  cursor: pointer;
`
export const NoSavedVideosPara = styled.p`
  color: #616e7c;
  font-size: 18px;
  margin-top: 0px;
`
export const FailureHeading = styled.h1`
  color: ${props => (props.isDark ? 'white' : '#1e293b')};
  font-size: 20px;
  margin: 7px 0;
  margin-bottom: 10px;
  font-weight: 500;
`
