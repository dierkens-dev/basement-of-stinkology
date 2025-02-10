/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Language Support Types contains the identifiers for the support types that Language Support uses.
 */
export type LanguageSupportType = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * The name of the method of support. (Audio, Subtitles, etc)
   */
  name?: string;
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
