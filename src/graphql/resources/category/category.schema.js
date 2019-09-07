"use strict";
exports.__esModule = true;
var categoryTypes = "\n  # Category definition types\n  type Category {\n    id: ID!\n    restaurant: Restaurant!\n    name: String!\n    icon: String\n    status: CategoryStatusEnum!\n    createdAt: String!\n    updatedAt: String!\n  }\n  \n  input CreateCategoryInput {\n    name: String!\n    icon: String\n  }\n  \n  enum CategoryStatusEnum {\n    ACTIVE\n    INACTIVE\n  }\n";
exports.categoryTypes = categoryTypes;
var categoryQueries = "\n  categories: [Category!]!\n";
exports.categoryQueries = categoryQueries;
var categoryMutations = "\n  createCategory(input: CreateCategoryInput!): Category!\n";
exports.categoryMutations = categoryMutations;
