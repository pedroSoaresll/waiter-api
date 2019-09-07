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
var composable_resolver_1 = require("../../../composables/composable.resolver");
var auth_resolver_1 = require("../../../composables/auth.resolver");
var verify_token_resolver_1 = require("../../../composables/verify-token.resolver");
var must_be_client_resolver_1 = require("../../../composables/must-be-client.resolver");
var OrderItemModel_1 = require("../../../models/OrderItemModel");
var must_be_collaborator_resolver_1 = require("../../../composables/must-be-collaborator.resolver");
var orderItem_subscriptions_1 = require("./orderItem.subscriptions");
exports.orderItemResolver = {
    OrderItem: {
        order: function (OrderItem, args, _a, info) {
            var db = _a.db;
            return db.Order.findById(OrderItem.orderId);
        },
        item: function (OrderItem, args, _a, info) {
            var db = _a.db;
            return db.Item.findById(OrderItem.itemId);
        }
    },
    Query: {
        order: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver, must_be_client_resolver_1.mustBeClient)(function (parent, args, _a) {
            var entityAuthenticated = _a.entityAuthenticated, db = _a.db;
            return __awaiter(_this, void 0, void 0, function () {
                var clientEntityAuth, order;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            clientEntityAuth = entityAuthenticated;
                            return [4 /*yield*/, db.Order.findById(clientEntityAuth.order)];
                        case 1:
                            order = _b.sent();
                            // check if client has order
                            if (!order)
                                throw new Error('Order not found');
                            // return order
                            return [2 /*return*/, order];
                    }
                });
            });
        })
    },
    Mutation: {
        createOrderItem: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver, must_be_client_resolver_1.mustBeClient)(function (parent, _a, _b) {
            var input = _a.input;
            var db = _b.db, entityAuthenticated = _b.entityAuthenticated;
            return __awaiter(_this, void 0, void 0, function () {
                var itemId, orderId, order;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            itemId = input.itemId;
                            orderId = entityAuthenticated.order;
                            return [4 /*yield*/, db.Order.findById(orderId)];
                        case 1:
                            order = _c.sent();
                            if (!order)
                                throw new Error('Order not found');
                            return [4 /*yield*/, db.OrderItem.create({
                                    orderId: orderId,
                                    itemId: itemId,
                                    status: OrderItemModel_1.OrderItemStatusEnum.PENDING
                                })];
                        case 2: 
                        // todo: check if item exist
                        // todo: check if item belongs to restaurant
                        // create a new item only if order is different of finish
                        return [2 /*return*/, _c.sent()];
                    }
                });
            });
        }),
        removeOrderItem: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver, must_be_client_resolver_1.mustBeClient)(function (parent, _a, _b) {
            var input = _a.input;
            var db = _b.db, entityAuthenticated = _b.entityAuthenticated;
            return __awaiter(_this, void 0, void 0, function () {
                var orderItemId, orderId, order, orderItem;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            orderItemId = input.orderItemId;
                            orderId = entityAuthenticated.order;
                            return [4 /*yield*/, db.Order.findById(orderId)];
                        case 1:
                            order = _c.sent();
                            if (!order)
                                throw new Error('Order not found');
                            return [4 /*yield*/, db.OrderItem.findById(orderItemId)];
                        case 2:
                            orderItem = _c.sent();
                            if (!orderItem)
                                throw new Error('OrderItem not found');
                            // remove order item
                            return [2 /*return*/, db.OrderItem.prototype.remove(orderItem)];
                    }
                });
            });
        }),
        doingOrderItem: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver, must_be_collaborator_resolver_1.mustBeCollaborator)(function (parent, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(_this, void 0, void 0, function () {
                var param, orderItem, orderItemUpdated;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            param = input;
                            return [4 /*yield*/, db.OrderItem.findById(param.orderItemId)];
                        case 1:
                            orderItem = _c.sent();
                            if (!orderItem)
                                throw new Error('OrderItem not found');
                            return [4 /*yield*/, db.OrderItem.prototype.doing(orderItem)];
                        case 2:
                            orderItemUpdated = _c.sent();
                            orderItem_subscriptions_1.subscriptionStatusChanged(orderItem);
                            return [2 /*return*/, orderItemUpdated];
                    }
                });
            });
        }),
        doneOrderItem: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver, must_be_collaborator_resolver_1.mustBeCollaborator)(function (parent, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(_this, void 0, void 0, function () {
                var param, orderItem, orderItemUpdated;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            param = input;
                            return [4 /*yield*/, db.OrderItem.findById(param.orderItemId)];
                        case 1:
                            orderItem = _c.sent();
                            if (!orderItem)
                                throw new Error('OrderItem not found');
                            return [4 /*yield*/, db.OrderItem.prototype.doing(orderItem)];
                        case 2:
                            orderItemUpdated = _c.sent();
                            orderItem_subscriptions_1.subscriptionStatusChanged(orderItem);
                            return [2 /*return*/, orderItemUpdated];
                    }
                });
            });
        }),
        deliveredOrderItem: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver, must_be_collaborator_resolver_1.mustBeCollaborator)(function (parent, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(_this, void 0, void 0, function () {
                var param, orderItem, orderItemUpdated;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            param = input;
                            return [4 /*yield*/, db.OrderItem.findById(param.orderItemId)];
                        case 1:
                            orderItem = _c.sent();
                            if (!orderItem)
                                throw new Error('OrderItem not found');
                            return [4 /*yield*/, db.OrderItem.prototype.delivered(orderItem)];
                        case 2:
                            orderItemUpdated = _c.sent();
                            // emit on graphql subscriptions that OrderItem was updated
                            orderItem_subscriptions_1.subscriptionStatusChanged(orderItem);
                            return [2 /*return*/, orderItemUpdated];
                    }
                });
            });
        })
    },
    Subscription: {
        orderItemStatusUpdated: {
            subscribe: orderItem_subscriptions_1.subscribes.statusUpdated
        }
    }
};
