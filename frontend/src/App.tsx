import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductForm from "./Components/Product/ProductForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProductList from "./Components/Product/ProductList";
import ProductEditForm from "./Components/Product/ProductEditForm";


const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Gerenciamento de Produtos</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cadastrar" element={<ProductForm />} />
          <Route path="/editar/:id" element={<ProductEditForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;