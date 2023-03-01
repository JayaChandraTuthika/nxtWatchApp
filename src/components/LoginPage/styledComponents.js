import styled from 'styled-components'

export const LoginBackground = styled.div`
  margin: 0;
  min-height: 100vh;
  background-color: ${props => (props.isDark ? '#212121' : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginForm = styled.form`
  background-color: ${props => (props.isDark ? ' #0f0f0f' : 'white')};
  color: ${props => (props.isDark ? '#f1f5f9' : '#616e7c')};
  width: 400px;
  border-radius: 7px;
  padding: 3%;
  padding-bottom: 4%;
  display: flex;
  box-shadow: ${props => (props.isDark ? 'none' : '0px 0px 25px 10px #e2e8f0')};
  flex-direction: column;
  @media screen and (max-width: 430px) {
    width: 90%;
  }
`
export const FormInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${props => (props.isDark ? '#64748b' : '#bdcfe7')};
  color: ${props => (props.isDark ? '#e2e8f0' : '#475569')};
  font-weight: 500;
  outline: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 16px;
`
export const LoginButton = styled.button`
  margin: 0;
  margin-top: 28px;
  color: #ffffff !important;
  background-color: #3b82f6;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
`
