import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Loading from './containers/Loading/Loading';
// import Routes from './config/Routes';
import { ThemeProvider } from './contexts/theme';
import './index.css';

const Posts = React.lazy(() => import('./containers/Posts/Posts'));
const Post = React.lazy(() =>  import('./containers/Post/Post'));
const User = React.lazy(() => import('./containers/User/User'));

class App extends React.Component {
    state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
    }
    render() {
      return (
        <Router>
          <ThemeProvider value={this.state}>
            <div className={this.state.theme}>
              <div className='container'>
                <Nav />
  
                <React.Suspense fallback={<Loading />}>
                  <Switch>
                    <Route
                      exact
                      path='/'
                      render={() => <Posts type='top' />}
                    />
                    <Route
                      path='/new'
                      render={() => <Posts type='new' />}
                    />
                    <Route path='/post' component={Post} />
                    <Route path='/user' component={User} />
                    <Route render={() => <h1>404</h1>} />
                  </Switch>
                </React.Suspense>
              </div>
            </div>
          </ThemeProvider>
        </Router>
      )
    }
  }

export default App;