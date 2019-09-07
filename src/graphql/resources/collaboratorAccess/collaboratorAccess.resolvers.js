"use strict";
exports.__esModule = true;
exports.collaboratorAccessResolver = {
    CollaboratorAccess: {
        restaurant: function (collaboratorAccess, args, _a, info) {
            var restaurantLoader = _a.dataLoaders.restaurantLoader;
            return restaurantLoader.load(collaboratorAccess.restaurantId);
        },
        collaborator: function (collaboratorAccess, args, _a, info) {
            var collaboratorLoader = _a.dataLoaders.collaboratorLoader;
            return collaboratorLoader.load(collaboratorAccess.collaboratorId);
        }
    }
};
