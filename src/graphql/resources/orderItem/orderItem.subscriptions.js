"use strict";
exports.__esModule = true;
var graphql_subscriptions_1 = require("graphql-subscriptions");
var composable_resolver_1 = require("../../../composables/composable.resolver");
var auth_resolver_1 = require("../../../composables/auth.resolver");
var pubsub = new graphql_subscriptions_1.PubSub();
var GraphqlOrderItemSubscriptions;
(function (GraphqlOrderItemSubscriptions) {
    GraphqlOrderItemSubscriptions["STATUS_UPDATED"] = "ORDER_ITEM_STATUS_UPDATED";
})(GraphqlOrderItemSubscriptions = exports.GraphqlOrderItemSubscriptions || (exports.GraphqlOrderItemSubscriptions = {}));
function subscriptionStatusChanged(orderItem) {
    pubsub.publish(GraphqlOrderItemSubscriptions.STATUS_UPDATED, {
        orderItemStatusUpdated: orderItem
    });
}
exports.subscriptionStatusChanged = subscriptionStatusChanged;
exports.subscribes = {
    statusUpdated: graphql_subscriptions_1.withFilter(function () { return pubsub.asyncIterator(GraphqlOrderItemSubscriptions.STATUS_UPDATED); }, composable_resolver_1.compose(auth_resolver_1.authResolver)(function (payload, args, context, info) {
        console.log('entrou na porra toda');
        return true;
    }))
};
