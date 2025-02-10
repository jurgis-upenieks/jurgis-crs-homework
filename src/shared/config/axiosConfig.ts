import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';

type AxiosCallback = () => void;

let showSpinnerCallback: AxiosCallback | null = null;
let hideSpinnerCallback: AxiosCallback | null = null;
let showErrorModalCallback: AxiosCallback | null = null;

export function setSpinnerCallbacks(
  show: AxiosCallback,
  hide: AxiosCallback,
  showErrorModal: AxiosCallback,
) {
  showSpinnerCallback = show;
  hideSpinnerCallback = hide;
  showErrorModalCallback = showErrorModal;
}

export function callShowSpinner() {
  showSpinnerCallback?.();
}

export function callHideSpinner() {
  hideSpinnerCallback?.();
}

export function callShowErrorModal() {
  showErrorModalCallback?.();
}

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('SENDING REQUEST TO BACKEND:', config.method, config.url);
    callShowSpinner();
    return config;
  },
  (error) => {
    callHideSpinner();
    callShowErrorModal();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('RECEIVED RESPONSE FROM BACKEND:', response.config.method, response.config.url, response.data);
    callHideSpinner();
    return response;
  },
  (error) => {
    callHideSpinner();
    callShowErrorModal();
    return Promise.reject(error);
  }
);