import React, {useState} from 'react';
import './App.scss';

const App = () => {
  const size = {
    tr: 6,
    td: 12
  };

  const [table, setTable] = useState(new Array(size.tr).fill(new Array(size.td).fill({class: 'empty'})));
  const [isWasRain, setIsWasRain] = useState(false);

  const tableSetter = (tr: number, td: number) => {
    setTable(table.map((item: { class: string, live: number }[], index: number) => {
      if (index === tr) {
        return item.map((i: { class: string }, ind: number) => {
          if (ind === td) {
            return i.class === 'empty' ? {class: 'soil'} : {class: 'empty'};
          }
          return i;
        })
      }
      return item;
    }));
  }

  const changeColor = (tr: number, td: number) => {
    const isWater = table[tr][td].class === 'water'
    if (isWasRain && !isWater) {
      clearWater();
    } else {
      const isLowBorder = tr === size.tr - 1;
      const isTopBorder = tr - 1 < 0;
      const isBottomSoil = !isLowBorder ? table[tr + 1][td].class === 'soil' : true;
      const isTopEmpty = !isTopBorder ? table[tr - 1][td].class === 'empty' : true;

      if ((isLowBorder && isTopEmpty && !isWater) || (isBottomSoil && isTopEmpty && !isWater)) {
        tableSetter(tr, td);
      }
    }
  }

  const rainFunc = () => {
    let isWater = false;
    setTable(table.map((item, index) => {
      return item.map((i: { class: string }, ind: number) => {
        const isNotBorder = ind < size.td - 1;
        let isNextSoil = false;
        if (isNotBorder) isNextSoil = item[ind + 1].class === 'soil';
        if (isWater) {
          if (isNextSoil) isWater = false;
          return {class: 'water'};
        } else {
          const isCurrentSoil = i.class === 'soil';
          const isFartherSoil = item.some((k: { class: string }, ki: number) => (ki > ind && k.class === 'soil'));
          if (isNotBorder && !isNextSoil && isCurrentSoil && isFartherSoil) isWater = true;
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
