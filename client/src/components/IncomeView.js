import React from 'react'

const IncomeView = (props) => {
  return (
    <div>
      <span>Income: ${props.income}</span>
      <button type='button' className='btn btn-primary' onClick={props.handleEditClick}>
        Edit
      </button>
    </div>
  )
}

export default IncomeView
