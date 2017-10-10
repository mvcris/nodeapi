//Importando todas as libs que serao usadas na api
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');

//Importando models do sequelize
const models = require('../models');

//Carregando objeto com parametros de configuracoes
const config = require('../config/config');


class boot{

	constructor(app)
	{
		this.loadMiddlewares(app);
		this.listenApp(app);
		this.loadRoutes(app);
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
		app.use(morgan('tiny'))
	}

	/*
	Metodo: loadRoutes
	Funcionalidade: Realizar o autoload de todas as routes da API
	Parametros: app (Object express) -> Uma instancia do app do express
	*/
	loadRoutes(app)
	{
		fs.readdirSync('./app/routes/').forEach(file => {
			let newFileName = file.replace('.js', '');
			let fileRequire = require('../routes/'+newFileName);
			let routeName = newFileName.replace('Router', '');
			if(routeName == 'home'){
				app.use('/', fileRequire);
			}else{
				app.use('/'+routeName, fileRequire);
			}
		})
	}

	/*
	Metodo: listenApp
	Funcionalidade: Fazer a API ficar escutando na porta 3000
	Parametros: app (Object express) -> Uma instancia do app do express
	*/
	listenApp(app)
	{
		//Quando estabalecer uma conexao com o mysql sincronizar as tabelas antes de iniciar o servidor
		models.sequelize.sync().then(() => {
			app.listen(config.api.port, () => {
				console.log('Servidor online na porta 3000');
			})
		})
	}

}

//Exportando a classe de boot
module.exports = boot;