import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Cart } from './Components/Cart';
import Header from './Components/Header';
import Login from './Components/Login';
import { Products, ViewProduct } from './Components/Products';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
