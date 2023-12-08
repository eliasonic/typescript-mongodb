import { Express } from "express"
import * as userController from './controllers/user.controller'

const routes = (app: Express) => {
    // @route    GET
    // @desc     Get all users
    // @access   Private
    app.get('/api/users', userController.get)
}

export default routes