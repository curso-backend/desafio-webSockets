const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.archivo = nombreArchivo
        this.data = []

        try {
            console.log('Initializing...')
            this.init()
        }
        catch(error) {
            console.log(`Error Initializing ${error}`)
        }
    }

    async init() {
        this.data = await this.getAll()
    }

    async save(objeto) {
        try {
            await this.init()
            objeto = {...objeto, id: this.data.length + 1}
            console.log(this.data)
            this.data.push(objeto)
            await fs.promises.appendFile(this.archivo, JSON.stringify(objeto) + '\n')
            return objeto.id
        }
        catch (error) {
            console.log(error)
        }
    }
    async getAll() {
        try {
            let objetosJSON = await fs.promises.readFile(this.archivo, 'utf-8')
            let objSwap = objetosJSON.split('\n').filter(obj => obj != '')
            let objetos = objSwap.map(obj => JSON.parse(obj))
            return objetos
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor