import { ChartOptions } from 'chart.js'
import { TFunc } from '@/types'

export const LineChartOptions = (
  max: number,
  onLoad: TFunc,
): ChartOptions<'line'> => ({
  responsive: true,
  layout: {
    padding: {
      top: 8,
      right: 0,
      left: 0,
      bottom: 0,
    },
  },
  scales: {
    y: {
      min: 0,
      max: max + 25,
      ticks: {
        count: 6,
        color: '#727E94',
        stepSize: 50,
        padding: 10,
        font: {
          size: 14,
          family: 'EloquiaDisplay Medium',
        },
        callback: (scale: any) => {
          return 50 * Math.ceil(scale / 50)
        },
      },
      border: {
        color: '#ECF0F3',
      },
      grid: {
        display: true,
        color: '#ECF0F3',
        lineWidth: 0.5,
        drawTicks: false,
      },
    },
    x: {
      ticks: {
        color: '#727E94',
        font: {
          size: 14,
          family: 'EloquiaDisplay Medium',
        },
      },
      border: {
        color: '#ECF0F3',
      },
      grid: {
        display: true,
        color: '#ECF0F3',
        lineWidth: 0.5,
        drawTicks: false,
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: false,
      titleFont: {
        size: 14,
        family: 'EloquiaDisplay Medium',
      },
      bodyFont: {
        size: 14,
        family: 'EloquiaDisplay Medium',
      },
      displayColors: false,
    },
    legend: {
      display: false,
    },
  },
  animation: {
    onComplete: onLoad,
  },
})
