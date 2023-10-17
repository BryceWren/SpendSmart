import React, { useEffect, useRef }from 'react'
import Chart from 'chart.js/auto';

const PieChartBudgetTab = () => {
  const chartRef = useRef(null);
  const chartInst = useRef(null);

  const handleResize = (chart) => {
    chart.resize();
  }

    useEffect(() => {
      if (chartInst.current) {
          chartInst.current.destroy()
      }
      const theChartRef = chartRef.current.getContext('2d');
      
      chartInst.current = new Chart(theChartRef, {
          type:"pie",
          data: {
              labels: ["Income", "Expenses", "Remaining"],
              datasets: [
                  {
                      data: [3000, 1000, 1000],
                      backgroundColor: [
                          'rgb(35, 110, 16)',
                          'rgb(90, 92, 90)',
                          'rgb(8, 81, 191)'
                      ],
                  }
              ]
          },
          options: {
            responsive: true,
            onResize: handleResize,
            maintainAspectRatio: false
          }
      })
      return () => {
          if(chartInst.current){
              chartInst.current.destroy()
          }
      }
  }, []);


  return (
    <div>
            <canvas ref={chartRef}/>
    </div>
  )
}

export default PieChartBudgetTab
