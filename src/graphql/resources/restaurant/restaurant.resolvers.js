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
var CollaboratorAccessModel_1 = require("../../../models/CollaboratorAccessModel");
var logger_1 = require("../../../utils/logger");
var utils_1 = require("../../../utils/utils");
var composable_resolver_1 = require("../../../composables/composable.resolver");
var auth_resolver_1 = require("../../../composables/auth.resolver");
var verify_token_resolver_1 = require("../../../composables/verify-token.resolver");
var RestaurantModel_1 = require("../../../models/RestaurantModel");
var logger = logger_1["default"]('GRAPHQL:RESTAURANT:RESOLVER');
exports.restaurantResolvers = {
    Restaurant: {
        collaboratorsAccess: function (restaurant, args, _a) {
            var collaboratorAccessRestaurantLoader = _a.dataLoaders.collaboratorAccessRestaurantLoader;
            return collaboratorAccessRestaurantLoader.loadMany([restaurant.id]);
        }
    },
    Query: {
        restaurants: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver)(function (parent, args, _a, info) {
            var db = _a.db;
            return db.Restaurant.findAll()["catch"](function (error) {
                logger.error('error to create a new estabelecimento', { error: error });
                throw new Error('Houve um problema ao tentar buscar os estabelecimentos');
            });
        })
    },
    Mutation: {
        createRestaurant: function (parent, _a, _b, info) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(_this, void 0, void 0, function () {
                var name_1, password, restaurant, e_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            logger.info('create restaurant input', { input: input });
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            name_1 = input.displayName
                                .replace(/\s+/g, '-')
                                .toLowerCase()
                                .trim();
                            password = utils_1.generatePassword(input.password);
                            return [4 /*yield*/, db.Restaurant.create({
                                    displayName: input.displayName,
                                    name: name_1,
                                    status: RestaurantModel_1.RestaurantStatusEnum.ACTIVE,
                                    collaboratorsAccess: {
                                        accessType: CollaboratorAccessModel_1.CollaboratorAccessTypeEnum.ADMIN,
                                        status: CollaboratorAccessModel_1.CollaboratorAccessStatusEnum.ACTIVE,
                                        inActivity: false,
                                        collaborator: {
                                            name: input.collaboratorName,
                                            email: input.email,
                                            password: password
                                        }
                                    }
                                }, {
                                    include: [
                                        {
                                            model: db.CollaboratorAccess,
                                            as: 'collaboratorsAccess',
                                            include: [
                                                {
                                                    model: db.Collaborator,
                                                    as: 'collaborator'
                                                }
                                            ]
                                        }
                                    ]
                                })];
                        case 2:
                            restaurant = _c.sent();
                            if (!restaurant)
                                throw new Error('Error to create CollaboratorAccess + Restaurant + Collaborator: ');
                            logger.info('Data created', { collaboratorAccess: restaurant });
                            return [2 /*return*/, restaurant];
                        case 3:
                            e_1 = _c.sent();
                            logger.error('Error in createRestaurant mutation: ', { e: e_1 });
                            throw e_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
    }
};
