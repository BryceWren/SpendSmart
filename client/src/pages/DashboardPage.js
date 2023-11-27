import CalendarComp from "../components/CalendarComp/CalendarComp"
import Navbar from "../components/Navbar"
import PieChartTransactions from "../components/PieChartTransactions"
import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Budget from "../components/Budget";

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const DashboardPage = () => {

  const [cookies] = useCookies(['userID', 'firstName']);
  const userID = cookies.userID;
  const name = cookies.firstName;

  const [categories, setCategories] = useState([])

  useEffect(() => {
    // Axios.get(API + "/transactions/" + userID).then(json => setData(json.data))
    Axios.get(API + "/categories/" + userID).then(json => setCategories(json.data))
}, [userID])

  return (
    <div>
      <Navbar />

      <div className='container'>

        <h1 className='mt-3'>Welcome back, {name}!</h1>

        <p> This is your dashboard. Here is a quick overview of some important things. </p>

        <h4>Your Planned Budget</h4>
        <Budget categories={categories} />

        <div style={{ display: 'flex' }}>
          <div style={{ flex: 2 }}>
            <h4>Transactions by Category</h4>
            <PieChartTransactions />
          </div>
          <div style={{ flex: 1 }}>
            <CalendarComp />
          </div>
        </div>

      </div>
    </div>
  )
}