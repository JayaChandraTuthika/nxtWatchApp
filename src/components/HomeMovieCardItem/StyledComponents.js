import styled from 'styled-components'

const MovieCardTitle = styled.p`
  color: ${props => (props.isDark ? 'white' : '#64748b')};
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: 500;
`
export default MovieCardTitle
