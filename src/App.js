import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './Calculator';
import styled, {ThemeProvider} from 'styled-components';
import theme from 'styled-theming';

const boxBackgroundColor = theme('mode', {
  light: '#c6b5a6',
  dark: '#2d1a19',
});

const textColor = theme('mode', {
  light: '#2d1a19',
  dark: '#c6b5a6',
});

const Box = styled.div`
  background-color: ${boxBackgroundColor};
  color: ${textColor};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 20px;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'dark',
    };
  }
  render() {
    const {mode} = this.state;
    return (
      <ThemeProvider theme={{mode: mode}}>
        <Box>
          <button onClick={this.toggleMode}>Toggle Mode</button>
          <React.Fragment>
            <h1 className="center">Rend Research Calculator</h1>
            <Calculator />
          </React.Fragment>
        </Box>
      </ThemeProvider>
    );
  }
  toggleMode = () => {
    const {mode} = this.state;

    this.setState({mode: mode === 'dark' ? 'light' : 'dark'});
  };
}

export default App;
