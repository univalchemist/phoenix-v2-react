import React, { useMemo, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import gradient from 'chartjs-plugin-gradient'
import moment from 'moment'

import { IVectorStat } from '@/types'
import { LineChartOptions } from './constants'
import './survey-chart.scss'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  annotationPlugin,
  gradient,
)

interface Props {
  statsData: IVectorStat | undefined
}

const SurveyChart: React.FC<Props> = ({ statsData }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ChartJS<'line'>>()

  const [data, max]: [ChartData<'line', number[], React.ReactNode>, number] =
    useMemo(() => {
      const _labels: string[] = []
      const _data: number[] = []

      const start = moment().subtract(1, 'week')
      while (!start.isAfter(moment())) {
        start.add(1, 'days')
        const label = start.format('YYYY-MM-DD')
        _labels.push(start.format('ddd'))
        _data.push(statsData?.[label] ? +statsData[label] : 0)
      }

      _labels[0] = ''
      const res: ChartData<'line', number[], React.ReactNode> = {
        labels: _labels,
        datasets: [
          {
            tension: 0.5,
            pointBorderWidth: 0,
            pointBorderColor: 'transparent',
            pointRadius: 0,
            pointHoverRadius: 0,
            data: _data,
            gradient: {
              borderColor: {
                axis: 'x',
                colors: {
                  0: '#00A57815',
                  100: '#00A578',
                },
              },
            },
          },
        ],
      }

      return [res, Math.max(..._data)]
    }, [statsData])

  const chart = useMemo(
    () => (
      <Line
        ref={chartRef}
        data={data}
        options={LineChartOptions(max, () => null)}
      />
    ),
    [data, max],
  )

  return (
    <div className="survey-chart-wrapper admin" ref={containerRef}>
      {chart}
    </div>
  )
}

export default SurveyChart
