/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Region for game localization
 */
export type Region = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * The name of the region
   */
  name?: string;
  /**
   * Whether the region is a local or continent
   */
  category?: "locale" | "continent";
  /**
   * This is the identifier of each region
   */
  identifier?: any;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * Date this was last updated in the IGDB database
   */
  updated_at?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
