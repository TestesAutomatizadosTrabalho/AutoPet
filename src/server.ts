import express, { json } from 'express';

const app = express();

app.get('/teste', () => {
    console.log('chegou uma chamana no endpoint /teste');
});

app.use(json);

app.listen(3000, () => {
    console.log('servidor ligado');
});

