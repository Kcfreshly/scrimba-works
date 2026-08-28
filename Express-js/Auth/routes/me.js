import express from 'express'
import { getcurrentUser } from '../controllers/meController.js'

export const meRouter = express.Router()

meRouter.get('/', getcurrentUser)