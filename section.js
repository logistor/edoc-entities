//@ts-check

import container from "./container.js";

/**
 * Section
 * @typedef {Object} section
 * @property {function():number} getId
 * @property {function():string} getType
 * @property {function():string} getStyle
 * @property {function():string | undefined} getLabel - imageCard does not need label.
 * @property {function():Object} getValue
 * @property {function(Object):void} setValue
 * @property {function():import("./img.js").img[]} getImages
 * @property {function({url: string, caption: string}):number} addImage
 * @property {function(string, string):void} setCaption
 * @property {function(string):number} removeImage
 * @property {function} toJSON
 */

/**
 * Factory function for section
 * @param {Object} data
 * @param {number} data.id
 * @param {string} data.type
 * @param {string | undefined} data.label imageCard does not need label
 * @param {Object | undefined} data.value
 * @param {{url: string, caption: string}[] | undefined} data.images
 * @param {string | undefined} data.style - Title, subtitle, private etc.
 * @returns {section} section object
 * @throws {TypeError} if data parameter is undefined
 * @throws {TypeError} if data.id is undefined
 * @throws {TypeError} if data.id is not an Integer
 * @throws {TypeError} if data.type is undefined or zero length string
 * @throws {TypeError} if data.type is not a String
 */
export default function (data) {
  validate(data);

  const { id } = data;
  const { type } = data;
  const { label } = data;
  const { style } = data;
  let { value } = data;

  /**
   * @type {import("./container.js").container}
   */
  const images = container(data);

  function getId() {
    return id;
  }

  function getType() {
    return type;
  }

  function getStyle() {
    return style;
  }

  function getLabel() {
    return label;
  }

  function getValue() {
    return value;
  }

  function setValue(param) {
    value = param;
  }

  function getImages() {
    return images.getImgs();
  }

  function addImage(param) {
    return images.addImg(param);
  }

  function removeImage(url) {
    return images.removeImg(url);
  }

  function setCaption(url, caption) {
    const img = images.getImg(url);
    img.setCaption(caption);
  }

  function toJSON() {
    return {
      id,
      type,
      style,
      label,
      value,
      images: images ? images.toJSON() : undefined,
    };
  }

  return {
    getId,
    getType,
    getStyle,
    getLabel,
    getValue,
    setValue,
    getImages,
    addImage,
    setCaption,
    removeImage,
    toJSON,
  };
}

function validate(data) {
  if (!data) {
    throw new TypeError("Constructor is undefined.");
  }

  if (!data.id) {
    throw new TypeError("Id is undefined.");
  }

  if (!Number.isInteger(data.id)) {
    throw new TypeError("Id is not an Integer.");
  }

  if (!data.type) {
    throw new TypeError("Type is undefined or zero length string.");
  }

  if (typeof data.type !== "string") {
    throw new TypeError("Type is not a String.");
  }
}
