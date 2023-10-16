import Settings from "../components/Settings";
import Navbar from "../components/Navbar";

export const SettingsPage = () => {
  return (
    <div className="nav-bar">
      <Navbar/>
      <div className="container">
        <h1 className="mt-3">Check out your account!</h1>
        <div className="col-sm">
          <Settings/>
      </div>
      </div>
    </div>
  )
}

export default SettingsPage
