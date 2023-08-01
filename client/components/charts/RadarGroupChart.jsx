import React from 'react'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import chartStyle from './charts.module.css'

function getRandomNumber(maxval) {
    return Math.floor(Math.random() * maxval);
}

const datag = [
    {
        subject: 'Akční',
        A: getRandomNumber(120),
        fullMark: 150,
    },
    {
        subject: 'Dobrodružný',
        A: getRandomNumber(120),
        fullMark: 150,
    },
    {
        subject: 'Animovaný',
        A: getRandomNumber(120),
        fullMark: 150,
    },
    {
        subject: 'Komedie',
        A: getRandomNumber(120),
        fullMark: 150,
    },
    {
        subject: 'Sci-Fi',
        A: getRandomNumber(120),
        fullMark: 150,
    },
    {
        subject: 'Krimi',
        A: getRandomNumber(120),
        fullMark: 150,
    },
    {
        subject: 'Dokumentární',
        A: getRandomNumber(120),
        fullMark: 150,
    },
    {
        subject: 'Drama',
        A: getRandomNumber(120),
        fullMark: 150,
    },
    {
        subject: 'Rodinný',
        A: getRandomNumber(120),
        fullMark: 150,
    },
    {
        subject: 'Fantasy',
        A: getRandomNumber(120),
        fullMark: 150,
    },
    {
        subject: 'Historický',
        A: getRandomNumber(120),
        fullMark: 150,
    },
];

const RadarGroupChart = (props) => {
    return (
        <div className={chartStyle.chartWrapper}>
            {props.title && (<h3 className='mt-3'>{props.title}</h3>)}
            <div className={chartStyle.chartContent}>
                <ResponsiveContainer width="100%" height="100%" aspect={props.aspect}>
                    <RadarChart data={props.data ? props.data : datag}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <Tooltip content={props.customTooltip ? props.customTooltip : null} cursor={{ stroke: 'grey', strokeWidth: 2 }} />
                        <Radar name="filmy" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.85} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default RadarGroupChart