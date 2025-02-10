/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Languages that are used in the Language Support endpoint.
 */
export type Language = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * The name of the localization
   */
  name?: string;
  /**
   * The native name of the language
   */
  native_name?: string;
  /**
   * The combination of Language code and Country code (en-US)
   */
  locale?: string;
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
