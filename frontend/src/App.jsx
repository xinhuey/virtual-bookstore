import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import createBook from './pages/createBook';
import showBook from './pages/showBook';
import editBook from './pages/editBook';
import deleteBook from './pages/deleteBook';


export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<createBook />} />
      <Route path="/books/details/:id" element={<showBook />} />
      <Route path="/books/edit/:id" element={<editBook />} />
      <Route path="/books/delete/:id" element={<deleteBook />} />
    </Routes>
  )
}

export default App
