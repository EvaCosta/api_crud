import { FastifyReply, FastifyRequest } from "fastify";
import Produto from "../entities/Produto";
import { ValidationError } from "sequelize";
import { formatErrorMessage } from "../utils/validateErrors";

export async function criarProduto(
  request: FastifyRequest<{
    Body: {
      nome: string;
      preco: number;
      quantidade: number;
      foto: string;
      descricao: string;
      status: string;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    const { nome, preco, quantidade, foto, descricao, status } = request.body;

    const novoProduto = await Produto.create({
      nome,
      preco,
      quantidade,
      foto,
      descricao,
      status,
    });

    reply.code(201).send(novoProduto);
  } catch (error) {
    if (error instanceof ValidationError) {
      // Captura erros de validação do Sequelize
      const errorMessage = formatErrorMessage(error);
      reply.code(400).send({ error: errorMessage });
    } else {
      // Outros erros
      console.error("Erro ao criar produto:", error);
      reply.code(500).send({ error: "Erro interno do servidor" });
    }
  }
}
export async function atualizarProduto(
  request: FastifyRequest<{
    Params: { id: number };
    Body: {
      nome?: string;
      preco?: number;
      quantidade?: number;
      foto?: string;
      descricao?: string;
      status?: string;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    const produto = await Produto.findByPk(request.params.id);
    if (produto) {
      await produto.update(request.body);
      reply.send(produto);
    } else {
      reply.code(404).send({ error: "Produto não encontrado" });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      // Captura erros de validação do Sequelize
      const errorMessage = formatErrorMessage(error);
      reply.code(400).send({ error: errorMessage });
    } else {
      // Outros erros
      console.error("Erro ao criar produto:", error);
      reply.code(500).send({ error: "Erro interno do servidor" });
    }
  }
}

export async function obterProdutoPorId(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const produto = await Produto.findByPk(request.params.id);
    if (produto) {
      reply.send(produto);
    } else {
      reply.code(404).send({ error: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function listarProdutos(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const produtos = await Produto.findAll();
    reply.send(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function excluirProduto(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const produto = await Produto.findByPk(request.params.id);
    if (produto) {
      if (produto.status == 'inactive') {
        await produto.destroy();
        reply.send({ message: "Produto excluído com sucesso" });
      } else {
        reply.code(400).send({ error: "Não é possível excluir um produto com status ativo" });
      }
    } else {
      reply.code(404).send({ error: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}
