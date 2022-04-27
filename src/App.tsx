import { io } from 'socket.io-client';
import './App.css';
import Mainroutes from './routes/Mainroutes';
// import PreApp from './preApp/PreApp';
export const socket = io('http://localhost:3003/')


function App() {



  return (
    // <PreApp />
    <Mainroutes />
  );
}

export default App;
