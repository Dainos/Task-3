import React, {Component} from 'react';
import './style.css';



class RemoveButton extends Component {

    mouseOnHandler = () => {
        this.props.hideRemoveBtns(false);   
    }

    mouseOutHandler = () => {
        this.props.hideRemoveBtns(true);
    }
    
    render() {
        return (
            this.props.type === 'remove-row' 
            ?  <button className={this.props.stylesRemoveRow.join(" ")} style ={{top: `${2 + (this.props.currentRow-1)*52 }px`}} onMouseDown = {this.props.removeRow.bind(this, 0)} onMouseOut = {this.mouseOutHandler} onMouseOver = {this.mouseOnHandler}>–</button>
            :  <button className={this.props.stylesRemoveColumn.join(" ")} style ={{left: `${2+(this.props.currentColumn-1)*52 }px`}} onMouseDown = {this.props.removeColumn} onMouseOut = {this.mouseOutHandler} onMouseOver = {this.mouseOnHandler}>–</button>
        )  
    }    
}


class AddButton extends Component {

    constructor () {
        super();
        this.stylesAddRow = ["btn", "add-btn", "add-row-btn"];
        this.stylesAddColumn = ["btn", "add-btn", "add-column-btn"];
    }

    render() {
        return (
            this.props.type === 'add-row' 
            ?  <button className={this.stylesAddRow.join(" ")} onMouseDown = {this.props.addRow}>+</button>
            :  <button className={this.stylesAddColumn.join(" ")} onMouseDown = {this.props.addColumn}>+</button>
        )        
    }

}

export {
    AddButton,
    RemoveButton
};