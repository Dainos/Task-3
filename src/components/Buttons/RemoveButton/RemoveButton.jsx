import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.css';



const RemoveButton = (props) => {
    const { type, currentRow, currentColumn, cellSize, removeRow, removeColumn, hideRemoveBtns, isHiddenColumnBtn, isHiddenRowBtn } = props


    let onMouseDown;
    let btnClass;
    let hide;
    let style;
    if (type === 'remove-row') {
        btnClass = 'remove-row-btn';
        onMouseDown = removeRow;
        style = {
            top: `${2 + (currentRow - 1) * (cellSize + 2)}px`,
            width: `${cellSize}px`,
            height: `${cellSize}px`
        }
    } else {
        btnClass = 'remove-column-btn';
        onMouseDown = removeColumn;
        style = {
            left: `${2 + (currentColumn - 1) * (cellSize + 2)}px`,
            width: `${cellSize}px`,
            height: `${cellSize}px`
        }
    }
    if (isHiddenColumnBtn || isHiddenRowBtn) hide = 'hide';
    else hide = '';

    return (
        <button
            className={cn('btn', 'remove-btn', btnClass, hide)}
            style={style}
            onMouseDown={onMouseDown}
            onMouseOut={() => { hideRemoveBtns(true) }}
            onMouseOver={() => { hideRemoveBtns(false) }}>–
                </button>

    )
}



RemoveButton.propTypes = {
    type: PropTypes.string.isRequired,
    currentRow: PropTypes.number.isRequired,
    currentColumn: PropTypes.number.isRequired,
    removeRow: PropTypes.func,
    removeColumn: PropTypes.func,
    hideRemoveBtns: PropTypes.func,
    cellSize: PropTypes.number
}

export default RemoveButton;
