import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import EmailForm from './components/EmailForm/EmailForm';
import Header from './components/Header/Header';


function App() {
  return (
    <div className="App">
      <Header />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/EmailForm' element={<EmailForm />} />
          </Routes>
        </BrowserRouter>
        {/* <Home />   */}
    </div>
  );
}

export default App;
