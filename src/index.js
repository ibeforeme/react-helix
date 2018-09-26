import React from 'react';
import ReactDOM from 'react-dom';

function Nucleotide(props) {
  props.update();

  const styles = {
    transform: 'rotateY('+props.transform+'deg)'
  }

  return (
    <div style={styles} className={'wrapper '+props.color}>
      <div className='uno'></div>
      <div className='dos'></div>
      <div className='tres'></div>
    </div>
  )
}

class Helix extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      rows:Array(this.props.toStart).fill(null),
      transform:0,
      background:'#000000'
    };

    this.updateBackground = this.updateBackground.bind(this)
  }

  addRow(color) {
    this.setState({rows:[...this.state.rows,color]});
  }

  removeLast() {
    var nsa = this.state.rows.slice();
    nsa.pop();
    this.setState({rows: nsa});
  }

  updateBackground() {
    const y = this.state.rows.filter((x) => {return x==='tweety'}).length;
    const r = this.cleanUp(this.state.rows.filter((x) => {return x==='crimson'}).length+y);
    const g = this.cleanUp(this.state.rows.filter((x) => {return x==='green'}).length+y);
    const b = this.cleanUp(this.state.rows.filter((x) => {return x==='azure'}).length);
    const bg = '#'+r+g+b;
    this.state.background = bg;
  }

  cleanUp(n) {
    n = n*2;
    if (n > 99) {
      n = 99;
    }
    return n.toString().padStart(2,'0');
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
    const styles = {
      backgroundColor: this.state.background
    }
    return (
      <div id="holder" style={styles}>
        <div id="controls">
          <p>Adding and removing colors adjusts the DNA of the app's background color.</p>
          {this.props.colors.map((color,i) => {
            return <button onClick={() => this.addRow(color,i)} key={color}>Add {color} ({this.state.rows.filter((x) => {return x===color}).length})</button>
          })}
          <button onClick={() => this.removeLast()}>Remove Last</button>
        </div>
        <div id="double">
          <div id="helix">
            {this.state.rows.map((color,k) => {
              return <Nucleotide color={color} transform={this.state.transform-(k*10)} key={k} update={this.updateBackground}></Nucleotide>
            })}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Helix toStart={16} colors={['azure','crimson','green','tweety']}/>,
  document.getElementById('app')
);

module.hot.accept();
