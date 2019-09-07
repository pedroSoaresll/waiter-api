"use strict";
exports.__esModule = true;
var orderTypes = "\n  # Order definition types\n  type Order {\n    id: ID!\n    restaurant: Restaurant!\n    table: Table!\n    orderItems: [OrderItem!]!\n    client: Client!\n    amount: String\n    status: OrderStatusEnum!\n    createdAt: String!\n    updatedAt: String!\n  }\n  \n  enum OrderStatusEnum {\n    PENDING\n    DOING\n    DONE\n    FINISH\n  }\n";
exports.orderTypes = orderTypes;
var orderQueries = '';
exports.orderQueries = orderQueries;
var orderMutations = "\n  closeOrder: Order!\n";
exports.orderMutations = orderMutations;
