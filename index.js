/*class persona {

    constructor(nombre, apellido, mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = mascotas;
    }

    getFullName() {
      return (`Hola a todos , soy ${this.nombre} ${this.apellido} , un gusto!`);
    }

    addPets(nombre) {
        this.mascotas.push(nombre)
     }

    countPets() {
      return `${this.nombre} tiene ${this.mascotas.length} mascotas`
    }
}

const perris = [{
    nombre:'pipi',
    raza:'galgo'
},
{
    nombre:'lola',
    raza:'mestizo'
},
{
    nombre:'kevin',
    raza:'felino'
}]

const usuario = new persona("emiliano", "martinez");

const addPet = new persona(perris);

addPet.addPets();
usuario.addPets("pipi");
usuario.addPets("lola");
usuario.addPets("kevin")
usuario.countPets()

usuario.getFullName()
console.log(usuario.getFullName());
console.log(usuario.countPets());
console.log(addPet);*/


const fs = require('fs')

class Contenedor{
    constructor(archive){
        this.archive= archive;
        this.products = [];
    }

    async read(){
        try{
            let dB = await fs.promises.readFile(this.archive, 'utf-8')
            return dB
        }catch(e){
            console.log("error")
        }
    }

    getId(){
        const length = this.products.length
        if(length < 1) return 0
        return this.products[this.products.length - 1].id
    } 

    async save(product){
        const id = this.getId()
        this.products.push({
            ...product, ...{id: id + 1}
        })
        try{
            await  fs.promises.writeFile(this.archive, JSON.stringify(this.products, null, 4))
        }catch(e){
            console.error("No se pudo guardar" + e)
        }
    }

    getById(id){
        let resultId = this.products.find(prod => prod.id == id)
        return resultId
    }

    async getAll(){
        return this.products
    }

    deleteById(id){
        const index = this.products.findIndex(prod => prod.id == id)
        this.products.splice(index, 1)
    }

    async deleteAll(){
        await fs.promises.writeFile(this.archive, "[]")
    }

}

const contenedor = new Contenedor("products.txt")

contenedor.save({"name": "emiliano", "edad": 28 })
contenedor.save({"name": "lucas", "edad": 29 })
contenedor.save({"name": "peloncha", "edad": 22 })
console.log(contenedor.getById(2))
//console.log(contenedor.getAll())
//contenedor.deleteAll()