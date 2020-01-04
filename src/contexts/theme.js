import React from 'react';

const { Provider, Consumer } = React.createContext();

const ThemeProvider = Provider;
const ThemeConsumer = Consumer;

export {
    ThemeProvider,
    ThemeConsumer
};
