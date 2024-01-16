import React, { useMemo, useState, useRef, useCallback } from 'react'
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

import { t } from '@/i18n'
import { useVectorZoom } from '@/hooks'
import { Text } from '@/components'
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

const SurveyChart: React.FC = () => {
  const chartRef = useRef<ChartJS<'line'>>()

  const { surveyStats, colorMap, chartActiveDot, currentVector } =
    useVectorZoom()

  const [labelPosition, setLabelPosition] = useState<
    { top: number; left: number } | undefined
  >()

  const [data, max]: [ChartData<'line', number[], React.ReactNode>, number] =
    useMemo(() => {
      const _labels: string[] = []
      let _colors: string[] = []
      const _data: number[] = []

      const firstMonth = Object.keys(surveyStats || {}).sort((a, b) =>
        moment(a).isBefore(b) ? -1 : 1,
      )[0]

      const start = moment(firstMonth)
      while (!start.isAfter(moment())) {
        const label = start.format('YYYY-MM')
        _labels.push(start.format('MMM'))
        _colors.push(colorMap[label])
        _data.push(surveyStats?.[label] ? +surveyStats[label] : 0)
        start.add(1, 'month')
      }

      _colors =
        chartActiveDot > -1
          ? _colors.map((c, idx) => {
              if (idx === chartActiveDot) {
                return c
              }
              return 'transparent'
            })
          : _colors

      const res: ChartData<'line', number[], React.ReactNode> = {
        labels: _labels,
        datasets: [
          {
            tension: 0.5,
            pointBorderWidth: 0,
            pointBorderColor: 'transparent',
            pointRadius: 6,
            pointHoverRadius: 7,
            data: _data,
            pointBackgroundColor: _colors,
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
    }, [chartActiveDot, colorMap, surveyStats])

  const onInit = useCallback((x: number, y: number) => {
    setLabelPosition({ top: y, left: x })
  }, [])

  const chart = useMemo(
    () => (
      <Line
        ref={chartRef}
        data={data}
        options={LineChartOptions(
          currentVector?.goal?.target || 0,
          max,
          onInit,
        )}
      />
    ),
    [currentVector?.goal?.target, data, max, onInit],
  )

  return (
    <div className="survey-chart-wrapper customer">
      {labelPosition && (
        <div
          className="goal-label"
          style={{
            top: labelPosition.top,
            left: labelPosition.left,
          }}
        >
          <Text
            font="medium"
            fontWeight={500}
            lineHeight={16}
            size={10}
            color="white"
          >
            {t('vectorZoomPage.goal')}
          </Text>
        </div>
      )}
      {chart}
    </div>
  )
}

export default SurveyChart
