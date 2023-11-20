import React, { useState } from 'react';
import IncomeEdit from './IncomeEdit';
import Expenses from './Expenses';
import Remaining from './Remaining';

const Income = () => {
  const [editing, setEditing] = useState(false);
  const [income, setIncome] = useState(0);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = (newIncome) => {
    // TODO: Add logic to send the updated income to the server
    setIncome(newIncome);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  return (
    <div className='alert alert-success'>
      {editing ? (
        <IncomeEdit income={income} handleSaveClick={handleSaveClick} handleCancelClick={handleCancelClick} />
      ) : (
        <div>
          <span>Income: ${income}</span>
          <button
            type="button"
            className="btn btn-primary position-absolute top-50 end-0 translate-middle-y"
            onClick={handleEditClick}
          >
            Edit Your Income
          </button>
          <Expenses income={income} />
          <Remaining income={income} />
        </div>
      )}
    </div>
  );
};

export default Income;
