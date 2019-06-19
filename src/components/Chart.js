import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import changeName from '../actions/changeName';
import LineTo from './Lineto';

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
              return <>
                <div>
                  <div key={item.id}  id={item.id} className={item.type} style={{ cursor: 'pointer', width: '120px', ZIndex: 10, height: '50px', backgroundColor: '#fff', border: '1px solid #000', position: "absolute", top: item.y, right: item.x}}>
                    <form onSubmit={this.submit}>
                      <input type='text' onChange={()=>this.setId(item.id)} onInput={this.setText} placeholder={item.name}/>
                    </form>
                  </div>
                </div>
                {item.branches.map(el=><LineTo from={item.id} to={el.branchId} lineTitle={el.connectionName}/> )}
              </>
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
    data,
  }
}

  export default connect(mapStateToProps)(Chart);
