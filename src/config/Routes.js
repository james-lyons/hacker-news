import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from '../containers/Loading/Loading;';
import { ThemeProvider } from '../contexts/theme';

const Posts = React.lazy(() => import('../components/'))


export default Router(() => {
    <React.Suspense fallback={ <Loading /> }/> 
})