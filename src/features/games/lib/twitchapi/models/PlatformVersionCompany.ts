/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Company_properties_id } from "./Company_properties_id";

/**
 * A platform developer
 */
export type PlatformVersionCompany = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * Any notable comments about the developer
   */
  comment?: string;
  company?: Company_properties_id;
  /**
   * If the company is the developer
   */
  developer?: boolean;
  /**
   * If the company is the manufactuer
   */
  manufacturer?: boolean;
  /**
   * Hash of the object
   */
  checksum?: string;
};
