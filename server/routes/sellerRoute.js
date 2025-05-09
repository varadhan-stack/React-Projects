import express from 'express';
import { sellerLogin, isSellerAuth, sellerLogout } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin)
sellerRouter.post('/is-auth', authSeller, isSellerAuth)
sellerRouter.post('/login', sellerLogin)
sellerRouter.post('/login', sellerLogout)

export default sellerRouter;