import express, {Application} from 'express';
import { config as dotenvConfig } from 'dotenv';
import StudentRouter from './src/route/studentRouter';

dotenvConfig();

const app : Application = express();

// Convert JSON into JavaScript object
app.use(express.json());

app.use("/src", StudentRouter);

// Server check
app.listen(3000, () => {
  console.log("Server up and running ON PORT", 3000);
});
