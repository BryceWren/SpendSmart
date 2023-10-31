import React, { useState, useEffect, useRef } from "react"
import Chart from 'chart.js/auto'
import Axios from 'axios'
import { useCookies } from 'react-cookie'

const PieChartTransactions = () => {
  const [cookies] = useCookies(['userID'])
  const userID = cookies.userID

  const [data, setData] = useState([])
  const chartRef = useRef(null)
  const chartInst = useRef(null)

  const handleResize = (chart) => { chart.resize() }

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d')

    // get data and update if values change
    Axios.get("http://localhost:3001/loadChart/" + userID)
      .then(json => { if (JSON.stringify(json.data) !== JSON.stringify(data)) { setData(json.data) } })
      .catch((error) => { console.error("Error loading data:", error) })

    // remove previous instance of chart
    if (chartInst.current) {
      chartInst.current.destroy()
    }

    // create a new chart
    const newChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(item => item.label),
        datasets: [{
          data: data.map(item => item.value),
        }]
      },
      options: {
        responsive: true,
        onResize: handleResize,
        maintainAspectRatio: false
      }
    })
    console.log(newChart)

    // set new chart
    chartInst.current = newChart
  }, [chartInst, data, userID])


  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  )
}

export default PieChartTransactions
