"use strict";

/**
 * Creates an async action
 * @param type
 * @param container - root container
 * @returns {Function}
 * @example
 *  import SyncActionCreator from './sync-action-creator';
 *  var ActionNameAction = SyncActionCreator("ActionNameAction");
 *  dispatch(ActionNameAction(data));
 */
export default function creator(type, container) {
  return {
    type,
    create: (data) => {
      return {
        container,
        type,
        data
      };
    }
  };

};