import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import changeName from '../actions/changeName'
class Chart extends Component {
  state = {
    text: "",
    id: ''
  };

  setId=(id)=>{
    this.setState({id});
  }

  setText=(e)=>{
    this.setState({text: e.target.value})
  }

  submit=(e)=>{
    e.preventDefault()
    this.props.dispatch(changeName(this.state.text, this.state.id, this.props.selectedGraph));
  }

  render() {
    const { data, selectedGraph } = this.props
    const nodes = data && data[selectedGraph].nodes
    return (
      <>

        <div className="chart_main">
          {nodes && Object.values(nodes).map(item=>{
              return <div key={item.id} className={item.type} style={{position: "absolute", top: item.y, right: item.x}}>
                <form onSubmit={this.submit}>
                  <input type='text' onChange={()=>this.setId(item.id)} onInput={this.setText} placeholder={item.name}/>
                </form>
                </div>
          })}
        </div>
      </>
    )
  }
}
Chart.propTypes = {
    selectedGraph: PropTypes.string,
};


function mapStateToProps ({data}) {
  return {
    data
  }
}

  export default connect(mapStateToProps)(Chart);
