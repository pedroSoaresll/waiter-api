"use strict";
exports.__esModule = true;
var composable_resolver_1 = require("../../../composables/composable.resolver");
var auth_resolver_1 = require("../../../composables/auth.resolver");
var verify_token_resolver_1 = require("../../../composables/verify-token.resolver");
var CategoryModel_1 = require("../../../models/CategoryModel");
var CollaboratorAccessModel_1 = require("../../../models/CollaboratorAccessModel");
exports.categoryResolver = {
    Query: {
        categories: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver)(function (parent, args, _a, info) {
            var entityAuthenticated = _a.entityAuthenticated, db = _a.db;
            return db.Category.findAll({
                where: {
                    restaurantId: entityAuthenticated.restaurant
                }
            });
        })
    },
    Mutation: {
        createCategory: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver)(function (parent, _a, _b, info) {
            var input = _a.input;
            var db = _b.db, entityAuthenticated = _b.entityAuthenticated;
            var _c = input, name = _c.name, icon = _c.icon;
            var _d = entityAuthenticated, restaurantId = _d.restaurant, loginType = _d.loginType;
            if (loginType !== CollaboratorAccessModel_1.CollaboratorAccessTypeEnum.ADMIN)
                throw new Error('Just ADM can create a new category');
            return db.Category.create({
                name: name,
                icon: icon,
                restaurantId: restaurantId,
                status: CategoryModel_1.CategoryStatusEnum.ACTIVE
            });
        })
    },
    Category: {
        restaurant: function (category, args, _a) {
            var restaurantLoader = _a.dataLoaders.restaurantLoader;
            return restaurantLoader.load(category.restaurantId);
        }
    }
};
