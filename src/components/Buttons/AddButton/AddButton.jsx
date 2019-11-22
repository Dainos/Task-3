import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.css';



const AddButton = (props) => {
  const { addRow, addColumn, cellSize, type } = props;

  let onMouseDown;
  let btnClass;
  if (type === 'add-row') {
    btnClass = 'add-row-btn';
    onMouseDown = addRow;
  } else {
    btnClass = 'add-column-btn';
    onMouseDown = addColumn;
  }

    return (
        <button 
            className={cn('btn', 'add-btn', btnClass)}
            onMouseDown = {onMouseDown} 
            style = {{width: `${cellSize}px`,
            height: `${cellSize}px`}}>+
        </button>
    )
};

AddButton.propTypes = {
  type: PropTypes.string.isRequired,
  addRow: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired,
  cellSize: PropTypes.number
}

export default AddButton;
