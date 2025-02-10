/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PopularityTypeEnum } from "./PopularityTypeEnum";

/**
 * Describes what type of popularity primative or popularity indicator the popularity indicator the popularity value is
 */
export type PopularityTypes = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  popularity_source?: PopularityTypeEnum;
  /**
   * The name of the type of popularity from the source
   */
  name?: string;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * Date this was last updated in the IGDB database
   */
  updated_at?: number;
  /**
   * The IGDB object unique identifier
   */
  checksum?: string;
};
