/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChangeDateCategoryEnum } from "./ChangeDateCategoryEnum";
import type { Company_properties_id } from "./Company_properties_id";
import type { CompanyLogo_properties_id } from "./CompanyLogo_properties_id";
import type { CompanyWebsite_properties_id } from "./CompanyWebsite_properties_id";
import type { Games_properties_id } from "./Games_properties_id";
import type { StartDateCategoryEnum } from "./StartDateCategoryEnum";

/**
 * Video game companies, both publishers and developers
 */
export type Company = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  change_date_category?: ChangeDateCategoryEnum;
  /**
   * The date when a compnay got a new ID
   */
  change_date?: number;
  /**
   * The new ID for a company that has gone through a merger or restructuring
   */
  changed_company_id?: string;
  /**
   * ISO 3166-1 numeric country code
   */
  country?: number;
  /**
   * Date this was initally added to the IGDB database
   */
  created_at?: number;
  /**
   * A free text description of the company
   */
  description?: string;
  developed?: Array<Games_properties_id>;
  logo?: CompanyLogo_properties_id;
  /**
   * The name of the company
   */
  name?: string;
  parent?: Company_properties_id;
  published?: Array<Games_properties_id>;
  /**
   * A url-safe, unique, lower-case version of the name
   */
  slug?: string;
  /**
   * The date that the company was founded
   */
  start_date?: number;
  start_date_category?: StartDateCategoryEnum;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  websites?: Array<CompanyWebsite_properties_id>;
  /**
   * Hash of the object
   */
  checksum?: string;
};
