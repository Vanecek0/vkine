import React, { useRef, useState } from 'react'
import chartStyle from "./charts.module.css"

const ChartsTabs = (props) => {
  const [toggleState, setToggleState] = useState(0);
  const tabRef = useRef();

  const toggleTab = (index) => {
    setToggleState(index)
  }

  return (
    <div ref={tabRef} className={chartStyle.chartsTabs}>
      <>

        <div className={chartStyle.headerTabs}>
          <h3>{props.children[toggleState].props.title}</h3>
          <div className={chartStyle.tabsNavigationGroup}>
            {
              React.Children.map(props.children, (child, i) => (
                <div key={i} className={`${chartStyle.tab} ${toggleState === i ? chartStyle.tabActive : ''}`} onClick={() => toggleTab(i)}>{child.props.linkTitle}</div>
              ))
            }
          </div>
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

export const ChartTab = (props) => {
  return (
    <div className={chartStyle.tabContent}>
      {props.children}
    </div>
  )
}

export default ChartsTabs