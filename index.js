
// Configuração Inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express(); // inicializa o express

// Forma de ler JSON - middewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json()); // aqui o express consegue enviar em JSON pra resposta da aplicação

// Rotas da API
const personRoutes = require('./routes/PersonRoutes');

app.use('/person', personRoutes);

// Rota inicial / endpoint
app.get('/', (req, res) => {

    res.json({ message: 'Oi Express' }); // a resposta vai ser em JSON        

})

// Entregar uma porta
DB_USER = process.env.DB_USER;
DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ytaazkq.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(3000);

    })
    .catch((errr) => {console.log(err)})