// importações das bibliotecas. 
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

// variaveis de ultilização das bibliotecas 
const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors('/'))


//Adcionar ao banco de dados
app.post('/users', async (req, res) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }

     })

       
    res.status(201).json(req.body)
    
} )


// consultar todos os cadastros
app.get('/users', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)

})


// editar um cadastros especifico
app.put('/users/:id', async (req, res) => {
    await prisma.user.update({ 
        where: {

            id: req.params.id
        },
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }

     })

     res.status(200).json({message: 'editado com sucesso'})

} )


// delterar um cadastros especifico
app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete ({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: 'deletado com sucesso'})
})


// porta na qual esta rodadndo
app.listen(3000)