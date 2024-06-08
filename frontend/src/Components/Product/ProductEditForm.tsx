import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarProduto, editarProduto } from "../../services/ProductService";
import { ToastContainer, toast } from "react-toastify";

const ProductEditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    preco: 0,
    quantidade: 0,
    foto: "",
    descricao: "",
    status: "active",
  });

  useEffect(() => {


    fetchProduto();
  }, [id]);

  const fetchProduto = async () => {
    try {
      const produto = await buscarProduto(Number(id));
      setFormData(produto);
    } catch (error: any) {
      toast.error("Erro ao carregar produto: " + error.message);
    }
  };

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
      await editarProduto(Number(id), formData); 
      toast.success('Produto atualizado com sucesso');
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = (error.response.data.error as string[]).join("\n");
        toast.error(errorMessage);
        
      } else {
        toast.error('Erro ao atualizar produto: ' + error.message);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="product-form-container">
      <h2 className="form-title">Editar Produto</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="preco">Preço:</label>
          <input
            type="text"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantidade">Quantidade:</label>
          <input
            type="text"
            id="quantidade"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="foto">Foto:</label>
          <input
            type="text"
            id="foto"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
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

export default ProductEditForm;
