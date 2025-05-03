import { Router }from 'express';
import multer from 'multer';

import {CreateUserController} from './controllers/user/CreateUserController'    
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated';
// Import das categorias

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController';

// Import dos Produtos

import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

// Import das Order
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { AddItemController } from './controllers/order/AddItemController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { RemoveItemController } from './controllers/order/RemoveItemController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { ListOrdersController } from './controllers/order/ListOrdersController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
/* import { FinishOrderController } from './controllers/order/' */
import { FinishOrderController } from './controllers/order/FinishOrderController'


import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));



//rotas de usuários

router.post("/users", new CreateUserController().handle) //Cria user

router.post('/session', new AuthUserController().handle) //Login

router.get('/me', isAuthenticated, new DetailUserController().handle) //Pesquisa User


//Rotas de categoria

router.post('/category', isAuthenticated, new CreateCategoryController().handle)  //Cria categoria

router.get('/category', isAuthenticated, new ListCategoryController().handle) //Pesquisa por categoria

//Rotas de Produtos
router.post('/product', isAuthenticated, new CreateProductController().handle) // Cria produto

/* router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle) */ // Cria produto //estava sendo utilizado localmente

router.get('/category/products', isAuthenticated, new ListByCategoryController().handle) //Lista produtos por categoria

//Rotas de Order
router.post('/order', isAuthenticated, new CreateOrderController().handle)  //Cria ordem de serviço

router.post('/order/add', isAuthenticated, new AddItemController().handle)  //Adicionar itens

router.delete('/order', isAuthenticated, new RemoveOrderController().handle)  //delete user

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)  //delete itens dos pedidos

router.put('/order/send', isAuthenticated, new SendOrderController().handle)  //alrera status do pedido false/true /tirar o rascunho

router.get('/orders', isAuthenticated, new ListOrdersController().handle)  //Lista todas as ordem de serviço

router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)  //detalhes das ordende servico

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle) //Finaliza a ordem de servico






export {router};