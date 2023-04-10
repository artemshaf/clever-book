/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastEvents } from '../types';

export type Handler<T = any> = (event: T) => void;

type Emitter = {
  on<T = any>(event: ToastEvents, handler: Handler<T>): void;

  emit<T = any>(event: ToastEvents, args?: T): void;

  off(): void;
};

export const emitter = ((): Emitter => {
  const events = new Map();

  return {
    on<T = any>(event: ToastEvents, callback: Handler<T>) {
      if (!events.has(event)) events.set(event, []);
      events.get(event).push(callback);
    },

    emit<T = any>(event: ToastEvents, args: T) {
      if (!events.has(event)) return;
      events.get(event).forEach((callback: Handler) => callback(args));
    },

    off() {
      events.clear();
    },
  };
})();
