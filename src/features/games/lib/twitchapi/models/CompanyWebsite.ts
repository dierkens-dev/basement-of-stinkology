/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyWebsiteEnums } from "./CompanyWebsiteEnums";

/**
 * A company's website links
 */
export type CompanyWebsite = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  category?: CompanyWebsiteEnums;
  trusted?: boolean;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  /**
   * Hash of the object
   */
  checksum?: string;
};
