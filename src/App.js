import React, {Component} from 'react';
import Squares from './Squares';
import {AddButton, RemoveButton} from './Buttons';
import './style.css';


class App extends Component {

  constructor(props) {
    
    super(props);

    this.table = [];
    this.timerId = null;

    for (let i = 0; i < props.initialHeight; i++) {
      let row = [];
      for (let j = 0; j < props.initialWidth; j++) {
        row.push(j + 1)
      }
      this.table.push(row);
    }

    this.state = {
      rowsAmount: props.initialHeight,
      columnsAmount: props.initialWidth,
      table: this.table,
      currentRow: 0,
      currentColumn: 0,
      // hideRemoveBtns: true,

      stylesRemoveRow: ["btn", "remove-btn", "remove-row-btn hide"],
      stylesRemoveColumn: ["btn", "remove-btn", "remove-column-btn hide"]

    }

  }


  addRow () {
    this.table = this.state.table;
    const row = [];
    for (let i = 0; i < this.state.columnsAmount; i++) row.push(i+1);
    this.table.push(row);
    this.setState({
      rowsAmount: this.state.rowsAmount + 1,
      table: this.table
    })
    console.log(this.state.table)
  }

  removeRow () {
    if (this.state.rowsAmount === 1) return;
    this.table = this.state.table;
    this.table.splice(this.state.currentRow - 1, 1);
    if (this.state.rowsAmount === this.state.currentRow) this.setState ({currentRow: this.state.currentRow - 1})
    this.setState({
      rowsAmount: this.state.rowsAmount - 1,
      table: this.table
    })
    this.hideRemoveBtns("fast remove")
  }

  addColumn() {
    this.table = this.state.table;
    this.table.forEach((row, index) => {
      row.push(row.length+1);
    });
    
    this.setState({
      columnsAmount: this.state.columnsAmount + 1,
      table: this.table
    })
    console.log(this.state.table)

  }

  removeColumn (number = 0) {
    if (this.state.columnsAmount === 1) return;
    this.table = this.state.table;
    this.table.forEach((row) => {
      row.splice(this.state.currentColumn - 1, 1);
    });
    if (this.state.columnsAmount === this.state.currentColumn) this.setState ({currentColumn: this.state.currentColumn - 1})
    
    this.setState({
      columnsAmount: this.state.columnsAmount - 1,      
      table: this.table
    })
    this.hideRemoveBtns("fast remove")
  }

  updateCurrentPosition(position, event) {
      console.log(position)
      this.setState({
        currentRow: position.currentRow,
        currentColumn: position.currentColumn
      })
  }

  hideRemoveBtns(status) {
      if (status === "fast remove") {
        this.setState({
          stylesRemoveRow: ["btn", "remove-btn", "remove-row-btn hide"],
          stylesRemoveColumn: ["btn", "remove-btn", "remove-column-btn hide"]
        })
        return
      }
      if (status) {              
        this.timerId = setTimeout(() => {
          this.setState({
            stylesRemoveRow: ["btn", "remove-btn", "remove-row-btn hide"],
            stylesRemoveColumn: ["btn", "remove-btn", "remove-column-btn hide"]
          })
      }, 200);        
      }
      else {
        this.setState({
          stylesRemoveRow: ["btn", "remove-btn", "remove-row-btn"],
          stylesRemoveColumn: ["btn", "remove-btn", "remove-column-btn"]
        })
        clearTimeout(this.timerId);
        if (this.state.columnsAmount === 1) this.setState({stylesRemoveColumn: ["btn", "remove-btn", "remove-column-btn hide"]})
        if (this.state.rowsAmount === 1) this.setState({stylesRemoveRow: ["btn", "remove-btn", "remove-row-btn hide"]})

      }
  }
   

  render(){
    return (
      <table>
        <tbody>
          <tr className="tablerow">
              <td></td>
              <td><RemoveButton type = "remove-column" currentRow = {this.state.currentRow} currentColumn = {this.state.currentColumn} removeColumn = {this.removeColumn.bind(this)} stylesRemoveColumn = {this.state.stylesRemoveColumn} hideRemoveBtns = {this.hideRemoveBtns.bind(this)}/></td>
              <td></td>
          </tr>
          <tr className="tablerow">
              <td className="tablecolumn"><RemoveButton type = "remove-row" currentRow = {this.state.currentRow} currentColumn = {this.state.currentColumn} removeRow = {this.removeRow.bind(this)} stylesRemoveRow = {this.state.stylesRemoveRow} hideRemoveBtns = {this.hideRemoveBtns.bind(this)}/></td>
              <td><Squares table = {this.state.table} updateCurrentPosition = {this.updateCurrentPosition.bind(this)} hideRemoveBtns = {this.hideRemoveBtns.bind(this)}/></td>
              <td><AddButton type = "add-column" addColumn = {this.addColumn.bind(this)}/></td>
          </tr>
          <tr><td></td><td><AddButton type = "add-row" addRow = {this.addRow.bind(this)}/></td><td></td></tr>
        </tbody>
      </table>
    )
  }
}


export default App;
