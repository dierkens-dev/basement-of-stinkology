/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlatformWebsiteCategoryEnums } from "./PlatformWebsiteCategoryEnums";

/**
 * The main website for the platform
 */
export type PlatformWebsite = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  category?: PlatformWebsiteCategoryEnums;
  trusted?: boolean;
  /**
   * The main platform address (URL) of the platform
   */
  url?: string;
  /**
   * Hash of the object
   */
  checksum?: string;
};
