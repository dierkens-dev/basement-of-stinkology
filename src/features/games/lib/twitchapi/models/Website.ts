/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";
import type { WebsiteCategoryEnums } from "./WebsiteCategoryEnums";

/**
 * A website URL, usually associated with a game
 */
export type Website = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  category?: WebsiteCategoryEnums;
  game?: Games_properties_id;
  trusted?: boolean;
  /**
   * The main platform address (URL) of the platform
   */
  url?: string;
  /**
   * Hash of the object
   */
  checksum?: string;
};
