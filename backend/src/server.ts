import fastify from "fastify";
import sequelize from "./config/database";
import produtoRoutes from "./routes/produtoRoutes";
import cors from "@fastify/cors";

const startServer = async () => {
  try {
    const app = fastify();

    await app.register(cors, {
      origin: true,
    });
    
    produtoRoutes(app);

    await app.listen({ port: 3000 });
    console.log("Servidor iniciado em http://localhost:3000");
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
};

// Sincroniza os modelos com o banco de dados
async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    await sequelize.sync(); // Sincroniza todos os modelos com o banco de dados
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

// Inicializa o servidor apenas após sincronizar os modelos com o banco de dados
syncDatabase().then(() => {
  startServer();
});
