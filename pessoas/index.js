const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getPessoas = (request, response, next) => {
    pool.query('SELECT * FROM pessoas', (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

const addPessoa = (request, response, next) => {
    const { nome } = request.body

    pool.query(
        'INSERT INTO pessoas (nome) VALUES ($1)',
        [nome],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Pessoa criada.' })
        },
    )
}

const updatePessoa = (request, response, next) => {
    const { codigo, nome } = request.body
    pool.query('UPDATE pessoas set nome=$1 where codigo=$2',
        [nome, codigo], error => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Pessoa atualizada.' })
        })
}

const deletePessoa = (request, response, next) => {    
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM pessoas where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(201).json({ status: 'success', message: 'Pessoa apagada.' })
    })
}

const getPessoaPorID = (request, response, next) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM pessoas where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/pessoas')
    // GET endpoint
    .get(getPessoas)
    // POST endpoint
    .post(addPessoa)
    // PUT
    .put(updatePessoa)  

app.route('/pessoas/:id')
    .get(getPessoaPorID) 
    .delete(deletePessoa) 


// Start server
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando nas porta 3003`)
})