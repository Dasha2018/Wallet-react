import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import ChartDataLabels from 'chartjs-plugin-datalabels'
Chart.register(ChartDataLabels)
import { useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ChartContainer = styled.div`
    width: 100%;
    height: calc(100% - 20px);
    flex-grow: 1;
    padding: 40px 20px 20px 20px;
    margin-bottom: 0;
    border-radius: 12px;
    box-sizing: border-box;
    min-height: 400px;
`

const ChartComponent = ({ expenses }) => {
    const chartRef = useRef(null)

    console.log('Expenses in ChartComponent:', expenses)

    const categoryTotals = useMemo(() => {
        const totals = {
            Еда: 0,
            Транспорт: 0,
            Жильё: 0,
            Развлечения: 0,
            Образование: 0,
            Другое: 0,
        }
        expenses.forEach((expense) => {
            const amount = parseFloat(
                expense.amount.replace(' ₽', '').replace(' ', '')
            )
            totals[expense.category] = (totals[expense.category] || 0) + amount
        })
        return totals
    }, [expenses])

    const maxValue = Math.max(...Object.values(categoryTotals))
    const yAxisMax = maxValue * 1.2

    const barChartData = useMemo(() => {
        return {
            labels: [
                'Еда',
                'Транспорт',
                'Жильё',
                'Развлечения',
                'Образование',
                'Другое',
            ],
            datasets: [
                {
                    data: [
                        categoryTotals['Еда'],
                        categoryTotals['Транспорт'],
                        categoryTotals['Жильё'],
                        categoryTotals['Развлечения'],
                        categoryTotals['Образование'],
                        categoryTotals['Другое'],
                    ],
                    label: 'Расходы',
                    backgroundColor: [
                        '#D9B6FF',
                        '#FFB53D',
                        '#6EE4FE',
                        '#B0AEFF',
                        '#BCEC30',
                        '#FFB9B8',
                    ],
                    borderWidth: 0,
                    borderRadius: 12,
                    borderSkipped: false,
                },
            ],
        }
    }, [categoryTotals])

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = chartRef.current.chartInstance
            if (chartInstance) {
                chartInstance.destroy()
            }
        }
    }, [barChartData])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false },
            datalabels: {
                display: true,
                color: 'black',
                font: { weight: 600, size: 16, family: 'Montserrat' },
                formatter: (value) => (value > 0 ? value + ' ₽' : ''),
                anchor: 'end',
                align: 'top',
                offset: 10,
                clamp: true,
            },
        },
        scales: {
            x: {
                type: 'category',
                grid: { drawBorder: false, display: false },
                ticks: { font: { size: 12 } },
            },
            y: {
                type: 'linear',
                display: false,
                max: yAxisMax,
                padding: { top: 40 },
            },
        },
    }

    return (
        <ChartContainer>
            <Bar data={barChartData} options={options} ref={chartRef} />
        </ChartContainer>
    )
}

ChartComponent.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            amount: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default ChartComponent
