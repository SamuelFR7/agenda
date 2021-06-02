// import api from '../../services/api'
const api = require('../../services/api')
    
async function getPeople(){
    const response = await api.get('/')
    const data = response.data
    return data
}

console.log(await getPeople())
