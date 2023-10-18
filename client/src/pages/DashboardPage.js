import CalendarComp from "../components/CalendarComp"
import Navbar from "../components/Navbar"
import PieChartTransactions from "../components/PieChartTransactions"

export const DashboardPage = () => {
    return (
      <div>
        <Navbar />
        
          <div className='container'>

            <h1 className='mt-3'>Welcome back!</h1>

            <p> This is your dashboard. Here is a quick overview of some important things. </p>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{flex: 1}}>
              <PieChartTransactions/>
            </div>
          <div style={{flex: 1}}>
            <CalendarComp/>
          </div>
        </div>
      </div>
    )
}