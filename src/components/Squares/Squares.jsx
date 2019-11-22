import React from 'react';
import PropTypes from 'prop-types';


const Squares = (props) => {
  const { table, cellSize, updateCurrentPosition, hideRemoveBtns } = props;

  return (
    <div className='div-table' 
      onMouseOut={() => { hideRemoveBtns(true) }} 
      onMouseOver={() => { hideRemoveBtns(false) }}>
        {table.map((row, index) =>
          <div 
            className="row" 
            key={index + 1} 
            onMouseOver={() => { updateCurrentPosition({ type: 'currentRow', currentRow: index + 1 }) }}>
              {table[0].map((cell, index) => 
                <div 
                  className="cell" 
                  style={{ width: `${cellSize}px`, height: `${cellSize}px` }} 
                  key={cell + 1} 
                  onMouseOver={() => { updateCurrentPosition({ type: 'currentColumn', currentColumn: index + 1 }) }}>
            </div>)}
          </div>)}
    </div>
  );
}

Squares.propTypes = {
  table: PropTypes.array.isRequired,
  initialHeight: PropTypes.number,
  initialWidth: PropTypes.number,
  updateCurrentPosition: PropTypes.func,
  hideRemoveBtns: PropTypes.func,
  cellSize: PropTypes.number
}

Squares.defaultProps = {
  initialHeight: 4,
  initialWidth: 4
}

export default Squares;