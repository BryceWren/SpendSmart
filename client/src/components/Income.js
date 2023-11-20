import React, { useState } from 'react';

function Income() {
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
        <div>
          <input
            required='required'
            type='number'
            className='form-control mr-3'
            id='name'
            value={income}
            onChange={(event) => setIncome(event.target.value)} />
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => handleSaveClick(income)}
          >
            Save
          </button>
        </div>
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
        </div>
      )}
    </div>
  );
}

export default Income;

