import { useState, useCallback } from 'react';
import { AxiosRequestConfig } from 'axios';

import { useAxios } from 'app/hooks/axios-hook';

const REQUEST_TIMEOUT = undefined;

export interface RequestData<T> {
  isFetching: boolean;
  data?: T;
  error?: Error;
  fetch?: (config?: AxiosRequestConfig) => void;
}

export interface Options<T> extends AxiosRequestConfig {
  initialValue?: T;
}

/**
 *
 * @param {Object} options request options
 * @param {String} options.url The request url
 * @param {String} options.method The request http method
 * @param {any} requestParams.initialValue The response data initial value
 *
 * @see useAxios
 * @see axiosDefaultConfig
 * @see mapResponseToData
 *
 * @return {RequestData} return an object containing the data, isFetching and the request strategy.
 *
 */
export const useRequest = <T>(options: Options<T> = {}, axiosConfig: AxiosRequestConfig = {}): RequestData<T> => {
  const [data, setData] = useState<T | undefined>(options.initialValue);
  const [error, setError] = useState<Error | undefined>();
  const [isFetching, setFetching] = useState<boolean>(false);

  const { axios, initialized: axiosInitialized } = useAxios({
    ...axiosDefaultConfig,
    ...axiosConfig,
  });

  /**
   * Specific request for options
   *
   * @param {Object} requestParams Request
   * @param {Object} requestParams.params The request query params
   * @param {Object} requestParams.data The request body data
   *
   */
  const request = (requestParams: AxiosRequestConfig = {}) => {
    if (!axios || !axiosInitialized) {
      return;
    }

    const fetchData = async () => {
      setFetching(true);
      setError(undefined);

      try {
        const response = await axios({ ...options, ...requestParams });

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  };

  const fetch = useCallback(request, [axiosInitialized]);

  return { isFetching, data, error, fetch };
};

/**
 * Request default config for axios creator
 *
 * @see API_BASE_URL
 * @see REQUEST_TIMEOUT
 */
const axiosDefaultConfig = {
  timeout: REQUEST_TIMEOUT,
};

export default { useRequest };
