import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { useState, useEffect } from 'react';

export interface Axios {
  axios?: AxiosInstance;
  initialized: boolean;
}

/**
 * Returns an authorizated axios instance
 *
 * @param {AxiosRequestConfig} config is the default config to be sent to the axios creator
 *
 * @return {Axios} an object containing the axios instance and the initialized prop
 *
 */
export const useAxios = (config: AxiosRequestConfig = {}): Axios => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [axiosInstance, setAxiosInstance] = useState<{ instance?: AxiosInstance }>({});

  useEffect(() => {
    const instance = axios.create(config);

    setAxiosInstance({ instance });
    setInitialized(true);

    return () => {
      setAxiosInstance({});
      setInitialized(false);
    };
  }, []);

  return { axios: axiosInstance.instance, initialized };
};

export default { useAxios };
