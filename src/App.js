import React, {Component} from 'react';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryContainer} from 'victory';

const WIDTH = 800;
const HEIGHT = 300;

const DATA = [];
let i = 30;
while (i--) DATA.push({x: 10 * i, y: Math.round(Math.random() * 1000)});

let DATA_STACK = [];
i = 30;
while (i--) DATA_STACK.push({x: 10 * i, y: -(Math.round(Math.random() * 500))});
DATA_STACK = DATA_STACK.reverse();

const tickValues = (start = -900, stop = 900, step = 150) => {
  const result = [];
  let index = start;
  while (index < stop) {
    result.push(index);
    index += step;
  }
  return result;
};

const NoDraw = () => null;

class App extends Component {
  render() {
    VictoryTheme.material.axis.style.grid.strokeDasharray = null;
    VictoryTheme.material.axis.style.axis.stroke = 'transparent';
    VictoryTheme.material.bar.style.data.fill = 'url(#grad-blue)';
    return (
      <div>
        <svg>
          <defs>
            <linearGradient id="grad-blue">
              <stop offset="0%" stopColor="rgb(116, 147, 161)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="rgb(116, 147, 161)" stopOpacity="0.8"/>
            </linearGradient>
            <linearGradient id="grad-red">
              <stop offset="0%" stopColor="rgb(183, 76, 81)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="rgb(183, 76, 81)" stopOpacity="0.6"/>
            </linearGradient>
            <linearGradient id="grad-orange">
              <stop offset="0%" stopColor="rgb(209, 108, 36)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="rgb(209, 108, 36)" stopOpacity="0.6"/>
            </linearGradient>
            <linearGradient id="grad-yellow">
              <stop offset="0%" stopColor="rgb(204, 162, 55)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="rgb(204, 162, 55)" stopOpacity="0.6"/>
            </linearGradient>
          </defs>
        </svg>
        <VictoryChart
          width={WIDTH}
          height={HEIGHT}
          theme={VictoryTheme.material}
          containerComponent={<VictoryContainer width={WIDTH} height={HEIGHT}/>}
        >
          <VictoryAxis
            offsetY={50}
            gridComponent={<NoDraw/>}
            tickCount={DATA.length}
            tickFormat={v => `2/${v / 10}`}
          />
          <VictoryAxis
            dependentAxis
            tickValues={tickValues()}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            tickValues={tickValues()}
            tickFormat={v => `${v / 100}%`}
          />
          <VictoryBar data={DATA} fill="url(#data-grad)"/>
          <VictoryStack colorScale={['url(#grad-red)', 'url(#grad-orange)', 'url(#grad-yellow)']}>
            <VictoryBar data={DATA_STACK}/>
            <VictoryBar data={DATA_STACK}/>
            <VictoryBar data={DATA_STACK}/>
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

export default App;
