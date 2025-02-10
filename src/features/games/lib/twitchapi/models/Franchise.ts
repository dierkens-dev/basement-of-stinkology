/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";

/**
 * A list of video game franchises such as Star Wars
 */
export type Franchise = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  games?: Array<Games_properties_id>;
  /**
   * The name of the franchise
   */
  name?: string;
  /**
   * A url-safe, unique, lower-case version of the name
   */
  slug?: string;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  /**
   * Hash of the object
   */
  checksum?: string;
};
