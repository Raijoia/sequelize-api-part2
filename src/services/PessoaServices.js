const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
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
}

module.exports = PessoaServices;
