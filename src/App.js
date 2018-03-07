import React, {Component} from 'react';
import zip from 'lodash/zip';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryLabel} from 'victory';

const WIDTH = 800;
const HEIGHT = 300;

const DATA = [];
let i = 31;
while (i--) DATA.push({x: 10 * i, y: Math.round(Math.random() * 1000)});
const maxData = Math.max.apply(null, DATA.map(item => item.y));

let DATA_STACK = [];
i = 31;
while (i--) DATA_STACK.push({x: 10 * i, y: -(Math.round(Math.random() * 500))});
DATA_STACK = DATA_STACK.reverse();
const minDataStack = Math.min.apply(
  null,
  zip(DATA_STACK, DATA_STACK, DATA_STACK).map(item => item.reduce((memo, i) => memo + i.y, 0))
);

const tickValues = (start = -900, stop = 900, step = 150) => {
  const result = [];
  const normalizeStart = start % step ? start - (start % step) - step : start;
  const normalizeStop = stop % step ? stop - (stop % step) + step : stop;
  let index = normalizeStart;
  while (index <= normalizeStop) {
    result.push(index);
    index += step;
  }
  return result;
};

class App extends Component {
  render() {
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
        >
          <VictoryAxis
            offsetY={50}
            style={{
              axis: {stroke: 'transparent'},
              tickLabels: {fontSize: 6},
              grid: {stroke: 'transparent'}
            }}
            tickCount={DATA.length}
            tickFormat={v => `2/${v / 10}`}
          />
          <VictoryAxis
            dependentAxis
            tickValues={tickValues(minDataStack, maxData)}
            tickLabelComponent={<VictoryLabel dx={40} dy={-5}/>}
            style={{
              axis: {stroke: 'transparent'},
              tickLabels: {fontSize: 6},
              ticks: {size: 50, stroke: '#ECEFF1'}
            }}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            tickLabelComponent={<VictoryLabel dx={-40} dy={-5}/>}
            tickValues={tickValues(minDataStack, maxData)}
            tickFormat={v => `${v / 100}%`}
            style={{
              axis: {stroke: 'transparent'},
              tickLabels: {fontSize: 6},
              ticks: {size: 50, stroke: '#ECEFF1'}
            }}
          />
          <VictoryBar data={DATA} style={{data: {fill: 'url(#grad-blue)'}}}/>
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
