/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";
import type { Platform_properties_id } from "./Platform_properties_id";
import type { ReleaseDateCategoryEnums } from "./ReleaseDateCategoryEnums";
import type { ReleaseDateRegionEnum } from "./ReleaseDateRegionEnum";

/**
 * A handy endpoint that extends platform release dates. Used to dig deeper into release dates, platforms and versions.
 */
export type ReleaseDate = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  category?: ReleaseDateCategoryEnums;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * The release date
   */
  date?: string;
  game?: Games_properties_id;
  /**
   * A human readable version of the release date
   */
  human?: string;
  /**
   * The month as an integer starting at 1 (January)
   */
  m?: number;
  platform?: Platform_properties_id;
  region?: ReleaseDateRegionEnum;
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
