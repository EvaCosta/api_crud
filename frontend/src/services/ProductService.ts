import axios from "axios";

// Interface para representar a estrutura de dados de um produto
interface ProductData {
  id?: number; // ID é opcional para o caso de criação de um novo produto
  nome: string;
  preco: number;
  quantidade: number;
  foto: string;
  descricao: string;
  status: string;
}

// Função para criar um novo produto
export async function criarProduto(formData: ProductData) {
  try {
    await axios.post("http://localhost:3000/produtos", formData); // Certifique-se de usar o URL correto da API
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message);
    }
  }
}

// Função para atualizar um produto existente
export async function editarProduto(id: number, formData: ProductData) {
  try {
    await axios.put(`http://localhost:3000/produtos/${id}`, formData);
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message);
    }
  }
}

export async function buscarProduto(id: number) {
  try {
    const response = await axios.get(`http://localhost:3000/produtos/${id}`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message);
    }
  }
}

// Função para listar todos os produtos
export async function listarProdutos() {
  try {
    const response = await axios.get("http://localhost:3000/produtos");
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message);
    }
  }
}

// Função para excluir um produto existente
export async function excluirProduto(id: number) {
  try {
    await axios.delete(`http://localhost:3000/produtos/${id}`);
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message);
    }
  }
}
