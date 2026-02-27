import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import chartStyle from './charts.module.css'

function getRandomNumber(maxval) {
    return Math.floor(Math.random()*maxval);
  }


const datag = [
    {
        name: 'Led',
        customLabel: '25.1.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
    {
        name: 'Úno',
        customLabel: '1.2.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
    {
        name: 'Bře',
        customLabel: '5.3.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
    {
        name: 'Dub',
        customLabel: '28.4.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
    {
        name: 'Kvě',
        customLabel: '18.5.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
    {
        name: 'Čer',
        customLabel: '2.6.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
    {
        name: 'Čvc',
        customLabel: '5.7.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
    {
        name: 'Srp',
        customLabel: '4.8.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
    {
        name: 'Zář',
        customLabel: '9.9.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
    {
        name: 'Říj',
        customLabel: '10.10.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
    {
        name: 'Lis',
        customLabel: '8.11.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
    {
        name: 'Pro',
        customLabel: '23.12.2023',
        uv: getRandomNumber(4000),
        pv: getRandomNumber(10000),
        amt: getRandomNumber(2500),
    },
];

const AreaVChart = (props) => {
    return (
        <div className={chartStyle.chartWrapper}>
        {props.title && (<h3 className='mt-3'>{props.title}</h3>)}
        <ResponsiveContainer className={chartStyle.areaGraph} width="100%" height="100%" aspect={props.aspect}>
            <AreaChart
                
                data={props.data ? props.data : datag}
                margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    tick={{ fill: 'white' }}
                    tickMargin={20}
                />
                <YAxis
                    tick={{ fill: 'white' }}
                    tickMargin={20}
                />
                <Tooltip content={props.customTooltip ? props.customTooltip : null} cursor={{ stroke: 'grey', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="uv" stroke="#000" fill="#0d6efd" />
            </AreaChart>
        </ResponsiveContainer>
        </div>
    )
}

export default AreaVChart