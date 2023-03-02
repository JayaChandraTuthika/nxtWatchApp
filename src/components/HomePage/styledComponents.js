import styled from 'styled-components'

export const HomeBackground = styled.div`
  background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
  min-height: 100vh;
  padding: 0;
  margin: 0;
`
export const BannerContainer = styled.div`
  width: 100%;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  padding: 25px 45px;
  background-size: contain;
  background-position: cover;
  background-position: right;

  display: flex;
  justify-content: space-between;
`
export const FailureContainer = styled.div`
  color: ${props => (props.isDark ? 'white' : '#1e293b')};

  padding: 2%;
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: white;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 25px;
  border: none;
  outline: none;
  border-radius: 7px;
  cursor: pointer;
`
