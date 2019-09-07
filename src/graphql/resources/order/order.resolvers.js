"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var OrderModel_1 = require("../../../models/OrderModel");
var OrderItemModel_1 = require("../../../models/OrderItemModel");
var composable_resolver_1 = require("../../../composables/composable.resolver");
var auth_resolver_1 = require("../../../composables/auth.resolver");
var verify_token_resolver_1 = require("../../../composables/verify-token.resolver");
var must_be_client_resolver_1 = require("../../../composables/must-be-client.resolver");
exports.orderResolver = {
    Order: {
        restaurant: function (order, args, _a) {
            var restaurantLoader = _a.dataLoaders.restaurantLoader;
            return restaurantLoader.load(order.restaurantId);
        },
        table: function (order, args, _a) {
            var db = _a.db;
            return db.Table.findById(order.tableId);
        },
        orderItems: function (order, args, _a) {
            var db = _a.db;
            return db.OrderItem.findAll({
                where: {
                    orderId: order.id
                }
            });
        },
        client: function (order, args, _a) {
            var db = _a.db;
            return db.Client.findById(order.clientId);
        }
    },
    Mutation: {
        closeOrder: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver, must_be_client_resolver_1.mustBeClient)(function (parent, args, _a, info) {
            var entityAuthenticated = _a.entityAuthenticated, db = _a.db;
            return __awaiter(_this, void 0, void 0, function () {
                var orderId, order, canNotFinish, totalPrice;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            orderId = entityAuthenticated.order;
                            return [4 /*yield*/, db.Order.find({
                                    where: {
                                        id: orderId
                                    },
                                    include: [
                                        {
                                            model: db.OrderItem,
                                            where: {
                                                orderId: orderId
                                            },
                                            as: 'orderItems',
                                            include: [
                                                {
                                                    model: db.Item,
                                                    as: 'item'
                                                }
                                            ]
                                        }
                                    ]
                                })];
                        case 1:
                            order = _b.sent();
                            if (!order)
                                throw new Error('Order not found');
                            if (!order.orderItems.length)
                                throw new Error('Do not have items in this order');
                            canNotFinish = order.orderItems.some((function (value) {
                                return [
                                    OrderItemModel_1.OrderItemStatusEnum.PENDING,
                                    OrderItemModel_1.OrderItemStatusEnum.DOING,
                                    OrderItemModel_1.OrderItemStatusEnum.DONE,
                                ]
                                    .includes(value.status);
                            }));
                            if (canNotFinish)
                                throw new Error('Can not finish this order because exist items pending');
                            totalPrice = order.orderItems.reduce((function (previousValue, currentValue) { return currentValue.item.amount + previousValue; }), 0.00);
                            // update order with total price, change status to finish
                            return [2 /*return*/, order.updateAttributes({
                                    status: OrderModel_1.OrderStatusEnum.FINISH,
                                    amount: totalPrice
                                })];
                    }
                });
            });
        })
    }
};
