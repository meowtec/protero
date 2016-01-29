declare module "catro" {

  import * as http from 'http'
  import { EventEmitter } from 'events'
  import { Readable } from 'stream'

  interface Headers {
      [key: string]: string;
  }
  /**
   * Request is a superset of <http.requestOptions>
   */
  interface Request {
      method: string;
      hostname: string;
      port: string;
      path: string;
      headers: Headers;
      body: Readable | string | Buffer;
  }

  interface Response {
      status: number;
      headers: Headers;
      body: Readable | string | Buffer;
  }

  interface KeyCertPair {
      key: Buffer;
      cert: Buffer;
  }

  interface CertManager {
      readCerts(domain: string): Promise<KeyCertPair>;
      rootCAExist(): Promise<boolean>;
      getCerts(domain: string): Promise<KeyCertPair>;
  }

  interface RequestHandler extends EventEmitter {
      protocol: string;
      req: http.IncomingMessage;
      res: http.ServerResponse;
      replaceRequest: (request: Request, requestHandler?: RequestHandler) => Promise<Request> | Request;
      replaceResponse: (request: Response, requestHandler?: RequestHandler) => Promise<Response> | Response;
      request: Request;
      response: Response;
      url: string;
      preventRequest(): void;
  }

  interface Options {
    /** proxy port */
    port: number;
    /** path to storage certRoot */

    https?: {
        (host: string): boolean;
    } | boolean;

    rejectUnauthorized?: boolean;

  }

  export default class Proxy extends EventEmitter {
      constructor(options: Options, callback?: (err, proxy) => any);
      static logger: Readable;
      /** set cert dir path */
      static certPath: string;
      /** get CA cert file path */
      static rootCAPath: string;
      promise: Promise<any>;
      httpServer: http.Server;
      get a(): any
  }
}
