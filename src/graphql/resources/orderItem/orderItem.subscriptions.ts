import { PubSub, withFilter } from 'graphql-subscriptions'
import { OrderItemInstance } from "../../../models/OrderItemModel";
import { compose } from '../../../composables/composable.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolver } from '../../../composables/auth.resolver';
import { mustBeClient } from '../../../composables/must-be-client.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';

const pubsub = new PubSub();

export enum GraphqlOrderItemSubscriptions {
  STATUS_UPDATED = 'ORDER_ITEM_STATUS_UPDATED'
}

export function subscriptionStatusChanged(orderItem: OrderItemInstance) {
  pubsub.publish(GraphqlOrderItemSubscriptions.STATUS_UPDATED, {
    orderItemStatusUpdated: orderItem
  });
}

export const subscribes = {
  statusUpdated: withFilter(
    () => pubsub.asyncIterator(GraphqlOrderItemSubscriptions.STATUS_UPDATED),
    compose<any, ResolverContext>(authResolver)(
      (payload, args, context, info) => {
        console.log('entrou na porra toda');
        return true
      }
    )
  )
}