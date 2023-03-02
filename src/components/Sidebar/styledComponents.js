import styled from 'styled-components'

export const SidebarContainer = styled.div`
  background-color: ${props => (props.isDark ? '#212121' : 'transparent')};
  height: 100vh;
  max-width: 23%;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
`
export const SidebarBottomContainer = styled.div`
  color: ${props => (props.isDark ? 'white' : '#475569')};
  padding: 15px;
`
export const Option = styled.li`
  width: 100%;
  padding: 15px;
  text-align: left;
  background-color: ${props => {
    if (props.isDark) {
      return props.active ? '#424242' : 'transparent'
    }
    return props.active ? '#e2e8f0' : 'transparent'
  }};
  color: ${props => {
    if (props.isDark) {
      return props.active ? 'white' : '#cccccc'
    }
    return props.active ? ' #1e293b' : '#475569'
  }};
  font-size: ${props => (props.active ? '20px' : '20px')};
  font-weight: ${props => (props.active ? '600' : '400')};
  cursor: pointer;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
`
