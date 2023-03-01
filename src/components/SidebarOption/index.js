import {Option} from './styledComponents'

const SidebarOption = props => {
  const {optionDetails, activeTab, isDark, onChangeTab} = props
  const {id, displayText} = optionDetails
  const onTabClick = () => {
    onChangeTab(id)
  }

  return (
    <Option active={activeTab === id} isDark={isDark} onClick={onTabClick}>
      {displayText}
    </Option>
  )
}

export default SidebarOption
