/* eslint-disable no-console, func-names, max-params */
import Helper from './generic';

export default class ErrorHandler {

  constructor() {
    ErrorHandler.defineFunctionError();
  }

  static defineFunctionError() {
    window.onerror = function (messageOrEvent, source, lineno, colno, errorO) {

      try {
        console.log(`Error: ${messageOrEvent}
          Script: ${source}
          Line: ${lineno}
          Column: ${colno}
          Error object: ${JSON.stringify(errorO)}`);

        return true;
      } catch (error) {

        return false;
      }

    };
  }

  static onError(msg, error) {
    Helper.roar(`Error: ${msg}, ${error}`);
  }

  static onException(msg, exception) {
    Helper.roar(`Exception: ${msg}, ${exception}`);
  }

}
/* eslint-enable no-console, func-names, max-params */