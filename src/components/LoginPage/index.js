import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import MainContext from '../../context/MainContext'

import './index.css'
import {
  LoginBackground,
  LoginForm,
  FormInput,
  LoginButton,
} from './styledComponents'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showError: false,
    errorMsg: '',
  }

  onUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  togglePasswordShow = event => {
    if (event.target.checked) {
      this.setState({showPassword: true})
    } else {
      this.setState({showPassword: false})
    }
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showPassword, showError, errorMsg} = this.state

    return (
      <MainContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <LoginBackground isDark={isDark}>
              <LoginForm isDark={isDark} onSubmit={this.submitLoginForm}>
                <img
                  src={
                    isDark
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                  className="website-logo-login"
                />
                <label className="form-label" htmlFor="usernameInput">
                  USERNAME
                </label>
                <FormInput
                  isDark={isDark}
                  type="text"
                  id="usernameInput"
                  value={username}
                  onChange={this.onUsernameInput}
                />
                <label className="form-label" htmlFor="passwordInput">
                  PASSWORD
                </label>
                <FormInput
                  isDark={isDark}
                  type={showPassword ? 'text' : 'password'}
                  id="passwordInput"
                  value={password}
                  onChange={this.onPasswordInput}
                />
                <div>
                  <input
                    type="checkbox"
                    id="showPassword"
                    className="show-password-checkbox"
                    onChange={this.togglePasswordShow}
                  />
                  <label htmlFor="showPassword" className="show-password-label">
                    Show Password
                  </label>
                </div>
                <LoginButton type="submit">Login</LoginButton>
                {showError && <p className="error-msg-login">{errorMsg}</p>}
              </LoginForm>
            </LoginBackground>
          )
        }}
      </MainContext.Consumer>
    )
  }
}

export default LoginPage
