import { client } from './redis';

export function cache(param: string, query = false) {
  return (req: any, res: any, next: any) => {
    let key;

    if (query) {
      key = req.query[param];
    } else {
      key = req.params[param];
    }

    client.get(key, (err, data) => {
      if (err) next(err);

      if (data !== null) {
        const jsonData = JSON.parse(data);
        return res.json(jsonData);
      } else {
        next();
      }
    });
  };
}