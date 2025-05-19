"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
// Import das categorias
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
// Import das Order
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrdersController_1 = require("./controllers/order/ListOrdersController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
/* import { FinishOrderController } from './controllers/order/' */
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const router = (0, express_1.Router)();
exports.router = router;
//const upload = multer(uploadConfig.upload("./tmp"));
//rotas de usuários
router.post("/users", new CreateUserController_1.CreateUserController().handle); //Cria user
router.post('/session', new AuthUserController_1.AuthUserController().handle); //Login
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle); //Pesquisa User
//Rotas de categoria
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle); //Cria categoria
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle); //Pesquisa por categoria
//Rotas de Produtos
//router.post('/product', isAuthenticated, new CreateProductController().handle) // Cria produto
/* router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle) */ // Cria produto //estava sendo utilizado localmente
router.get('/category/products', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle); //Lista produtos por categoria
//Rotas de Order
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle); //Cria ordem de serviço
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle); //Adicionar itens
router.delete('/order', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle); //delete user
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle); //delete itens dos pedidos
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle); //alrera status do pedido false/true /tirar o rascunho
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle); //Lista todas as ordem de serviço
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle); //detalhes das ordende servico
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle); //Finaliza a ordem de servico
