import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarProduto } from "../../services/ProductService";
import { ToastContainer, toast } from "react-toastify";
import "./ProductForm.css";

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    preco: 0,
    quantidade: 0,
    foto: "",
    descricao: "",
    status: "active",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await criarProduto(formData);
      toast.success('Produto criado com sucesso');
      setFormData({
        nome: "",
        preco: 0,
        quantidade: 0,
        foto: "",
        descricao: "",
        status: "active",
      });
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error.join("\n");
        toast.error(errorMessage);
      } else {
        toast.error('Erro ao criar produto: ' + error.message);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="product-form-container">
      <h2 className="form-title">Cadastrar Produto</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="form-control"
            placeholder="Digite o nome do produto"
          />
        </div>
        <div className="form-group">
          <label>Preço:</label>
          <input
            type="text"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            className="form-control"
            placeholder="Digite o preço do produto"
          />
        </div>
        <div className="form-group">
          <label>Quantidade:</label>
          <input
            type="text"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            className="form-control"
            placeholder="Digite a quantidade do produto"
          />
        </div>
        <div className="form-group">
          <label>Foto (URL):</label>
          <input
            type="text"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            className="form-control"
            placeholder="Digite a URL da foto do produto"
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="form-control"
            placeholder="Digite a descrição do produto"
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-control"
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Salvar</button>
        <button type="button" onClick={handleBack} className="back-button">Voltar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductForm;
