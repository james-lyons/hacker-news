import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from '../containers/Loading/Loading';
import { ThemeProvider } from '../contexts/theme';

const Posts = React.lazy(() => import('../containers/Posts/Posts'));
const Post = React.lazy(() =>  import('../containers/Post/Post'));
const User = React.lazy(() => import('../containers/User/User'));

export default Router(() => {
    <ThemeProvider value={ this.props }>
        <React.Suspense fallback={ <Loading /> }>
            <Switch>
                <Route exact path='/' render={() => <Posts type='top' />} />
                <Route path='/new' render={() => <Posts type='new'/>} />
                <Route path='/post' component={ Post } />
                <Route path='/user' component={ User } />
                <Route render={() => <h1>404</h1>} />
            </Switch>
        </React.Suspense>
    </ThemeProvider>
});