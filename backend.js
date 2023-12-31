const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const mongooseUniqueValidator = require("mongoose-unique-validator")
app.use(express.json())
app.use(cors())

const Filme = mongoose.model( "Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse:{type: String}
}))

const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false}
})
usuarioSchema.plugin(mongooseUniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema);

async function conectarMongo() {
    mongoose.connect(`mongodb+srv://gabe_ss:batata123@cluster0.2qfqe0p.mongodb.net/?retryWrites=true&w=majority`);
}
let filmes = [
    {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse: "Quarenta anos da história dos EstadosUnidos, vistos pelos olhos de Forrest Gump (Tom Hanks),um rapaz com QI abaixo da média e boas intenções."
    },
    {
    titulo: "Um Sonho de Liberdade",
    sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]
// Access Point "get"
app.get('/acesso', (req, res) => res.send('acesso'))

// Access Point to consult "movies list"
app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

//Access Point to send new movies
app.post('/filmes', async (req, res) => {
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    await filme.save()
    
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post('/signup', async (req, res) => {
    try{
    const login = req.body.login
    const password = req.body.password
    const criptografada = await bcrypt.hash(password, 10)
    const usuario = new Usuario({login: login, password: criptografada})
    const respostaMongo = await usuario.save()
    console.log(respostaMongo)
    res.status(201).end()
    }
    catch (e){
        console.log(e)
        res.status(409).end()
    }
})

app.listen(3000, () => {
    try {
    conectarMongo();
    console.log("Connection OK, app up & running")
    }
    catch (e){
        console.log("Error: ", e);
    }
    });