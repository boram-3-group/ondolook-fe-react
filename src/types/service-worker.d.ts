declare interface ServiceWorkerEvent extends Event {
  waitUntil(promise: Promise<any>): void;
}

declare interface ServiceWorkerInstallEvent extends ServiceWorkerEvent {
  active: ServiceWorker | null;
}

declare interface ServiceWorkerActivateEvent extends ServiceWorkerEvent {
  active: ServiceWorker | null;
}

declare interface ServiceWorkerFetchEvent extends ServiceWorkerEvent {
  request: Request;
  respondWith(response: Promise<Response> | Response): void;
}

declare interface ServiceWorkerMessageEvent extends ServiceWorkerEvent {
  data: any;
  source: ServiceWorkerClient;
}

declare interface ServiceWorkerClient {
  id: string;
  url: string;
  postMessage(message: any): void;
}

declare interface ServiceWorkerRegistration {
  active: ServiceWorker | null;
  installing: ServiceWorker | null;
  waiting: ServiceWorker | null;
  scope: string;
  update(): Promise<void>;
  unregister(): Promise<boolean>;
}

declare interface ServiceWorker {
  state: 'installing' | 'installed' | 'activating' | 'activated' | 'redundant';
  scriptURL: string;
}
