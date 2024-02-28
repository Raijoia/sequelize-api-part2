const Op = require('sequelize').Op;

const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');

const cursoServices = new CursoServices();

class CursoController extends Controller {
  constructor() {
    super(cursoServices);
  }

  async pegaCursos(req, res) {
    const { data_inicial, data_final } = req.query;

    const where = {};

    // se existir params, cirar uma prop {}
    data_inicial || data_final ? where.data_inicio = {} : null;

    // se existir data_inicial, adicionar a propriedade gte
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;

    // se existir data_final, adicionar a propriedade lte
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      const listaCursos = await cursoServices.pegaTodosOsRegistros(where);
      return res.status(200).json(listaCursos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CursoController;
