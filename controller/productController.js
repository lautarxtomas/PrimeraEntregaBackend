import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseProducts = path.join(__dirname, '../database/products.json')
const administrador = true;

const readFile = async(file) => {
    try {
        const data = await fs.promises.readFile(file, 'utf-8', (err, data) => {
            if(err) throw err
            return data;
        })
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error: ${error}`)        
    }
}

const getMaxId = async() => {
    try {
        const databaseData = await readFile(databaseProducts);
        const ids = databaseData.map(item => item.id);
        if (ids.length === 0){
            return 0;
        }
        return Math.max(...ids);
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const getProductById = async(req, res) => {
    const {id} = req.params;
    try {
        const databaseData = await readFile(databaseProducts);
        if(!id){
            res.send(databaseData)
        } else{
            const info = databaseData.find(product => product.id == id)
            if (info){
                res.send(info)
            }else{
                res.status(400).json({error: 'producto no encontrado'})
            }
        }
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const saveProduct = async(req, res) => {
    if(administrador == true){
        const {name, price, image, description, code, stock} = req.body
        if(!name || !price || !image || !description || !code || !stock){
            res.status(400).json({error: 'Por favor ingrese todos los datos'})
        } else {
            const product = req.body
            try {
                const databaseData = await readFile(databaseProducts)
                product.id = await getMaxId() + 1
                product.timestamp = Date.now()
                databaseData.push(product)
                await fs.promises.writeFile(databaseProducts, JSON.stringify(databaseData, null, 2), err => {
                    if(err) throw err
                })
                res.status(200).json({message: 'producto agregado!'})
            } catch (error) {
                console.error(`Error: ${error}`)
            }
        }
    } else {
        res.status(400).json({message: 'Usted necesita permisos de administrador para continuar.'});
    }
}

// modifyProduct = (req, res) => {
//     const { id } = req.params
//     const product = req.body
//     product.id = id
//     this.products.splice(parseInt(id - 1), 1, product)
//     res.send({ modifiedProduct: product })
// }

const updateProductById = async(req, res) => {
    if(administrador == true){
        const {id} = req.params
        const {name, price, image, description, code, stock} = req.body

        if(!name||!price||!image||!description||!code||!stock){
            res.status(400).json({error: 'Por favor ingrese todos los datos'})
        } else {
            try {
                const databaseData = await readFile(databaseProducts)
                let wasUpdated = false;
                for(let index = 0; index < databaseData.length; index++){
                    if(databaseData[index].id == id){
                        databaseData[index].name = name
                        databaseData[index].price = price
                        databaseData[index].image = image
                        databaseData[index].description = description
                        databaseData[index].code = code
                        databaseData[index].stock = stock
                        databaseData[index].timestamp = Date.now()
                        wasUpdated = true
                        break
                    }
                }
                if(wasUpdated){
                    await fs.promises.writeFile(databaseProducts, JSON.stringify(databaseData, null, 2), err => {
                        if(err) throw err
                    })
                    res.status(200).json({message: 'producto actualizado!'})
                } else {
                    res.status(400).json({error: 'Producto no encontrado'})
                }
            } catch (error) {
                console.error(`Error: ${error}`)
            }
        }
    } else {
        res.status(400).json({message: 'Usted necesita permisos de administrador para continuar.'})
    }
}

const deleteProductById = async(req, res) => {
    if(administrador == true){
        const {id} = req.params
        try {
            const databaseData = await readFile(databaseProducts)
            const index = databaseData.findIndex(product => product.id == id)
            if(index != -1){
                databaseData.splice(index, 1)
                await fs.promises.writeFile(databaseProducts, JSON.stringify(databaseData, null, 2), err => {
                    if(err) throw err
                })
                res.status(200).json({message: 'Producto borrado!'})
            } else {
                res.status(400).json({error: 'Producto no encontrado'})
            }
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    } else {
        res.status(400).json({message: 'Usted necesita permisos de administrador para continuar.'})
    }
}

export const productController = {
    getProductById, saveProduct, deleteProductById, updateProductById
}