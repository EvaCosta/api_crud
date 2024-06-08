import React, { useState, useEffect } from "react";
import { listarProdutos, excluirProduto } from "../../services/ProductService";
import { Product } from "../../types/Product";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const productList = await listarProdutos();
      setProducts(productList);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleDelete = async (productId: number) => {
    try {
      await excluirProduto(productId);
      // Atualiza a lista de produtos após a exclusão
      toast.success("Produto excluído com sucesso!");
      fetchProdutos();
    } catch (error) {
      toast.error("Erro ao excluir produto: " + (error as Error).message);
      console.error("Erro ao excluir produto:", error);
    }
  };

  return (
    <div className="product-list-container">
      <h2 className="list-title">Lista de Produtos</h2>

      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <div className="product-details">
              <p><strong>Nome:</strong> {product.nome}</p>
              <p><strong>Preço:</strong> {product.preco}</p>
              <p><strong>Quantidade:</strong> {product.quantidade}</p>
              <p><strong>Status:</strong> {product.status}</p>
              <p><strong>Descrição:</strong> {product.descricao}</p>
            </div>
            <div className="button-container">
              <Link to={`/editar/${product.id}`} className="link-no-underline">
                <button className="edit-button">Editar</button>
              </Link>
              <button className="delete-button" onClick={() => handleDelete(product.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
      <Link to={`/cadastrar`} className="link-no-underline">
        <button className="btn btn-primary">Cadastrar Novo Produto</button>
      </Link>
    </div>
  );
};

export default ProductList;
