//Importando todas as libs que serao usadas na api
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

/*
Classe: middlewares
Funcionalidade: Carregar e injetar todas as libs que serao usadas na API

*/
class middlewares{

	constructor(app)
	{
		this.loadMiddlewares(app);
	}

	/*
	Metodo: loadMiddlewares
	Funcionalidade: Realizar o uso de todos os middlewares que serao usados na API
	Parametros: app (Object express) -> Uma instancia do app do express
	TODO: Mover para um arquivo separado, dependendo do tamanho da aplicacao pode
	acabar poluindo a classe com o numero de configuracoes
	*/
	loadMiddlewares(app)
	{
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(cors());
		app.use(helmet());
		app.use(morgan('tiny'));
	}

}

module.exports = middlewares;