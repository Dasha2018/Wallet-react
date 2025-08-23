import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


Chart.register(...registerables, ChartDataLabels)

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


const categoryMap = {
    food: 'Еда',
    transport: 'Транспорт',
    housing: 'Жильё',
    joy: 'Развлечения',
    education: 'Образование',
    others: 'Прочее',
}

const ChartComponent = ({ expenses }) => {
    if (expenses.length === 0) {
        console.log('No expenses data provided to ChartComponent.')
    }

    const categoryTotals = useMemo(() => {
        const totals = {
            Еда: 0,
            Транспорт: 0,
            Жильё: 0,
            Развлечения: 0,
            Образование: 0,
            Прочее: 0,
        }

        expenses.forEach((expense) => {
            const amount = parseFloat(
                expense.amount.replace(' ₽', '').replace(',', '.').replace(/\s/g, '')
            )

            const readableCategory = categoryMap[expense.category]

            if (readableCategory) {
                totals[readableCategory] += amount
            } else {
                console.warn(`Unknown category found: ${expense.category}`)
            }
        })

        return totals
    }, [expenses])

    const dataValues = Object.values(categoryTotals)
    const maxValue = dataValues.length > 0 ? Math.max(...dataValues) : 0
    const yAxisMax = maxValue * 1.2

    const barChartData = useMemo(() => {
        return {
            labels: [
                'Еда',
                'Транспорт',
                'Жильё',
                'Развлечения',
                'Образование',
                'Прочее',
            ],
            datasets: [
                {
                    data: [
                        categoryTotals['Еда'],
                        categoryTotals['Транспорт'],
                        categoryTotals['Жильё'],
                        categoryTotals['Развлечения'],
                        categoryTotals['Образование'],
                        categoryTotals['Прочее'],
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
                formatter: (value) => (value > 0 ? value.toFixed(0) + ' ₽' : ''),
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
            <Bar data={barChartData} options={options} />
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
