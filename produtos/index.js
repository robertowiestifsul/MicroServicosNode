const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getProdutos = (request, response) => {
    pool.query('SELECT * FROM produtos', (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

const addProduto = (request, response) => {
    const { nome, preco, estoque } = request.body

    pool.query(
        'INSERT INTO produtos (nome, preco, estoque) VALUES ($1, $2, $3)',
        [nome, preco, estoque],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Produto criado.' })
        },
    )
}

const updateProduto = (request, response) => {
    const { codigo, nome, preco, estoque } = request.body
    pool.query('UPDATE produtos set nome=$1, preco=$2, estoque=$3 where codigo=$4',
        [nome, preco, estoque, codigo], error => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Produto atualizado.' })
        })
}

const deleteProduto = (request, response) => {    
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM produtos where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(201).json({ status: 'success', message: 'Produto apagado.' })
    })
}

const getProdutoPorID = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM produtos where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/produtos')
    // GET endpoint
    .get(getProdutos)
    // POST endpoint
    .post(addProduto)
    // PUT
    .put(updateProduto)  

app.route('/produtos/:id')
    .get(getProdutoPorID) 
    .delete(deleteProduto) 


// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Servidor rodando na porta 3002`)
})