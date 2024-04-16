import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import EmailForm from './components/EmailForm/EmailForm';
import Header from './components/Header/Header';
import ImportExcel from './components/ImportExcel/ImportExcel';
import ExportExcel from './components/ExportExcel/ExportExcel'
import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      {/* <ToastContainer /> */}
      <Header />
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/EmailForm' element={<EmailForm />} />
          <Route path='/ExcelInsertion' element={<ImportExcel />} />
          <Route path='/ExportExcel' element={<ExportExcel />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
 
      {/* <Home />   */}
    </div>
  );
}

export default App;
