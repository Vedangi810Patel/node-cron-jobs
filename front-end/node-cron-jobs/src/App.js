import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import EmailForm from './components/EmailForm/EmailForm';
import Header from './components/Header/Header';
import ImportExcel from './components/ImportExcel/ImportExcel';
import ExportExcel from './components/ExportExcel/ExportExcel'

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/EmailForm' element={<EmailForm />} />
          <Route path='/ExcelInsertion' element={<ImportExcel />} />
          <Route path='/ExportExcel' element={<ExportExcel />} />
        </Routes>
      </BrowserRouter>
      {/* <Home />   */}
    </div>
  );
}

export default App;
