import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import EmailForm from './components/EmailForm/EmailForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Email' element={<EmailForm />} />
          </Routes>
        </BrowserRouter>
        {/* <Home />   */}
      </header>
    </div>
  );
}

export default App;
