import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Squares extends Component {

    state = {
        currentRow: null,
        currentColumn: null,

    }

    mouseOnHandler = () => {

        this.props.hideRemoveBtns(false);
        
    }

    mouseOutHandler = () => {
        this.props.hideRemoveBtns(true);
    }


    setCurrentRow = index => {
        this.setState({currentRow: index});
    }

    setCurrentcolumn = (index, event) => {
        this.setState({currentColumn: index}, () => this.props.updateCurrentPosition(this.state, event));
        
    }


    render() {
        
        return (
            <div className = 'div-table' onMouseOut = {this.mouseOutHandler} onMouseOver = {this.mouseOnHandler}  >
                {this.props.table.map((row, index) => 
                <div className = "row" key = {index+1} onMouseOver = {(event) => this.setCurrentRow(index+1, event)}>
                    {this.props.table[0].map ((cell, index) => <div className = "cell" key = {cell+1} onMouseOver = {(event) => this.setCurrentcolumn(index+1, event)}>                        
                    </div>)}
                </div>)}  
            </div>            
        );
    }
    
}

Squares.propTypes = {
    table: PropTypes.array.isRequired
}

Squares.defaultProps = {
    initialHeight: 4,
    initialWidth: 4
}

export default Squares;