const dataSource = require('../database/models');
const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
    this.matriculaServices = new Services('Matricula');
  }

  async pegaPessoasEscopoTodos() {
    const listaPessoas = await super.pegaRegistroPorEscopo('todosOsRegistros');

    return listaPessoas;
  }

  async pegaPessoasEscopoDesativados() {
    const listaPessoas = await super.pegaRegistroPorEscopo('desativados');

    return listaPessoas;
  }

  async pegaMatriculasAtivasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async pegaTodasMatriculasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }

  async cancelaPessoaEMatriculas(estudandeId) {
    return dataSource.sequelize.transaction(async (transaction) => {
      await super.atualizaRegistro({ ativo: false }, { id: estudandeId }, transaction);
      await this.matriculaServices.atualizaRegistro({ status: 'cancelado' }, { estudante_id: estudandeId }, transaction);
    });
  }
}

module.exports = PessoaServices;
