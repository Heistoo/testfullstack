//protocolo + servidor + porta + acesso
const protocolo = 'http://'
const host = 'localhost:3000'
const EndPoint = '/filmes'

async function obterFilmes(){
    const URLcompleta = `${protocolo}${host}${EndPoint}`
    const filmes = (await axios.get(URLcompleta)).data
    console.log(filmes)
}