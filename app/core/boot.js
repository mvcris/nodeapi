//Importando arquivos que serao necessarios para funcionalidade do boot
const Middelwares = require('./middlewares');
const fs = require('fs');

//Importando models do sequelize
const models = require('../models');

//Carregando objeto com parametros de configuracoes
const config = require('../config/config');

/*
Classe: boot
Funcionalidade: Realizar a inicializacao da api carregando todas suas configuracoes
*/
class boot extends Middelwares{

	constructor(app)
	{
		super(app);
		this.listenApp(app);
		this.loadRoutes(app);
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
				console.log('Servidor online na porta '+config.api.port);
			})
		})
	}

}

//Exportando a classe de boot
module.exports = boot;