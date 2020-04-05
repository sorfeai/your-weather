import { https } from 'follow-redirects';
import { RequestMethod } from './types';

export function promisifyHttpRequest<T>(
  hostname: string,
  port: number,
  path: string,
  method: RequestMethod,
  headers: { [key: string]: string } = {
    'Content-Type': 'application/json'
  },
  body?: { [key: string]: any },
): Promise<T> {
  console.log(hostname, path)
  const options = {
    hostname,
    port,
    path,
    method,
    headers,
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      // error status codes
      if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`${res.statusCode}: ${res.statusMessage}`));
          return;
      }

      let data: any[] = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        try {
          data = JSON.parse(Buffer.concat(data).toString());
        } catch(e) {
          reject(e);
          return;
        }

        resolve((data as unknown) as T);
      });
    })

    req.on('error', (error) => {
      reject(error);
    })

    if (body) {
      req.write(body);
    }

    req.end();
  });
}