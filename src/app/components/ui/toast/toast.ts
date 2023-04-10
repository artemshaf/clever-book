import { emitter, toaster, Toaster } from './utils';
import { ToastEvents, ToastContent, ToastConfig } from './types';

const applyToast = ({ ...toast }: Toaster) => emitter.emit(ToastEvents.SHOW, toaster({ ...toast }));

const CONTENT_DEFAULT = 'Что-то пошло не так. Обновите страницу через некоторое время.';

export const toast = (content: ToastContent = CONTENT_DEFAULT, config?: ToastConfig) =>
  applyToast({ content, type: 'success', config });

toast.success = (content: ToastContent = CONTENT_DEFAULT, config?: ToastConfig) =>
  applyToast({ content, type: 'success', config });

toast.error = (content: ToastContent = CONTENT_DEFAULT, config?: ToastConfig) =>
  applyToast({ content, type: 'error', config });

toast.info = (content: ToastContent = CONTENT_DEFAULT, config?: ToastConfig) =>
  applyToast({ content, type: 'info', config });

toast.warn = (content: ToastContent = CONTENT_DEFAULT, config?: ToastConfig) =>
  applyToast({ content, type: 'warning', config });

toast.hideAll = () => emitter.emit(ToastEvents.HIDE_ALL);
