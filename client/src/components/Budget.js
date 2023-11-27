import React, { useEffect, useReducer } from 'react'

// Reducer function to handle state updates based on actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TOTALS':
      const result = action.categories.reduce((totals, c) => {
        if (c.type === 1) {
          totals.income += c.amount
        } else if (c.type === 2) {
          totals.needs += c.amount
        } else if (c.type === 3) {
          totals.wants += c.amount
        } else if (c.type === 4) {
          totals.debts += c.amount
        } else if (c.type === 5) {
          totals.savings += c.amount
        }
        return totals
      }, { income: 0, needs: 0, wants: 0, debts: 0, savings: 0 })

      return {
        ...state,
        totalIncome: result.income,
        totalNeeds: result.needs,
        totalWants: result.wants,
        totalDebts: result.debts,
        totalSavings: result.savings,
        totalRemaining: result.income - (result.needs + result.wants + result.debts + result.savings),
      }

    default:
      return state
  }
}

const Budget = ({ categories }) => {
  // Initial state
  const initialState = {
    totalIncome: 0,
    totalNeeds: 0,
    totalWants: 0,
    totalDebts: 0,
    totalSavings: 0,
    totalRemaining: 0,
  }

  // State and dispatch from useReducer
  const [state, dispatch] = useReducer(reducer, initialState)

  // Effect to update totals when categories change
  useEffect(() => {
    dispatch({ type: 'UPDATE_TOTALS', categories })
  }, [categories])

  // Access state variables
  const { totalIncome, totalNeeds, totalWants, totalDebts, totalSavings, totalRemaining } = state


  return (
                <div>
                    <h4>Income</h4>
                    <div className='alert alert-success'>
                        <div>
                            <span>Income: ${totalIncome}</span>
                        </div>
                    </div>

                    <h4>Expenses</h4>
                    <div className="row mt-4">
                        <div className="col">
                            <div className='alert alert-info'>
                                <div>
                                   <span>Needs: ${totalNeeds}</span>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className='alert alert-warning'>
                                <div>
                                    <span>Wants: ${totalWants}</span>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className='alert alert-danger'>
                                <div>
                                    <span>Debts: ${totalDebts}</span>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className='alert alert-primary'>
                                <div>
                                    <span>Savings: ${totalSavings}</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <h4>Remaining</h4>
                    <div className='alert alert-dark'>
                        <div>
                            <span>Remaining: ${totalRemaining}</span>
                        </div>
                    </div>
                </div>
  )
}

export default Budget
