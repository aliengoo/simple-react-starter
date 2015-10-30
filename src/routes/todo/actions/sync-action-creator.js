"use strict";

/**
 * Creates an async action
 * @param type
 * @returns {Function}
 * @example
 *  import SyncActionCreator from './sync-action-creator';
 *  var ActionNameAction = SyncActionCreator("ActionNameAction");
 *  dispatch(ActionNameAction(data));
 */
export default function creator(type) {
  return function() {
    return {
      create: (data) => {
        return {
          type,
          data
        };
      }
    };
  };
};