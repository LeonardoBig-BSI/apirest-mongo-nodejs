
const router = require('express').Router();
const Person = require('../models/Person')

// Create - criação de dados
router.post('/', async (req, res) => {

    // extrair toda a informação do "req.body" -> { name: "Leo", salary: 5000, approved: false }
    const { name, salary, approved } = req.body;

    if(!name)
    {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return;
    }

    const person = {
        name,
        salary,
        approved
    }

    // criar dados no sistema
    try {

        await Person.create(person);

        res.status(201).json( {message: 'Pessoa inserida no sistema com sucesso!' });

    }
    catch(error) 
    { res.status(500).json( {error: error }) }
})

// Read - leitura de dados
router.get('/', async (req, res) => {

    try {

        const people = await Person.find(); // await - esperar que todos
                                            // dados já tenham para depois
                                            // trazer eles para a resposta
       
        res.status(200).json(people)

    }
    catch(error)
    { res.status(500).json( {error: error }) }

})

router.get('/:id', async (req, res) => {

    // extrair dados da requisição pela URL
    const id = req.params.id;

    try {

        const person = await Person.findOne({ _id: id })

        if(!person)
        {
            res.status(422).json({ message: 'O usuário não foi encontrado!' })
            return;
        }

        res.status(200).json(person);

    }
    catch(error)
    { res.status(500).json( {error: error }) }

})

// Update - Atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id;
    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved,
    }

    try {

        const updatedPerson = await Person.updateOne({ _id: id }, person);
        
        if(updatedPerson.matchedCount === 0)
        {
            res.status(422).json({ message: 'O usuário não foi encontrado!' })
            return;
        }

        res.status(200).json(person); // envia o "person" porque ele vai estar
                                      // igualzinho ao "updatedPerson"

    }
    catch(error)
    { res.status(500).json( {error: error }) }

})

// Delete - remover dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id;
        
    const person = await Person.findOne({ _id: id })

    if(!person)
    {
        res.status(422).json({ message: 'O usuário não foi encontrado!' })
        return;
    }

    try {

        await Person.deleteOne({ _id: id })
        res.status(200).json({ message: 'O usuário foi removido com sucesso!' });
        
    }
    catch(error)
    { res.status(500).json( {error: error }) }

})

module.exports = router;