import styled from 'styled-components'

export const Navbar = styled.nav`
  background-color: ${props => (props.isDark ? '#212121' : 'transparent')};
  padding: 20px 7%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const LogoutButton = styled.button`
  border: 2px solid ${props => (props.isDark ? 'white' : '#3b82f6')};
  color: ${props => (props.isDark ? '#f1f1f1' : '#3b82f6')};
  padding: 6px 12px;
  background-color: transparent;
  border-radius: 3px;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  margin: 0 15px;
  cursor: pointer;
`
export const ModalContainer = styled.div`
  background-color: ${props => (props.isDark ? '#212121' : 'white')};
  padding: 40px;
  width: 390px;
  text-align: center;
  border-radius: 10px;
  color: ${props => (props.isDark ? '#cbd5e1' : '#1e293b')};
`
