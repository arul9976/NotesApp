import './App.scss'
import * as React from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import "react-device-detect"
import { Route, Routes } from 'react-router-dom';
import NavbarMain from './component/NavbarMain';
import SLPage from './component/SLPage';
import About from './component/About';
import Home from './component/Home';
import { ReduxData } from './component/Fetch';
import Contact from './component/Contact';
function App() {
  const { isLogged } = ReduxData();
  return (
    <ChakraProvider>

      <div className='App'>
        <NavbarMain />
        <Routes>
          <Route path='Notesapp/' exact Component={isLogged ? Home : SLPage} />
          <Route path='NotesApp/About' Component={About} />
          <Route path='NotesApp/Contact' Component={Contact} />
          <Route path='NotesApp/Work' Component={Home} />
          <Route path='NotesApp/Personal' Component={Home} />
          <Route path='NotesApp/Important' Component={Home} />

        </Routes>
      </div>
    </ChakraProvider >

  );
}

export default App;
