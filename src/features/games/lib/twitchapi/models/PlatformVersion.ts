/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlatformLogo_properties_id } from "./PlatformLogo_properties_id";
import type { PlatformVersionCompany_properties_id } from "./PlatformVersionCompany_properties_id";
import type { PlatformVersionReleaseDate_properties_id } from "./PlatformVersionReleaseDate_properties_id";

/**
 * The specific platform and the specifications (Xbox Series X, Playstation 5)
 */
export type PlatformVersion = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  companies?: Array<PlatformVersionCompany_properties_id>;
  /**
   * The network capabilities
   */
  connectivity?: string;
  /**
   * The integrated central processing unit
   */
  cpu?: string;
  /**
   * The graphics chipset
   */
  graphics?: string;
  main_manufacturer?: PlatformVersionCompany_properties_id;
  /**
   * The type of media this version accepts
   */
  media?: string;
  /**
   * How much memory there is
   */
  memory?: string;
  /**
   * The name of the platform version
   */
  name?: string;
  /**
   * The online service, like Xbox Live
   */
  online?: string;
  /**
   * The operating system installed on the platform version
   */
  os?: string;
  /**
   * The output video rate
   */
  output?: string;
  platform_logo?: PlatformLogo_properties_id;
  platform_version_release_dates?: Array<PlatformVersionReleaseDate_properties_id>;
  /**
   * The maximum resolution
   */
  resolutions?: string;
  /**
   * A url-safe, unique, lower-case version of the name
   */
  slug?: string;
  /**
   * The sound chipset
   */
  sound?: string;
  /**
   * How much storage there is
   */
  storage?: string;
  /**
   * A short summary
   */
  summary?: string;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  /**
   * Hash of the object
   */
  checksum?: string;
};
