import { Express } from "express"
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "./controllers/productController"
import { requireUser } from "./middlewares/requireUser"
import { createUser } from "./controllers/userController"
import { createSession, getSessions, deleteSession } from "./controllers/sessionController"

const routes = (app: Express) => {
    app.post('/users', createUser)

    app.post('/sessions', createSession)

    app.get('/sessions', requireUser, getSessions)

    app.delete('/sessions', requireUser, deleteSession)

    // @route    POST
    // @desc     Create a product
    // @access   Private
    app.post('/products', requireUser, createProduct)

    app.get('/products', getProducts)

    app.get('/products/:id', getProductById)

    app.put('/products/:id', requireUser, updateProduct)

    app.delete('/products/:id', requireUser, deleteProduct)

}

export default routes