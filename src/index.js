import React from 'react';
import ReactDOM from 'react-dom';

const title = 'React Helix';

class Nucleotide extends React.Component {
  render () {
    let styles = {
      transform: 'rotateY('+this.props.transform+'deg)'
    }
    return (
      <div style={styles} className={'wrapper '+this.props.color}>
        <div className='uno pulse'></div>
        <div className='dos'></div>
        <div className='tres pulse'></div>
      </div>
    )
  }
}

class Helix extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            rows:Array(this.props.toStart).fill(null),
            transform:0
        };

    }

    addRow(color) {
      this.setState({rows:[...this.state.rows,color]});
    }

    removeLast() {
      var nsa = this.state.rows.slice();
      nsa.pop();
      this.setState({rows: nsa});
    }

    componentDidMount() {
      this.state.rows.map((nothing,i) => {
          this.state.rows[i]=this.props.colors[i%4];
      });
      this.interval = setInterval(() => {
        this.setState({transform:this.state.transform+0.25});
        if (this.state.transform === 360) {
          this.setState({transform:0});
        }
      },10);
    }

    componentWillUnmount(){
      clearInterval(this.interval);
    }

    render() {
      return (
          <div id="holder">
              <div className="buttons">
                  {this.props.colors.map((color,i) => {
                      return <button onClick={() => this.addRow(color,i)} key={color}>Add {color}</button>
                  })}
                  <button onClick={() => this.removeLast()}>Remove Last</button>
              </div>
              <div id="double">
                  <div id="helix">
                      {this.state.rows.map((color,k) => {
                          return <Nucleotide color={color} transform={this.state.transform-(k*10)} key={k}></Nucleotide>
                      })}
                  </div>
              </div>
          </div>
      )
  }
}

ReactDOM.render(
  <Helix toStart={22} colors={['azure','crimson','green','tweety']}/>,
  document.getElementById('app')
);
