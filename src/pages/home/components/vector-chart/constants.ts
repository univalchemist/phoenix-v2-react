import { ChartOptions } from 'chart.js'

import { TFunc } from '@/types'

export const RadarChartOptions = (onLoad: TFunc): ChartOptions<'radar'> => ({
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  scales: {
    r: {
      min: 0,
      max: 100,
      ticks: {
        count: 6,
        display: true,
        color: '#000000',
        font: {
          size: 12,
          family: 'EloquiaDisplay Medium',
        },
      },
      pointLabels: {
        display: true,
        color: 'transparent',
        font: {
          size: 0,
          family: 'EloquiaDisplay Medium',
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        title: () => '',
      },
    },
  },
  elements: {
    point: {
      radius: 5,
      hoverRadius: 6,
    },
  },
  animation: {
    onComplete: onLoad,
  },
})
