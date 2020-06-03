import React from 'react';
export default (props) => {

  const handleClick = (play) => {
    props.handleClick(props.id);
  }





  return (
    <div id={props.id} className="square" onClick={handleClick}>{props.choice[props.id]}</div>
  );
}
