import { Routes, Route } from 'react-router-dom';
import MainPages from './pages/mainPages';
import ResponsePages from './pages/ResponsePages';

export default function App() {
 return (
  <Routes>
   <Route
    path='/'
    element={<MainPages />}
   />
   <Route
    path='/response'
    element={<ResponsePages />}
   />
  </Routes>
 );
}
