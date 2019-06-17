import React, { Component } from 'react'
import Chart from './components/Chart'
import receiveData from './actions/receiveData'
import * as data from './data/data'
import { connect } from 'react-redux';

require('./scss/main.scss');

class App extends Component {
  state={
    data: null,
    selectedGraph: "thermostat",
  }
  componentDidMount(){
    this.props.dispatch(receiveData(data.default))
  }

  render() {
    const { data } = this.props
    const { selectedGraph } = this.state
    const graphs = data && Object.keys(data)
    const dataToChart = data && data[selectedGraph]

    return (
      <div className="container">
        <div className="data">
          <div className="data-form">
            <h2>Select graph</h2>
            <div className="select-area">
              <select className="input-select" value={this.state.selectedGraph} onChange={(e)=>this.setState({selectedGraph: e.target.value})}>
                {graphs && graphs.map(graph=> <option value={graph}>{graph.charAt(0).toUpperCase() + graph.slice(1)}</option>)}
              </select>
            </div>
            <div className="graph">
              <pre>
                {dataToChart && JSON.stringify(dataToChart, null, 2)}
              </pre>
            </div>
          </div>
        </div>
        <div className="flowChart">
          <Chart data={dataToChart} selectedGraph={this.state.selectedGraph}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({data}) {
  return {
    data
  }

}

export default connect(mapStateToProps)(App);