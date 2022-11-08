// @ts-check

/**
 * Report subset object.
 * @typedef {Object} subset
 * @property {function():string} getId
 * @property {function():string} getName
 * @property {function():string} getTitle
 * @property {function():string} getSubTitle
 */

/**
 * Factory function for creating Subset object.
 * @param {Object} data initializes report.
 * @param {string} data._id - identity for persistence.
 * @param {string} data.name
 * @param {Object[]} data.sections
 * @returns {subset} Subset object
 */
function createSubset(data) {
  const { _id } = data;
  const { name } = data;
  const { sections } = data;

  function getId() {
    return _id;
  }

  function getName() {
    return name;
  }

  function getTitle() {
    const section = sections.find((elem) => elem.style === "th1");
    if (!section) {
      throw new TypeError("No header section found.");
    }
    return section.value;
  }

  function getSubTitle() {
    const section = sections.find((elem) => elem.style === "th2");
    return section ? section.value : "";
  }

  return Object.freeze({
    getId,
    getName,
    getTitle,
    getSubTitle,
  });
}

/**
 * Factory function for creating array of Subset objects.
 * @param {Object[]} data
 * @returns {subset[]}
 */
export default function (data) {
  return data.map((elem) => createSubset(elem));
}
