import Navbar from "../components/Navbar"

export const DashboardPage = () => {
    return (
      <div>
        <Navbar />
        
        <div className='container'>

          <h1 className='mt-3'>Welcome back!</h1>

          <p> This is your dashboard. Here you will find an overview of your spending habits this month. </p>
        </div>
      </div>
    )
}