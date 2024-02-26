'use strict';
const isValid = require('../../utils/validatorCpfHelper');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id',
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        // scope: { status: 'matriculado' },
        as: 'aulasMatriculadas',
      });
    }
  }
  Pessoa.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 255],
            msg: 'O campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'O campo de email deve ser um email válido',
          },
        },
      },
      cpf: {
        type: DataTypes.STRING,
        validate: {
          validatorCPF: (cpf) => {
            if (!isValid(cpf)) throw new Error('CPF inválido');
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Pessoa',
      tableName: 'pessoas',
      paranoid: true,
      defaultScope: {
        where: {
          ativo: true,
        },
      },
      scopes: {
        todosOsRegistros: {
          where: {},
        },
        desativados: {
          where: {
            ativo: false,
          },
        },
      },
    }
  );
  return Pessoa;
};
