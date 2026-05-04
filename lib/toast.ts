type ToastData = { id: string; message: string; description?: string };
type Listener = (toast: ToastData) => void;

const listeners: Listener[] = [];

export function toast(message: string, description?: string) {
  const data: ToastData = { id: `${Date.now()}`, message, description };
  listeners.forEach((fn) => fn(data));
}

export function subscribeToast(fn: Listener) {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i !== -1) listeners.splice(i, 1);
  };
}
