/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlatformVersion_properties_id } from "./PlatformVersion_properties_id";
import type { PlatformVersionReleaseDateEnums } from "./PlatformVersionReleaseDateEnums";
import type { PlatformVersionReleaseDateRegionEnum } from "./PlatformVersionReleaseDateRegionEnum";

/**
 * A handy endpoint that extends platform release dates. Used to dig deeper into release dates, platforms and versions.
 */
export type PlatformVersionReleaseDate = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  category?: PlatformVersionReleaseDateEnums;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * The release date
   */
  date?: string;
  /**
   * A human readable version of the release date
   */
  human?: string;
  /**
   * The month as an integer starting at 1 (January)
   */
  m?: number;
  platform_version?: PlatformVersion_properties_id;
  region?: PlatformVersionReleaseDateRegionEnum;
  /**
   * Date this was last updated in the IGDB database
   */
  updated_at?: number;
  /**
   * The year in full (2018)
   */
  y?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
