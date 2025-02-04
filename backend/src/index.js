import exporess from 'express';
import { config } from 'dotenv';

config();

const app = exporess();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
