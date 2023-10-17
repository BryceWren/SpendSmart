import Navbar from "../components/Navbar"
import CalendarComp from "../components/CalendarComp"

export const CalendarPage = () => {
    return (
      <div>
        <Navbar />
        
        <div className='container'>

          <h1 className='mt-3'>Welcome back!</h1>

          <p> Create your own reminders through a monthly view! </p>
          
          <CalendarComp/>

        </div>
      </div>
    )
}