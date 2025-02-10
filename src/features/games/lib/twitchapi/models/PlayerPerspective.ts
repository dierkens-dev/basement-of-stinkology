/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Player perspectives describe the view/perspective of the player in a video game.
 */
export type PlayerPerspective = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * The perspective
   */
  name?: string;
  /**
   * A url-safe, unique, lower-case version of the name
   */
  slug?: string;
  /**
   * Date this was last updated in the IGDB database
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
