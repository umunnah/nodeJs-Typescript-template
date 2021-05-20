import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
// import helmet from 'helmet'; 
import db from '../app/models';
import ErrorHandler from '../app/exceptions';
import routes from '../routes';



class App {
  public app: express.Application;

  constructor() {
		this.app = express();

		this.setup();
		this.database();
		this.authentication();
		this.routers();
	}

	setup() {
		// this.app.use(helmet());
		this.app.use(express.json());
		this.app.use(express.urlencoded({extended:true}));
		this.app.use(cors());
	}

	async database() {
    await db.sequelize.sync({logging: false});
	}

	routers() {
		this.app.use("/api/v1",routes);

		this.app.use(ErrorHandler);
	}

	authentication() {}
}

export default new App().app;