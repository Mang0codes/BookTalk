import './App.css'
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import bg from './assets/imgs/bgimg2.jpg'
import AddBook from './pages/AddBook';
import Signin from './pages/Signin';
import BookInfo from './pages/BookInfo';
import Filtered from './pages/Filtered';

function App() {

  return (
    <div style={{ backgroundImage: `url(${bg})` }}
    className="min-h-screen w-full bg-cover bg-fixed bg-center z-0 overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addBook' element={<AddBook />} />
          <Route path='/signin' element={<Signin/> } />
          <Route path='/bookInfo/:bookId' element={<BookInfo />} />
          <Route path='/filter/:genre' element={<Filtered />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
