import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import changeName from '../actions/changeName'
class Chart extends Component {
  state = {
    text: "Default Title",
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

    const title = data && data[selectedGraph].name
    const nodes = data && data[selectedGraph].nodes
    return (
      <>
        <h2>{title}</h2>
        {nodes && Object.values(nodes).map(item=>{
            return <div key={item.id} className={item.type}>
              <form onSubmit={this.submit}>
              <input type='text' onChange={()=>this.setId(item.id)} onInput={this.setText} placeholder={item.name}/>
              </form>
              </div>
        })}
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
