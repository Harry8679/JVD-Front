import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/inscription' element={<Register />} />
        <Route path='/connexion' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
