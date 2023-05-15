import { TBaseResponse } from './types';

export async function GetCpuInfoLine(): Promise<Number[]> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}/api/v1/cpu_line`;

  return new Promise<Number[]>(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const result: TBaseResponse<number[]> = await response.json();
      if (result.ok && !!result.data) {
        resolve(result.data);
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}

export async function GetCpuInfoMiddle(): Promise<Number[]> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}/api/v1/cpu_middle`;

  return new Promise<Number[]>(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const result: TBaseResponse<number[]> = await response.json();
      if (result.ok && !!result.data) {
        resolve(result.data);
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}
