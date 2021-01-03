import React from 'react';

const Error = (props) => {
  console.log('hello')
  return (
    <div style={{textAlign: "center"}}>
      <button
        onClick={() => props.history.push('/')}
      >
        GO TO MAIN PAGE
      </button>
      <h1 style={{color: "red"}}>Error</h1>
    </div>
  );
};

export default Error;
