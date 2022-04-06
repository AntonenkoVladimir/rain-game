import React, {useState} from 'react';
import './App.scss';

const App = () => {
  const size = {
    tr: 6,
    td: 12
  };

  const [table, setTable] = useState(new Array(size.tr).fill(new Array(size.td).fill({class: 'empty'})));
  const [isWasRain, setIsWasRain] = useState(false);

  const changeColor = (tr: number, td: number) => {
    if (isWasRain && table[tr][td].class !== 'water') {
      clearWater();
    } else {
      if (tr === size.tr - 1 || (table[tr + 1][td].class === 'soil' && (tr - 1 <= 0 || (table[tr - 1][td].class === 'empty')))) {
        if (tr === size.tr - 1 && table[tr - 1][td].class !== 'empty') return;
        setTable(table.map((item, index) => {
          return index === tr ? item.map((i: { class: string }, ind: number) =>
            ind === td ? i.class === 'empty' ? {class: 'soil'} : {class: 'empty'} : i) : item;
        }));
      }
    }
  }

  const rainFunc = () => {
    let isWater = false;
    setTable(table.map((item, index) => {
      return item.map((i: { class: string }, ind: number) => {
        if (isWater) {
          if (item[ind + 1].class === 'soil') isWater = false;
          return {class: 'water'};
        } else {
          if (
            ind < size.td - 2 &&
            item[ind + 1].class !== 'soil' &&
            i.class === 'soil' &&
            item.some((k: { class: string }, ki: number) => (ki > ind && k.class === 'soil'))
          ) {
            isWater = true;
          }
          return i;
        }
      })
    }));
    setIsWasRain(true);
  }

  const clearWater = () => {
    setIsWasRain(false);
    setTable(table.map((item, index) => {
      return item.map((i: { class: string }, ind: number) => {
        return i.class === 'water' ? {class: 'empty'} : i;
      })
    }));
  }

  return (
    <div className='app'>
      <table>
        <tbody>
        {
          table.map((item, indexTR) => (<tr key={`${indexTR + 1}`}>
            {
              item.map((itemTD: { class: string }, indexTD: number) => (
                <td
                  key={`${indexTR}-${indexTD}`}
                  className={itemTD.class}
                  onClick={() => changeColor(indexTR, indexTD)}
                />
              ))
            }
          </tr>))
        }
        </tbody>
      </table>
      <div className='app-buttons'>
        <button
          className='app-clear'
          onClick={() => setTable(new Array(size.tr).fill(new Array(size.td).fill({class: 'empty'})))}
        >
          Reset
        </button>
        <button
          className='app-rain'
          onClick={rainFunc}
        >
          Rain
        </button>
      </div>
    </div>
  );
}

export default App;
