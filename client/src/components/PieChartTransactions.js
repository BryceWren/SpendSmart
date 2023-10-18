import React, { useEffect, useRef }from 'react'
import Chart from 'chart.js/auto';

const PieChartTransactions = () => {
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
              labels: ["Groceries", "Shopping"],
              datasets: [
                  {
                      data: [80, 100],
                      backgroundColor: [
                          'rgb(16, 227, 125)',
                          'rgb(143, 16, 227)'
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

export default PieChartTransactions
