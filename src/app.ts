import express from 'express';
import 'dotenv/config'
import { envs } from './config/envs.plugin';
import { MongoDatabase } from './data/init';
import { AppRoutes } from './controllers/routes2';
import { emailJob } from './domain/jobs/emailJob';

const app= express();

app.use(express.json());
app.use(AppRoutes.routes);

(async()=>
   await MongoDatabase.connect({
    dbName: "MonkeyPoxCasesAPI",
    mongoUrl: envs.MONGO_URL ?? ""
}))();

app.listen(3001, ()=>{
    console.log("El servidor está corriendo correctamente.");
    emailJob();
})