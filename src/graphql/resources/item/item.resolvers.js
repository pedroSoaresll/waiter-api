"use strict";
exports.__esModule = true;
var ItemModel_1 = require("../../../models/ItemModel");
var composable_resolver_1 = require("../../../composables/composable.resolver");
var CollaboratorAccessModel_1 = require("../../../models/CollaboratorAccessModel");
var auth_resolver_1 = require("../../../composables/auth.resolver");
var verify_token_resolver_1 = require("../../../composables/verify-token.resolver");
exports.itemResolver = {
    Query: {
        items: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver)(function (parent, args, _a) {
            var entityAuthenticated = _a.entityAuthenticated, db = _a.db;
            return db.Item.findAll({
                where: {
                    restaurantId: entityAuthenticated.restaurant
                }
            });
        }),
        itemsByCategory: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver)(function (parent, args, _a) {
            var entityAuthenticated = _a.entityAuthenticated, db = _a.db;
            var category = args.category;
            return db.Item.findAll({
                where: {
                    restaurantId: entityAuthenticated.restaurant,
                    categoryId: category
                }
            });
        })
    },
    Mutation: {
        createItem: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver)(function (parent, _a, _b) {
            var input = _a.input;
            var entityAuthenticated = _b.entityAuthenticated, db = _b.db;
            var _c = entityAuthenticated, restaurantId = _c.restaurant, loginType = _c.loginType;
            // só o adm pode criar
            if (loginType !== CollaboratorAccessModel_1.CollaboratorAccessTypeEnum.ADMIN)
                throw new Error('Just ADM can create new items');
            var _d = input, name = _d.name, categoryId = _d.categoryId, amount = _d.amount;
            return db.Item.create({
                restaurantId: restaurantId,
                name: name,
                categoryId: categoryId,
                amount: amount,
                status: ItemModel_1.ItemStatusEnum.ACTIVE
            });
        })
    },
    Item: {
        category: function (item, args, _a) {
            var categoryLoader = _a.dataLoaders.categoryLoader;
            return categoryLoader.load(item.categoryId);
        },
        restaurant: function (item, args, _a) {
            var restaurantLoader = _a.dataLoaders.restaurantLoader;
            return restaurantLoader.load(item.restaurantId);
        }
    }
};
