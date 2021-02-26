import React from 'react';


const Rank = ({ name, entries }) => {
    return (
      <div>
        <div className='white f3'>
          {`Damn, ${name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {entries}
        </div>
        <div className='white f3'>
          {`Good job, K I N G !`}
        </div>
      </div>
    );
  }

export default Rank;