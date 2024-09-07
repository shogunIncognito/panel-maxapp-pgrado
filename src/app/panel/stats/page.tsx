'use client'

import Spinner from '@/components/Spinner'
import { getStats } from '@/services/api'
import { StatsDTO } from '@/types'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const optionsMonth = {
  responsive: true,
  mantainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: `Visitas mensuales a la web de MaxAutos en ${new Date().getFullYear()}`,
      font: {
        size: 20
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Meses',
        font: {
          size: 16
        }
      }
    },
    y: {
      title: {
        display: true,
        text: 'Visitas',
        font: {
          size: 16
        }
      }
    }
  }
}

const optionsDays = {
  responsive: true,
  mantainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Visitas diarias en el mes a la web de MaxAutos',
      font: {
        size: 20
      }
    }
  },

  scales: {
    x: {
      title: {
        display: true,
        text: 'Días',
        font: {
          size: 16
        }
      },
      min: 0
    },
    y: {
      beginAtZero: true,
      max: 50,
      title: {
        display: true,
        text: 'Visitas',
        font: {
          size: 16
        }
      }
    }
  },
  elements: {
    point: {
      radius: 6
    }
  }
}

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril',
  'Mayo', 'Junio', 'Julio', 'Agosto',
  'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export default function Stats(): JSX.Element {
  const [stats, setStats] = useState<StatsDTO | null>(null)
  const [error, setError] = useState(false)
  const { data, status } = useSession()

  useEffect(() => {
    getStats(data?.user.token)
      .then(res => setStats(res))
      .catch(() => setError(true))
  }, [])

  if (error) return <p>Ha ocurrido un error</p>
  if (status === 'loading' || (stats === null)) return <Spinner />

  const monthsStats = {
    labels: months,
    datasets: [
      {
        label: 'Visitas por mes',
        data: stats.viewsMonths,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  const daysStats = {
    datasets: [
      {
        label: 'Visitas por dia',
        data: stats.daysMonthViews,
        borderColor: 'rgb(255, 49, 72)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  return (
    <section className='p-3 relative overflow-auto'>
      <h2 className='sm:hidden text-sm opacity-70 text-center mb-5 dark:text-white text-black'>Para observar mejor las gráficas gira tu dispositivo horizontalmente</h2>
      <Bar options={optionsMonth} data={monthsStats} className='lg:mb-20 w-full' />
      <hr />
      <Line options={optionsDays} data={daysStats} className='lg:mt-20 w-full' />
    </section>
  )
}
