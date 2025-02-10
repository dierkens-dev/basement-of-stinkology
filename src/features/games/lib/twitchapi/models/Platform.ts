/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlatformCategoryEnums } from "./PlatformCategoryEnums";
import type { PlatformFamily_properties_id } from "./PlatformFamily_properties_id";
import type { PlatformLogo_properties_id } from "./PlatformLogo_properties_id";
import type { PlatformVersion_properties_id } from "./PlatformVersion_properties_id";
import type { PlatformWebsite_properties_id } from "./PlatformWebsite_properties_id";

/**
 * The hardware used to run the game or game delivery network
 */
export type Platform = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * An abbreviation of the platform name
   */
  abbreviation?: string;
  /**
   * An alternative name for the platform
   */
  alternative_name?: string;
  category?: PlatformCategoryEnums;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * The generation of the platform
   */
  generation?: number;
  /**
   * The name of the platform
   */
  name?: string;
  platform_family?: PlatformFamily_properties_id;
  platform_logo?: PlatformLogo_properties_id;
  /**
   * A url-safe, unique, lower-case version of the name
   */
  slug?: string;
  /**
   * The summary of the first Version of this platform
   */
  summary?: string;
  /**
   * Date this was last updated in the IGDB database
   */
  updated_at?: number;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  versions?: Array<PlatformVersion_properties_id>;
  websites?: Array<PlatformWebsite_properties_id>;
  /**
   * Hash of the object
   */
  checksum?: string;
};
