"use strict";
exports.__esModule = true;
var orderItemTypes = "\n  # OrderItem definition types\n  type OrderItem {\n    id: ID!\n    item: Item!\n    order: Order!\n    status: OrderItemStatusEnum!\n    createdAt: String!\n    updatedAt: String!\n    doingAt: String\n    doneAt: String\n    deliveredAt: String\n  }\n  \n  input CreateOrderItemInput {\n    itemId: String!\n  }\n  \n  input RemoveOrderItemInput {\n    orderItemId: String!\n  }\n  \n  input DoingOrderItemInput {\n    orderItemId: String!\n  }\n  \n  input DoneOrderItemInput {\n    orderItemId: String!\n  }\n  \n  input DeliveredOrderItemInput {\n    orderItemId: String!\n  }\n  \n  enum OrderItemStatusEnum {\n    CANCELED\n    PENDING\n    DOING\n    DONE\n    DELIVERED\n  }\n";
exports.orderItemTypes = orderItemTypes;
var orderItemQueries = "\n  order: Order!\n";
exports.orderItemQueries = orderItemQueries;
var orderItemMutations = "\n  createOrderItem(input: CreateOrderItemInput!): OrderItem!\n  removeOrderItem(input: RemoveOrderItemInput!): OrderItem!\n  doingOrderItem(input: DoingOrderItemInput!): OrderItem!\n  doneOrderItem(input: DoneOrderItemInput!): OrderItem!\n  deliveredOrderItem(input: DeliveredOrderItemInput!): OrderItem!\n";
exports.orderItemMutations = orderItemMutations;
