"use strict";
exports.__esModule = true;
var logger_1 = require("../../../utils/logger");
var logger = logger_1["default"]('CollaboratorResolver');
exports.collaboratorResolver = {
    Collaborator: {
        collaboratorsAccess: function (collaborator, args, _a, info) {
            var collaboratorAccessCollaboratorLoader = _a.dataLoaders.collaboratorAccessCollaboratorLoader;
            return collaboratorAccessCollaboratorLoader.loadMany([collaborator.id]);
        }
    },
    Query: {
        collaborators: function (parent, _a, _b, info) {
            var _c = _a.first, first = _c === void 0 ? 0 : _c, _d = _a.offset, offset = _d === void 0 ? 0 : _d;
            var db = _b.db, requestedFields = _b.requestedFields;
            return db.Collaborator.findAll({
                limit: first,
                offset: offset,
                attributes: requestedFields.getFields(info, { keep: ['id'], exclude: ['collaboratorsAccess'] })
            })["catch"](function (error) {
                logger.error('Error to find collaborators', { error: error });
                throw error;
            });
        }
    }
};
