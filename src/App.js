import React from 'react';
import './App.css';
import { Navigate,Routes,Route } from 'react-router-dom';
import Chat from './Router/Chat/Chat';
import LobbyCss from './Router/LobbyCss/LobbyCss';


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path = '' element={<Navigate to='/Lobby'></Navigate>}></Route>
        <Route path='/Lobby/*' element={<LobbyCss></LobbyCss>}></Route>
        <Route path='/Chat/*' element={<Chat></Chat>}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
