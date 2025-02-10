/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Company_properties_id } from "./Company_properties_id";

/**
 * Involved companies
 */
export type InvolvedCompany = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  company?: Company_properties_id;
  /**
   * Date this was initally added to the IGDB database
   */
  created_at?: number;
  /**
   * Is the company a/the developer?
   */
  developer?: boolean;
  game?: Company_properties_id;
  /**
   * Did the company port the game?
   */
  porting?: boolean;
  /**
   * Did the company publish the game?
   */
  publisher?: boolean;
  /**
   * Did the company suppport the game?
   */
  supporting?: boolean;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
