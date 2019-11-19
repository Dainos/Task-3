import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App';
import Squares from './Squares'
import AddButton from './Buttons'

configure({
    adapter: new Adapter()
  })
  
  describe('Squares', () => {

    let squares, rows, cells, app;
    let addColumn;
    const initialHeight = 4, initialWidth = 4  

    beforeEach(() => {
        let table = [];

        for (let i = 0; i < initialHeight; i++) {
            let row = [];
            for (let j = 0; j < initialWidth; j++) {
                row.push(j + 1)
            }
        table.push(row);
        }
        app = mount(<App/>)

        squares = mount(<Squares table = {table}/>)

        rows = squares.find('.row'); 

        cells = squares.find('.cell');

        let addColumnFunc = jest.fn();        

        addColumn = mount(<AddButton />);
        
       

    })


    it ('correct rows amount', () => { 
        expect(rows.length).toEqual(initialHeight);
    })

    it ('correct columns amount', () => {
        expect(cells.length/initialHeight).toEqual(initialWidth);
    })

    it ('correct adding columns', () => {


        // addColumn.simulate('click')
        // expect(addColumn).toBeDefined()              
    })



  })