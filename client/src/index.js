import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import store from './store/reduxStore';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ChakraProvider>
      <Routes>
        <Route path='*' element={<App/>}/>
      </Routes>
      </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

