"use strict";
exports.__esModule = true;
var restaurantTypes = "\n  # Restaurant definition types\n  type Restaurant {\n    id: ID!\n    name: String!\n    displayName: String!\n    collaboratorsAccess: [CollaboratorAccess!]!\n    createdAt: String!\n    updatedAt: String!\n  }\n  \n  input CreateRestaurantInput {\n    displayName: String!\n    collaboratorName: String!\n    email: String!\n    password: String!\n  }\n";
exports.restaurantTypes = restaurantTypes;
var restaurantQueries = "\n  restaurants: [Restaurant!]!\n";
exports.restaurantQueries = restaurantQueries;
var restaurantMutations = "\n  createRestaurant(input: CreateRestaurantInput!): Restaurant!\n";
exports.restaurantMutations = restaurantMutations;
