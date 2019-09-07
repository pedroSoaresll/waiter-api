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
var jsonwebtoken_1 = require("jsonwebtoken");
var utils_1 = require("../../../utils/utils");
var logger_1 = require("../../../utils/logger");
var CollaboratorModel_1 = require("../../../models/CollaboratorModel");
var RestaurantModel_1 = require("../../../models/RestaurantModel");
var TableModel_1 = require("../../../models/TableModel");
var OrderModel_1 = require("../../../models/OrderModel");
var logger = logger_1["default"]('GRAPHQL:TOKEN:RESOLVER');
exports.tokenResolvers = {
    Mutation: {
        createTokenToCollaborator: function (parent, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, db.Collaborator.findOne({
                            where: {
                                email: input.email,
                                status: CollaboratorModel_1.CollaboratorStatusEnum.ACTIVE
                            },
                            attributes: ['id', 'password'],
                            include: [
                                {
                                    model: db.CollaboratorAccess,
                                    as: 'collaboratorsAccess',
                                    attributes: ['id', 'accessType'],
                                    include: [
                                        {
                                            model: db.Restaurant,
                                            as: 'restaurant',
                                            where: {
                                                name: input.restaurantName,
                                                status: RestaurantModel_1.RestaurantStatusEnum.ACTIVE
                                            },
                                            attributes: ['id']
                                        }
                                    ]
                                },
                            ]
                        })
                            .then(function (collaborator) {
                            var errorMessage = 'Collaborator not found, restaurant name, email or password is wrong. Or your account is inactive.';
                            if (!collaborator)
                                throw new Error(errorMessage);
                            var isPassword = utils_1.compareStringBcrypt(input.password, collaborator.password);
                            if (!isPassword)
                                throw new Error(errorMessage);
                            if (!collaborator.collaboratorsAccess.length)
                                throw new Error('Your user do not have access in some establishment or establishment is not active');
                            var payload = {
                                sub: collaborator.id,
                                restaurantId: collaborator.collaboratorsAccess[0].restaurant.id,
                                loginType: collaborator.collaboratorsAccess[0].accessType
                            };
                            return {
                                token: jsonwebtoken_1.sign(payload, utils_1.JWT_SECRET)
                            };
                        })["catch"](function (error) {
                            logger.error('error to generate a token: ', { error: error });
                            throw error;
                        })];
                });
            });
        },
        createTokenToClient: function (parent, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(_this, void 0, void 0, function () {
                var restaurantAndTable, client, order, payload;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, db.Restaurant.find({
                                where: {
                                    id: input.restaurantId,
                                    status: RestaurantModel_1.RestaurantStatusEnum.ACTIVE
                                },
                                include: [
                                    {
                                        model: db.Table,
                                        where: {
                                            id: input.tableId,
                                            restaurant: input.restaurantId,
                                            status: TableModel_1.TableStatusEnum.ACTIVE
                                        },
                                        as: 'tables'
                                    }
                                ]
                            })["catch"](function (err) {
                                logger.error('error to find restaurant and table', { err: err });
                                throw err;
                            })];
                        case 1:
                            restaurantAndTable = _c.sent();
                            if (!restaurantAndTable)
                                throw new Error('Restaurant or table not found');
                            return [4 /*yield*/, db.Client.create({
                                    name: input.clientName
                                })["catch"](function (err) {
                                    logger.error('error to find client', { err: err });
                                    throw err;
                                })];
                        case 2:
                            client = _c.sent();
                            if (!client)
                                throw new Error('Error to create user');
                            return [4 /*yield*/, db.Order.create({
                                    status: OrderModel_1.OrderStatusEnum.PENDING,
                                    clientId: client.id,
                                    restaurantId: restaurantAndTable.id,
                                    tableId: restaurantAndTable.tables[0].id
                                })["catch"](function (err) {
                                    logger.error('error to create a order to client', { err: err });
                                    throw err;
                                })];
                        case 3:
                            order = _c.sent();
                            if (!order)
                                throw new Error('Error to create a new order to the client');
                            payload = {
                                sub: client.id,
                                restaurantId: restaurantAndTable.id,
                                tableId: restaurantAndTable.tables[0].id,
                                orderId: order.id,
                                loginType: 'CLIENT'
                            };
                            return [2 /*return*/, {
                                    token: jsonwebtoken_1.sign(payload, utils_1.JWT_SECRET)
                                }];
                    }
                });
            });
        }
    }
};
