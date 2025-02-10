/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";

/**
 * Screenshots of games
 */
export type Screenshot = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  alpha_channel?: boolean;
  animated?: boolean;
  game?: Games_properties_id;
  /**
   * The height of the image in pixels
   */
  height?: number;
  /**
   * The ID of the image used to construct an IGDB image link
   */
  image_id?: string;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  /**
   * The width of the image in pixels
   */
  width?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
