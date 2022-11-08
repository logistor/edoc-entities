// @ts-check

import { TYPE_SIGNATURE } from "../form/form";
import { projectFactory } from "../project/project";
import sectionFactory from "./section";

/**
 * Report object.
 * @typedef {Object} report
 * @property {function():string} getId
 * @property {function():boolean} isReadonly
 * @property {function():Object | undefined} getProject
 * @property {function(import("../project/project").project):void} setProject
 * @property {function():string} getName
 * @property {function(string):void} setName
 * @property {function():string} getState
 * @property {function(string):void} setState
 * @property {function():import("./section").section[]} getSections
 * @property {function(number):import("./section").section} getSection
 * @property {function} toJSON
 */

/**
 * Factory function for creating Report object.
 * @param {Object} data initializes report.
 * @param {string | undefined} data._id - identity for persistence.
 * @param {Object | undefined} data.project
 * @param {string} data.name
 * @param {string | undefined} data.state
 * @param {Object[]} data.sections
 * @returns {report} Report object
 * @throws {TypeError} data is undefined.
 * @throws {TypeError} data.name is undefined, not a string or zero length.
 * @throws {TypeError} data.sections is undefined, not an array or zero length.
 */
export default function (data) {
  validate(data);

  let { _id } = data;
  let { name } = data;
  let { state } = data;
  let project = data.project ? projectFactory(data.project) : undefined;

  /**
   * @type {import("./section.js").section[]} sections
   */
  const sections = data.sections.map((elem) => sectionFactory(elem));

  /**
   * If the report is not saved id is undefined.
   * @returns {string | undefined} report id
   */
  function getId() {
    return _id;
  }

  /**
   * Report is in readonly state if it contains section that is signature
   * type, section's style is readonly and it contains signature image.
   * @returns boolean
   */
  function isReadonly() {
    const sig = sections.filter(
      (section) => section.getType() === TYPE_SIGNATURE
    );
    const elem = sig.find((section) => {
      const style = section.getStyle();
      const length = section.getImages().length;
      return style === "readonly" && length > 0;
    });
    return elem !== undefined;
  }

  /**
   * @returns {project | undefined}
   */
  function getProject() {
    return project;
  }

  /**
   * @param {project} param
   */
  function setProject(param) {
    project = param;
  }

  /**
   * @returns {string}
   */
  function getName() {
    return name;
  }

  /**
   * @param {string} param
   */
  function setName(param) {
    name = param;
  }

  /**
   * @returns {string | undefined}
   */
  function getState() {
    return state;
  }

  /**
   * @param {string} param
   */
  function setState(param) {
    state = param;
  }

  /**
   * @returns { import("./section.js").section[] } array of report sections
   */
  function getSections() {
    return sections;
  }

  /**
   * @param {number} id - section id
   * @returns {import("./section.js").section | undefined} report section - if no section is found returns undefined.
   */
  function getSection(id) {
    return sections.find((elem) => elem.getId() === id);
  }

  function toJSON() {
    return {
      _id,
      project,
      name,
      state,
      sections: sections.map((elem) => elem.toJSON()),
    };
  }

  return Object.freeze({
    getId,
    isReadonly,
    getProject,
    setProject,
    getName,
    setName,
    getState,
    setState,
    getSections,
    getSection,
    toJSON,
  });
}

function validate(data) {
  if (!data) {
    throw new TypeError("Constructor parameter is undefined.");
  }

  if (!data.name) {
    throw new TypeError("Name is undefined.");
  }

  if (typeof data.name !== "string") {
    throw new TypeError("Name is not a string.");
  }

  if (!data.sections) {
    throw new TypeError("Sections is undefined.");
  }

  if (!Array.isArray(data.sections)) {
    throw new TypeError("Sections is not an array.");
  }

  if (data.sections.length === 0) {
    throw new TypeError("Sections is zero length.");
  }
}
