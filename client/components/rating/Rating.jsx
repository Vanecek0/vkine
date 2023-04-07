import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Rating = (props) => {
  const percentage = Math.round(props.rating * 10);
  const vote_count = props.vote_count;

  return (
    <CircularProgressbar
      value={percentage}
      maxValue={100}
      text={vote_count > 0 ? `${percentage}%` : 'NR'}
      background={true}
      backgroundPadding={5}
      styles={buildStyles({
        textSize: '16px',
        pathTransitionDuration: 0.5,
        pathColor: `#0d6efd`,
        textColor: '#fff',
        textSize: 20,
        trailColor: 'rgb(50, 50, 50)',
        backgroundColor: '#212529',
      })}
    />
  )
}

export default Rating