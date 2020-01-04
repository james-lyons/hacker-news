import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/'
import Routes from './config/Routes';
import { ThemeProvider } from './contexts/theme';
import './index.css';

class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    };

    render() {
        return (
            <>
                <Nav
                    theme={ this.state.theme }
                    toggleTheme={ this.state.toggleTheme }
                />
                <Routes />
            </>
        );
    };
};

export default App;