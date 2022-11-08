//@ts-check

/**
 * Url and caption object.
 * @typedef {Object} img
 * @property {getUrl} getUrl
 * @property {setUrl} setUrl
 * @property {getFileName} getFileName
 * @property {getCaption} getCaption
 * @property {setCaption} setCaption
 * @property {toJSON} toJSON
 */
/**
 * @callback getUrl
 * @returns {string}
 */
/**
 * @callback setUrl
 * @param {string} param
 */
/**
 * @callback getFileName
 * @returns {string} file part from url
 */
/**
 * @callback getCaption
 * @returns {string}
 */
/**
 * @callback setCaption
 * @param {string} param
 */
/**
 * @callback toJSON
 * @returns {{url: string, caption: string}}
 */

/**
 * Factory function for imgs.
 * @param {Object} data
 * @param {string} data.url
 * @param {string | undefined} data.caption
 * @returns {img}
 * @throws {TypeError} if data parameter is undefined
 * @throws {TypeError} if data.url is undefined
 * @throws {TypeError} if data.url is not a String
 * @throws {TypeError} if data.url is zero length
 */
export default function (data) {
  validate(data);

  let { url } = data;
  let { caption = "" } = data;

  function getUrl() {
    return url;
  }

  function setUrl(param) {
    url = param;
  }

  function getFileName() {
    const pathArray = url.split("/");
    return pathArray[pathArray.length - 1];
  }

  function getCaption() {
    return caption;
  }

  function setCaption(param) {
    caption = param;
  }

  function toJSON() {
    return {
      url,
      caption,
    };
  }

  return Object.freeze({
    getUrl,
    setUrl,
    getFileName,
    getCaption,
    setCaption,
    toJSON,
  });
}

function validate(data) {
  if (!data) {
    throw new TypeError("Constructor is undefined.");
  }

  if (data.url == null) {
    throw new TypeError("Url is undefined or null.");
  }

  if (typeof data.url !== "string") {
    throw new TypeError("Url is not a String.");
  }

  if (data.url.length === 0) {
    throw new TypeError("Url is zero length.");
  }
}
