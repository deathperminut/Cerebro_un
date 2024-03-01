import React from 'react';
import './App.css';
import { Navigate,Routes,Route } from 'react-router-dom';
import Chat from './Router/Chat/Chat';


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path = '' element={<Navigate to='/Chat'></Navigate>}></Route>
        <Route path='/Chat/*' element={<Chat></Chat>}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
