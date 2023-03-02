import styled from 'styled-components'

export const TrendingBackgroundContainer = styled.div`
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
  min-height: 100vh;
  color: ${props => (props.isDark ? 'white' : '#1e293b')};
  padding: 0;
  margin: 0;
`

export const NoSavedVideosPara = styled.p`
  color: ${props => (props.isDark ? '#e2e8f0' : ' #616e7c')};
  font-size: 18px;
  margin-top: 0px;
`
export const SavedBannerContainer = styled.div`
  padding: 35px 10%;
  background-color: ${props => (props.isDark ? '#181818' : '#f1f1f1')};
  width: 100%;
  display: flex;
  color: ${props => (props.isDark ? 'white' : '#1e293b')};
`
export const BannerLogoContainer = styled.div`
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#e1e8f0')};
  padding: 25px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const TitleTextVideo = styled.p`
  color: ${props => (props.isDark ? 'white' : '#1e293b')};
  font-size: 23px;
  margin: 5px 0;
  margin-bottom: 25px;
  font-weight: 500;
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
export const FailureHeading = styled.h1`
  color: ${props => (props.isDark ? 'white' : '#1e293b')};
  font-size: 20px;
  margin: 7px 0;
  margin-bottom: 10px;
  font-weight: 500;
`
