const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
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
app.get('/filmes', (req, res) => res.send(filmes))

//Access Point to send new movies
app.post('/filmes', (req, res) => {
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    const filme = {titulo: titulo, sinopse: sinopse};
    filmes.push(filme)
    //só para ter certeza
    res.send(filmes)
})

app.listen(3000, () => console.log("app up & running"))