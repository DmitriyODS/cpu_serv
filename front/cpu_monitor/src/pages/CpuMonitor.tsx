import React from 'react';
import styles from './CpuMonitor.module.css';
import { Button } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { GetCpuInfoLine, GetCpuInfoMiddle } from '../api/cpuMonitor';

type TState = {
  lineData: { val: Number }[],
  calcData: { val: Number }[]
}

class CpuMonitor extends React.Component<any, TState> {
  constructor(props: any) {
    super(props);

    this.state = {
      lineData: [],
      calcData: [],
    };
  }

  onUpdateLineData = () => {
    const result = GetCpuInfoLine();
    result.then(
      (data) => {
        this.setState((prev) => ({
          ...prev,
          lineData: data.map((it) => ({ val: it })),
        }));
      },
      (error: string) => {
        alert(error);
      },
    );
  };

  onUpdateMiddleData = () => {
    const result = GetCpuInfoMiddle();
    result.then(
      (data) => {
        this.setState((prev) => ({
          ...prev,
          calcData: data.map((it) => ({ val: it })),
        }));
      },
      (error: string) => {
        alert(error);
      },
    );
  };

  onUpdateData = () => {
    this.onUpdateLineData();
    this.onUpdateMiddleData();
  };

  componentDidMount() {
    this.onUpdateData();
  }

  render() {
    return (
      <div className={styles.root}>
        <h1 className={styles.title}>Загрузка процессора за последний час</h1>
        <div className={styles.content}>
          <h2 className={styles.subtitle}>Мониторинг реальной загрузки процессора</h2>
          <LineChart
            width={1200}
            height={300}
            data={this.state.lineData}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <Line type='basis' dataKey='val' stroke='#d77146' dot={false} />
            <CartesianGrid stroke='#ccc' strokeOpacity={0} />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <div className={styles.content}>
          <h2 className={styles.subtitle}>Мониторинг средней загрузки процессора</h2>
          <LineChart
            width={1200}
            height={300}
            data={this.state.calcData}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <Line type='monotone' dataKey='val' stroke='#d77146' dot={false} />
            <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
            <XAxis />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <div className={styles.toobar}>
          <Button variant={'contained'} color={'primary'} onClick={this.onUpdateData}>
            Обновить
          </Button>
        </div>
      </div>
    );
  }
}

export default CpuMonitor;
