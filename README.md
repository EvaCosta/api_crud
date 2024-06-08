
# Sistema de Gerenciamento de Produtos

Este é um sistema simples de gerenciamento de produtos desenvolvido com Node.js, Fastify, Sequelize e React.

## Funcionalidades

- Cadastrar produtos com nome, preço, quantidade, foto, descrição e status.
- Editar produtos existentes.
- Excluir produtos.
- Listar todos os produtos cadastrados.

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/sistema-gerenciamento-produtos.git
```

2. Navegue até o diretório do backend e instale as dependências:

```bash
cd backend
npm install
```

3. Navegue até o diretório do frontend e instale as dependências:

```bash
cd frontend
npm install
```

## Uso

1. Inicie o servidor backend:

```bash
cd backend
npm run dev
```

2. Inicie o servidor frontend:

```bash
cd frontend
npm start
```

3. Acesse o sistema em seu navegador: [http://localhost:3001](http://localhost:3001)

## API

### Cadastrar Produto

- **URL:** `/produtos`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
  {
    "nome": "Nome do Produto",
    "preco": 10.99,
    "quantidade": 20,
    "foto": "https://example.com/foto.jpg",
    "descricao": "Descrição do Produto",
    "status": "active"
  }
  ```
- **Resposta de Sucesso:** Status 201 (Created) e o objeto do produto criado.

### Editar Produto

- **URL:** `/produtos/:id`
- **Método:** `PUT`
- **Parâmetros da URL:** `id` (ID do produto a ser editado)
- **Corpo da Requisição:** Os campos a serem atualizados do produto.
- **Resposta de Sucesso:** Objeto do produto atualizado.

### Excluir Produto

- **URL:** `/produtos/:id`
- **Método:** `DELETE`
- **Parâmetros da URL:** `id` (ID do produto a ser excluído)
- **Resposta de Sucesso:** Status 200 (OK) e mensagem de confirmação.

### Listar Produtos

- **URL:** `/produtos`
- **Método:** `GET`
- **Resposta de Sucesso:** Lista de todos os produtos cadastrados.