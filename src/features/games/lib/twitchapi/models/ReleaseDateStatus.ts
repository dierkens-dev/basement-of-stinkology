/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An endpoint to provide definition of all of the current release date statuses.
 */
export type ReleaseDateStatus = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * The name of the release date status
   */
  name?: string;
  /**
   * The description of the release date status.
   */
  description?: string;
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
