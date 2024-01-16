import { ChartOptions } from 'chart.js'

export const LineChartOptions = (
  goal: number,
  max: number,
  onInit: (_x: number, _y: number) => void,
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
      max: Math.max(goal, max) + 25,
      ticks: {
        count: 4,
        color: '#727E94',
        font: {
          size: 14,
          family: 'EloquiaDisplay Medium',
        },
        callback: (scale: any) => {
          return Math.round(scale)
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
    annotation: {
      annotations: {
        target: {
          display: !!goal,
          type: 'line',
          drawTime: 'afterDatasetsDraw',
          borderDash: [3],
          borderWidth: 1,
          borderColor: '#787CDD',
          yMin: goal,
          yMax: goal,
          init: ({ properties }: any) => {
            if (properties) {
              onInit(properties.x, properties.y)
            }
          },
        },
      },
    },
  },
})
