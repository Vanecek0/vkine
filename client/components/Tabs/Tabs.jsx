import React, { useRef, useState } from 'react'
import tabsStyle from "./Tabs.module.css"

const Tabs = (props) => {
  const [toggleState, setToggleState] = useState(0);
  const tabRef = useRef();

  const toggleTab = (index) => {
    setToggleState(index)
  }

  return (
    <div ref={tabRef} className={tabsStyle.tabs}>
        <>
          <div className={tabsStyle.headerTabs}>
            {
              React.Children.map(props.children, (child, i) => (
                <div key={i} className={`${tabsStyle.tab} ${toggleState === i ? tabsStyle.tabActive : ''}`} onClick={() => toggleTab(i)}>{child.props.title}</div>
              ))
            }
          </div>
          {
            React.Children.map(props.children, (child, i) => (
              toggleState === i ? child : ''
            ))
          }
        </>
    </div>
  )
}

export const Tab = (props) => {
  return (
    <div className={tabsStyle.tabContent}>
      {props.children}
    </div>
  )
}

export default Tabs