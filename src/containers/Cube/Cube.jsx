import React, { Component } from 'react';
import Squares from '../../components/Squares/Squares';
import PropTypes from 'prop-types';
import RemoveButton from '../../components/Buttons/RemoveButton/RemoveButton';
import AddButton from '../../components/Buttons/AddButton/AddButton';
import './style.css';


class Cube extends Component {
  constructor(props) {
    super(props);
    const { initialHeight, initialWidth, cellSize } = this.props;

    const table = [];

    for (let i = 0; i < initialHeight; i++) {
      const row = [];
      for (let j = 0; j < initialWidth; j++) {
        row.push(j + 1);
      }
      table.push(row);
    }

    this.state = {
      rowsAmount: initialHeight,
      columnsAmount: initialWidth,
      cellSize,
      table,
      currentRow: 0,
      currentColumn: 0,
      timerId: null,
      isHiddenBtns: true,
      isHiddenRowBtn: true,
      isHiddenColumnBtn: true,

      stylesRemoveRow: ['btn', 'remove-btn', 'remove-row-btn hide'],
      stylesRemoveColumn: ['btn', 'remove-btn', 'remove-column-btn hide']

    }

  }


  addRow = () => {
    const { table, columnsAmount, rowsAmount } = this.state;
    const row = [];
    for (let i = 0; i < columnsAmount; i++) row.push(i+1);
    table.push(row);
    this.setState({
      rowsAmount: rowsAmount + 1,
      table,
    })
  }

  removeRow = () => {
    const { table, rowsAmount, currentRow } = this.state;
    if (rowsAmount === 1) return;
    table.splice(currentRow - 1, 1);
    if (rowsAmount === currentRow) this.setState({currentRow: currentRow - 1})
    this.setState({
      rowsAmount: rowsAmount - 1,
      table
    })
    this.hideRemoveBtns("fast remove")
  }

  addColumn = () => {
    const { table, columnsAmount } = this.state;
    
    table.forEach((row, index) => {
      row.push(row.length+1);
    });
    
    this.setState({
      columnsAmount: columnsAmount + 1,
      table
    })

  }

  removeColumn = (number = 0) => {
    const { table, columnsAmount, currentColumn } = this.state;
    if (columnsAmount === 1) return;
    table.forEach((row) => {
      row.splice(currentColumn - 1, 1);
    });
    if (columnsAmount === currentColumn) this.setState ({currentColumn: currentColumn - 1})
    
    this.setState({
      columnsAmount: columnsAmount - 1,      
      table
    })
    this.hideRemoveBtns("fast remove")
  }

  updateCurrentPosition = (position) => {
      
    if (position.type === 'currentRow') {
      this.setState({
        currentRow: position.currentRow,        
      })
    }
    if (position.type === 'currentColumn') {
      this.setState({
        currentColumn: position.currentColumn,        
      })
    }
  }

  hideRemoveBtns = (status) => {
    const { columnsAmount, rowsAmount, timerId } = this.state;
    if (status === "fast remove") {
      this.setState({
        isHiddenRowBtn: true,
        isHiddenColumnBtn: true,
        stylesRemoveRow: ["btn", "remove-btn", "remove-row-btn hide"],
        stylesRemoveColumn: ["btn", "remove-btn", "remove-column-btn hide"]
      })
      return
    }
    if (status) {
      this.setState({
        timerId: setTimeout(() => {
          this.setState({
            isHiddenRowBtn: true,
            isHiddenColumnBtn: true,
            stylesRemoveRow: ["btn", "remove-btn", "remove-row-btn hide"],
            stylesRemoveColumn: ["btn", "remove-btn", "remove-column-btn hide"]
          })
        }, 200)
      })

    }
    else {
      this.setState({
        isHiddenRowBtn: false,
        isHiddenColumnBtn: false,  
        stylesRemoveRow: ["btn", "remove-btn", "remove-row-btn"],
        stylesRemoveColumn: ["btn", "remove-btn", "remove-column-btn"]
      })
      clearTimeout(timerId);
      if (columnsAmount === 1) this.setState({ isHiddenColumnBtn: true, stylesRemoveColumn: ["btn", "remove-btn", "remove-column-btn hide"] })
      if (rowsAmount === 1) this.setState({ isHiddenRowBtn: true, stylesRemoveRow: ["btn", "remove-btn", "remove-row-btn hide"] })

    }
  }
   

  render(){
    const { currentRow, currentColumn, cellSize, table, stylesRemoveRow, stylesRemoveColumn, isHiddenRowBtn, isHiddenColumnBtn} = this.state;
    return (
      <table>
        <tbody>
          <tr className="tablerow" style = {{height: `${cellSize+2}px`}}>
              <td></td>
              <td><RemoveButton 
                    type = "remove-column" 
                    isHiddenColumnBtn = {isHiddenColumnBtn}
                    currentRow = {currentRow} 
                    currentColumn = {currentColumn} 
                    removeColumn = {this.removeColumn} 
                    stylesRemoveColumn = {stylesRemoveColumn} 
                    hideRemoveBtns = {this.hideRemoveBtns} 
                    cellSize = {cellSize} />
                </td>
              <td></td>
          </tr>
          <tr className="tablerow">
              <td className="tablecolumn" style = {{width: `${cellSize}px`}}>
                  <RemoveButton 
                    type = "remove-row" 
                    isHiddenRowBtn = {isHiddenRowBtn}
                    currentRow = {currentRow} 
                    currentColumn = {currentColumn} 
                    removeRow = {this.removeRow} 
                    stylesRemoveRow = {stylesRemoveRow} 
                    hideRemoveBtns = {this.hideRemoveBtns} 
                    cellSize = {cellSize}/></td>
              <td><Squares 
                    table = {table} 
                    updateCurrentPosition = {this.updateCurrentPosition} 
                    hideRemoveBtns = {this.hideRemoveBtns} 
                    cellSize = {cellSize}/>
                </td>
              <td><AddButton 
                    type = "add-column" 
                    addColumn = {this.addColumn} 
                    cellSize = {cellSize}/>
                </td>
          </tr>
          <tr><td></td><td>
                   <AddButton 
                    type = "add-row" 
                    addRow = {this.addRow} 
                    cellSize = {cellSize}/>
          </td><td></td></tr>
        </tbody>
      </table>
    )
  }
}

Cube.propTypes = {
  initialHeight: PropTypes.number.isRequired,
  initialWidth: PropTypes.number.isRequired,
  cellSize: PropTypes.number
}


export default Cube;
