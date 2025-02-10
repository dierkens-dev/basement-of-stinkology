/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";

/**
 * Alternative and international game titles
 */
export type AlternativeNames = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * A description of what kind of alternative name it is. (Acronym, Working title, Japanese title etc)
   */
  comment?: string;
  game?: Games_properties_id;
  /**
   * An alternative name
   */
  name?: string;
  /**
   * Hash of the object
   */
  checksum?: string;
};
