import generateHash from '../utils/generateHash';
import { create as createEnum } from '../utils/enum';


const handleError = function handleError(response) {
  if (response.ok === false) {
    const error = new Error(`A ${response.status} error occurred: ${response.statusText}`);
    error.response = response;
    throw error;
  }
  return response;
};
const TIMEOUT_MS = 5000;
const TIMEOUT_MSG = 'Request timed out';
const createTimeoutRejection = function createTimeoutRejection({
  setTimeout = global.setTimeout,
  timeoutInMs = TIMEOUT_MS, timeoutMessage = TIMEOUT_MSG
}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(timeoutMessage), timeoutInMs);
  });
};

const fetch2 = function fetch2({
  url,
  ...options
}, fetch = global.fetch, setTimeout = global.setTimeout) {
  const { timeoutInMs, timeoutMessage } = options;
  const method = isJsonp(options) ? fetchJsonp : fetch;
  const request = method(url, options).then(handleError);
  const timeout = createTimeoutRejection({ setTimeout, timeoutInMs, timeoutMessage });

  return Promise.race([request, timeout]);
};

function fetchJsonp(url, options, setTimeout = global.setTimeout) {
  return new Promise((resolve, reject) => {
    const script = createJsonpScript({ url, options, setTimeout, resolve, reject }); // eslint-disable-line
    appendScript(script);
  });
}

export default fetch2;

/** JSONP */
const jsonpStatus = createEnum({
  SUCCESS: 'JSONP script was successful',
  FAILED_JSONP_SCRIPT: 'JSONP script failed',
  FAILED_TIMEOUT: 'JSONP script timed out'
});
const QS_CALLBACK_PARAMETER_NAME_DEFAULT = 'callback';
export const JSONP_METHOD = 'jsonp';

function isJsonp(options) {
  return getOptionValue(options, 'method', '') === JSONP_METHOD;
}

function createJsonpUrl(url, callback) {
  return `${url}${url.indexOf('?') > 0 ? '&' : '?'}${QS_CALLBACK_PARAMETER_NAME_DEFAULT}=${callback}`;
}

function appendScript(script) {
  const head = global.document.getElementsByTagName('head')[0] || global.document.head;
  return head.appendChild(script);
}

function generateCallackName() {
  return `jsonp_callback_${generateHash(20)}`;
}

function createJsonpScript({ url, options, setTimeout, resolve, reject }) { // eslint-disable-line
  const timeout = getOptionValue(options, 'timeoutInMs', TIMEOUT_MS);
  const callback = generateCallackName();

  const script = global.document.createElement('script');
  script.type = 'text/javascript';
  script.src = createJsonpUrl(url, callback);
  script.dataset.callback = callback;
  script.dataset.timeoutId = setTimeout(() => handleJsonpError({ script, reject, status: jsonpStatus.FAILED_TIMEOUT }), timeout);
  script.onerror = () => handleJsonpError({ script, reject, status: jsonpStatus.FAILED_JSONP_SCRIPT });
  createCallback({ script, resolve });
  return script;
}

function handleJsonpError({ script, reject, status }) {
  destroyScript(script);
  reject(new Error(`${status}:${script.src}`));
}

function destroyScript(script) {
  try {
    clearTimeout(script.dataset.timeoutId);
    deleteCallback(script.dataset.callback);
    script.parentNode.removeChild(script);
  } catch (e) {
    // ignore
  }
}

function createCallback({ script, resolve }) { // eslint-disable-line
  global[script.dataset.callback] = (res) => {
    resolve(createResponse({ res, url: script.src }));
    destroyScript(script);
  };
}

function deleteCallback(callback) {
  try {
    delete global[callback];
  } catch (e) {
    // ignore
  }
}

function getOptionValue(options = {}, key, defaultValue = null) {
  return options[key] !== undefined ? options[key] : defaultValue;
}

function toJson(res) {
  if (typeof res === 'string') {
    try {
      return JSON.parse(res);
    } catch (e) {
      // ignore
    }
  }
  return res;
}

function createResponse({ ok = true, status=200, statusText=jsonpStatus.SUCCESS, res, url = '' }) { // eslint-disable-line
  return {
    url,
    ok,
    status,
    statusText,
    type: 'default',
    bodyUsed: false,
    text() {
      this.bodyUsed = true;
      return Promise.resolve(res);
    },
    json() {
      this.bodyUsed = true;
      return Promise.resolve(toJson(res));
    },
    clone() {
      return createResponse({ ok, status, statusText, res, url }); // eslint-disable-line
    }
  };
}
