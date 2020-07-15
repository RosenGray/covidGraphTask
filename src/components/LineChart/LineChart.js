import React, { PureComponent } from 'react';
import classes from './LineChart.module.scss';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export default class Chart extends PureComponent {


  constructor(props){
      super();
  }
  render() {
    console.log(this.props)
    return (
        <div className={classes.LineChart}>
    <LineChart
        width={600}
        height={300}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="parsedDate" />
        <YAxis dataKey="Cases"/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Cases" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="parsedDate" stroke="#82ca9d" />
      </LineChart>
        </div>
    );
  }
}
