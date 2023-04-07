import React from 'react'

const TimeFormat = (props) => {
  const timeformat = () => {
    const minutes = props.value % 60;
    const hours = Math.floor(props.value / 60);
    return hours + "h " + minutes + "min";
  }
  return (
    <span>{timeformat()}</span>
  )
}

export default TimeFormat