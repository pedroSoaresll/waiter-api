"use strict";
exports.__esModule = true;
var logger_1 = require("../../../utils/logger");
var logger = logger_1["default"]('GRAPHQL:CLIENT:RESOLVER');
exports.clientResolvers = {
    Query: {
        clients: function (parent, args, _a, info) {
            var db = _a.db;
            return db.Client.findAll()["catch"](function (error) {
                logger.error('error to get all clients', { error: error });
                throw error;
            });
        },
        client: function (parent, args, _a, info) {
            var db = _a.db;
            return db.Client.findOne({
                where: {
                    id: args.id
                },
                limit: 1
            })["catch"](function (error) {
                logger.error('error to get client', { error: error });
                throw error;
            });
        }
    },
    Mutation: {
        createClient: function (parent, _a, _b, info) {
            var input = _a.input;
            var db = _b.db;
            logger.info('create client input', { input: input });
            var name = input.name.trim();
            if (!name)
                throw new Error('Nome de cliente não é válido');
            return db.Client.create({
                name: name
            })["catch"](function (error) {
                logger.error('error to create a new client', { error: error });
                throw error;
            });
        },
        initSession: function (parent, _a, _b, info) {
            var input = _a.input;
            var db = _b.db;
            // todo create client
            // todo create restaurant
            // todo create order and set client + restaurant + table
        }
    }
};
