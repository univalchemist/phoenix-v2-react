import React, { useCallback, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  Plugin,
} from 'chart.js'

import { useProject, useResizeObserver } from '@/hooks'
import VectorChartLabel from './vector-chart-label'
import { RadarChartOptions } from './constants'
import { IVectorChartPosition } from './types'
import './vector-chart.scss'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

const padding = 50

const VectorChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ChartJS<'radar'>>()

  const { surveyStats, currentProject, hiddenSurveyKeys } = useProject()
  const [labelPositions, setLabelPositions] = useState<IVectorChartPosition[]>(
    [],
  )
  const [loaded, setLoaded] = useState<boolean>(false)

  const onSetChartSize = useCallback(() => {
    const containerWidth = containerRef.current?.scrollWidth
    const containerHeight = containerRef.current?.scrollHeight
    const labels = document.querySelectorAll('.chart-label-wrapper')
    let maxLabelWidth = 0
    let maxLabelHeight = 0
    labels.forEach(l => {
      if (l.clientWidth > maxLabelWidth) {
        maxLabelWidth = l.clientWidth
      }
      if (l.clientHeight > maxLabelHeight) {
        maxLabelHeight = l.clientHeight
      }
    })

    if (containerWidth && containerHeight && maxLabelWidth && maxLabelHeight) {
      const availableWidth = containerWidth - 2 * padding - 2 * maxLabelWidth
      const availableHeight = containerHeight - 2 * padding - 2 * maxLabelHeight
      const value = Math.min(availableHeight, availableWidth)
      chartRef.current?.resize(value, value)
      setLoaded(true)
    }
  }, [])

  useResizeObserver(undefined, onSetChartSize)

  const data: ChartData<'radar', number[], React.ReactNode> = useMemo(() => {
    const datasets: any[] = []
    Object.entries(surveyStats || {}).forEach(([surveyKey, vectorStats]) => {
      const _data: number[] = []
      const isHidden = hiddenSurveyKeys.includes(surveyKey)
      Object.keys(vectorStats).forEach(v => {
        if (v !== 'color') {
          _data.push(+vectorStats[v])
        }
      })
      datasets.push({
        label: surveyKey,
        data: _data,
        backgroundColor: isHidden ? 'transparent' : `${vectorStats.color}50`,
        borderColor: isHidden ? 'transparent' : vectorStats.color,
        borderWidth: hiddenSurveyKeys.includes(surveyKey) ? 0 : 2,
        pointBorderColor: isHidden ? 'transparent' : vectorStats.color,
        pointBackgroundColor: isHidden ? 'transparent' : `${vectorStats.color}`,
        pointBorderWidth: 0.5,
        pointRadius: 5,
      })
    })
    return {
      labels: currentProject?.vectors.map(({ name }) => name),
      datasets,
    }
  }, [currentProject?.vectors, hiddenSurveyKeys, surveyStats])

  const spintrPlugin: Plugin<'radar'> = useMemo(
    () => ({
      id: 'spintrPlugin',
      afterUpdate: (chart: ChartJS<'radar'>) => {
        const labels: string[] = chart.scales.r.getLabels()
        const _positions: IVectorChartPosition[] = labels.map((label, idx) => ({
          text: label,
          index: idx,
          total: labels.length,
          vectorId: currentProject?.vectors?.find(
            vector => vector.name === label,
          )?.id,
          // @ts-ignore
          ...chart.scales.r.getPointLabelPosition(idx),
        }))

        setLabelPositions(_positions)
      },
    }),
    [currentProject?.vectors],
  )

  const chart = useMemo(
    () => (
      <Radar
        ref={chartRef}
        plugins={[spintrPlugin]}
        data={data}
        options={RadarChartOptions(onSetChartSize)}
      />
    ),
    [data, onSetChartSize, spintrPlugin],
  )

  if (!currentProject) return null

  return (
    <div className="vectors-chart-container flex-1" ref={containerRef}>
      <div className={classNames('vector-chart-wrapper', { loaded })}>
        {chart}
        {labelPositions.map((p, idx) => (
          <VectorChartLabel key={idx} position={p} />
        ))}
      </div>
    </div>
  )
}

export default VectorChart
