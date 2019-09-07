"use strict";
exports.__esModule = true;
var itemTypes = "\n  # Item definition types\n  type Item {\n    id: ID!\n    category: Category!\n    restaurant: Restaurant!\n    name: String!\n    description: String\n    image: String\n    amount: Float!\n    status: ItemStatusEnum!\n    createdAt: String!\n    updatedAt: String!\n  }\n  \n  input CreateItemInput {\n    categoryId: String!\n    name: String!\n    amount: Float!\n  }\n  \n  enum ItemStatusEnum {\n    INACTIVE\n    ACTIVE\n  }\n";
exports.itemTypes = itemTypes;
var itemQueries = "\n  items: [Item!]!\n  itemsByCategory(category: String!): [Item!]!\n";
exports.itemQueries = itemQueries;
var itemMutations = "\n  createItem(input: CreateItemInput!): Item!\n";
exports.itemMutations = itemMutations;
