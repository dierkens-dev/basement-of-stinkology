/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Keywords are words or phrases that get tagged to a game such as “world war 2” or “steampunk”.
 */
export type Keyword = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * The keyword
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
