import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Produto extends Model {
  public id!: number;
  public nome?: string;
  public descricao?: string;
  public preco?: number;
  public quantidade?: number;
  public imagem?: string;
  public status?: string;
}

Produto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "O nome não pode estar vazio",
        },
        len: {
          args: [0, 50],
          msg: "O nome deve conter no máximo 50 caracteres",
        },
      },
    },
    preco: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        min: {
          args: [0],
          msg: "O preço não pode ser menor que 0.",
        },
      },
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [1],
          msg: "A quantidade deve ser maior que 0.",
        },
      },
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 150],
          msg: "A descrição deve conter no máximo 150 caracteres",
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["active", "inactive"]],
          msg: "O status deve ser active ou inactive",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Produto",
    tableName: "produto",
    timestamps: false,
  },
);

export default Produto;
