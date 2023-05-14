import { getWords } from './static/main.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 3000;
const router = express.Router();

//app.use('/static', ))
app.use(express.static(path.join(__dirname, 'static')))

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/express/index.html')) 
})
 
router.post('/words', getWords)

// add the router
app.use('/', router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})