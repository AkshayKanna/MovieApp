import React from 'react';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import newTheme from "./theme";
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={newTheme}>
        <Sidebar />
      </ThemeProvider >
    </React.StrictMode>
  );
}

export default App;
