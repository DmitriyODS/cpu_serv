import React from 'react';
import styles from './CpuMonitor.module.css';
import { Button } from '@mui/material';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

type TState = {
  lineData: { val: number }[],
  calcData: { val: number }[]
}

class CpuMonitor extends React.Component<any, TState> {
  constructor(props: any) {
    super(props);

    this.state = {
      lineData: [
        { val: 100 },
        { val: 90 },
        { val: 80 },
        { val: 75 },
        { val: 17 },
        { val: 24 },
        { val: 80 },
        { val: 73 },
        { val: 73 },
        { val: 73 },
        { val: 73 },
        { val: 73 },
        { val: 73 },
        { val: 73 },
        { val: 73 },
        { val: 73 },
      ],
      calcData: [
        { val: 17 },
        { val: 84 },
        { val: 32 },
        { val: 17 },
        { val: 8 },
        { val: 0 },
        { val: 5 },
        { val: 45 },
        { val: 12 },
        { val: 32 },
        { val: 17 },
        { val: 17 },
        { val: 4 },
        { val: 2 },
        { val: 8 },
        { val: 2 },
      ],
    };
  }

  onUpdateData = () => {

  }

  render() {
    return (
      <div className={styles.root}>
        <h1 className={styles.title}>Загрузка процессора за последний час</h1>
        <div>
          <h2 className={styles.subtitle}>Мониторинг реальной загрузки процессора</h2>
          <LineChart
            width={800}
            height={300}
            data={this.state.lineData}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <Line type='monotone' dataKey='val' stroke='#d77146' />
            <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
            <XAxis />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <div>
          <h2 className={styles.subtitle}>Мониторинг средней загрузки процессора</h2>
          <LineChart
            width={800}
            height={300}
            data={this.state.calcData}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <Line type='monotone' dataKey='val' stroke='#d77146' />
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
