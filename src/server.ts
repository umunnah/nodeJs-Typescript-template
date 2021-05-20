import 'reflect-metadata';
import app from "./bootstrap/app";
import { config } from "dotenv";

const port = process.env.PORT || 3000;


(async () => {
	app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
  });
	process.on("unhandledRejection", (reason, p) => {
		console.error("Unhandled Rejection at:", p, "reason:", reason);
	});
})();