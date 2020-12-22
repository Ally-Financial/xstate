import { Interpreter } from '.';
import { IS_PRODUCTION } from './environment';

type AnyInterpreter = Interpreter<any, any, any>;
type ServiceListener = (service: AnyInterpreter) => void;

export interface XStateDevInterface {
  register: (service: Interpreter<any>) => void;
  unregister: (service: Interpreter<any>) => void;
  onRegister: (
    listener: ServiceListener
  ) => {
    unsubscribe: () => void;
  };
  services: Set<Interpreter<any>>;
}

function getDevTools(): XStateDevInterface | undefined {
  if (!!globalThis.__xstate__) {
    return globalThis.__xstate__;
  }

  return undefined;
}

export function registerService(service: AnyInterpreter) {
  if (IS_PRODUCTION || typeof globalThis === 'undefined') {
    return;
  }

  const devTools = getDevTools();

  if (devTools) {
    devTools.register(service);
  }
}
