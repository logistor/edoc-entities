//@ts-check

import img from "./img";

/**
 * Img container.
 * @typedef {Object} container
 * @property {getImgs} getImgs
 * @property {getImg} getImg
 * @property {addImg} addImg
 * @property {removeImg} removeImg
 * @property {function():{url:string, caption:string}[]} toJSON
 */

// Img container's methods start //

/**
 * @callback getImgs
 * @returns {import("./img").img[]}
 */

/**
 * @callback getImg
 * @param {string} url
 * @returns {import("./img").img}
 * @throws {Error} if img is not found.
 */

/**
 * @callback addImg
 * @param {{url: string, caption: string}} param
 * @returns {number} length of image description array
 */

/**
 * @callback removeImg
 * @param {string} url - image url
 * @returns An array containing the elements that were deleted.
 * @throws {Error} if img to be deleted is not found.
 */

// Img container's methods end //

/**
 * Factory function for image description container.
 * Creates image descriptions and adds them into an array.
 * @param {Object} data
 * @param {{url: string, caption: string}[]} data.images
 * @returns {container} object that holds image descriptions
 * @throws {TypeError} if data parameter is undefined
 * @throws {TypeError} if creating a description fails
 */
export default function (data) {
  if (!data) {
    throw new TypeError("Constructor is undefined.");
  }

  if (!data.images) {
    return undefined;
  }

  /**
   * @type {import("./img").img[]}
   */
  const container = data.images.map((elem) => img(elem));

  function getImgs() {
    return container;
  }

  function findIndex(url) {
    const condition = (elem) => elem.getUrl() === url;
    const ndx = container.findIndex(condition);
    if (ndx === -1) {
      throw new Error("Invalid url.");
    }
    return ndx;
  }

  function getImg(url) {
    const i = findIndex(url);
    return container[i];
  }

  function addImg(param) {
    const newImg = img(param);
    return container.push(newImg);
  }

  function removeImg(url) {
    const i = findIndex(url);
    return container.splice(i, 1);
  }

  function toJSON() {
    return container.map((elem) => elem.toJSON());
  }

  return Object.freeze({
    getImgs,
    getImg,
    addImg,
    removeImg,
    toJSON,
  });
}
