import React from 'react';
import ReactDOM from 'react-dom';

function Nucleotide(props) {
  return (
    <div style={{transform: 'rotateY('+props.transform+'deg)'}} className={'wrapper '+props.color}>
      <div className='node'></div>
      <div className='bar'></div>
      <div className='node'></div>
    </div>
  )
}

class Helix extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      rows:Array(this.props.toStart).fill(null),
      transform:0,
      background:'rgb(0,0,0)'
    };
  }

  componentDidMount() {
    this.state.rows.map((nothing,i) => {
      this.state.rows[i]=this.props.colors[i%this.props.colors.length];
    });
    this.interval = setInterval(() => {
      this.setState({transform:this.state.transform+1});
    },50);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  addNucleotide(color) {
    const nsa = this.state.rows.slice();
    const total = nsa.filter(c => c===color).length;
    if (total < this.props.max) {
      nsa.push(color);
      this.setState({rows: nsa});
    }
    this.updateBackground();
  }

  removeNucleotide(color) {
    const nsa = this.state.rows.slice();
    const index = nsa.lastIndexOf(color);
    if (index !== -1) {
      nsa.splice(index,1);
      this.setState({rows: nsa});
    }
    this.updateBackground();
  }

  updateBackground() {
    const r = this.state.rows.filter(c => c==='red').length*this.props.modifier;
    const g = this.state.rows.filter(c => c==='green').length*this.props.modifier;
    const b = this.state.rows.filter(c => c==='blue').length*this.props.modifier;
    const rgb = 'rgb('+r+','+g+','+b+')';
    this.state.background = rgb;
  }

  clear() {
    this.setState({rows: []});
  }

  render() {
    const styles = {
      backgroundColor: this.state.background
    }
    return (
      <div id="holder" style={styles}>
        <div id="controls">
          {this.props.colors.map((color,i) => {
            return ([
              <label key={'label_'+color}>{color}</label>,
              <p key={'p_'+color}>
                <button key={'remove_'+color} className={(this.state.rows.filter(c => c===color).length <= 0) ? 'max' : ''} onClick={() => this.removeNucleotide(color)}>-</button>
                <span key={'total_'+color}>{this.state.rows.filter((x) => {return x===color}).length*this.props.modifier}</span>
                <button key={'add_'+color} className={(this.state.rows.filter(c => c===color).length >= this.props.max) ? 'max' : ''} onClick={() => this.addNucleotide(color)}>+</button>
              </p>
            ])
          })}
          <p><button className="clear" onClick={() => this.clear()}>Clear</button></p>
        </div>
        <div id="double">
          <div id="helix">
            {this.state.rows.map((color,k) => {
              return <Nucleotide color={color} transform={this.state.transform-(k*this.props.delay)} key={k} update={this.updateBackground}></Nucleotide>
            })}
          </div>
        </div>
      </div>
    )
    this.updateBackground();
  }
}

ReactDOM.render(
  <Helix toStart={12} modifier={5} max={51} delay={10} colors={['red','green','blue']}/>,
  document.getElementById('app')
);

module.hot.accept();
