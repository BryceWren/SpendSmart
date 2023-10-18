import CalendarComp from "../components/CalendarComp"
import Navbar from "../components/Navbar"
import PieChartTransactions from "../components/PieChartTransactions"
import { useCookies } from 'react-cookie';

export const DashboardPage = () => {

  const [cookies, setCookie] = useCookies(['firstName']);
  const name = cookies.firstName;

    return (
      <div>
        <Navbar />
        
          <div className='container'>

            <h1 className='mt-3'>Welcome back, {name}!</h1>

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