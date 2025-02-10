/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";
import type { PopularityPrimitiveEnum } from "./PopularityPrimitiveEnum";
import type { PopularityTypes_properties_id } from "./PopularityTypes_properties_id";

/**
 * Lists abailable primatives with their source and popularity type
 */
export type PopularityPrimatives = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  game_id?: Games_properties_id;
  popularity_type?: PopularityTypes_properties_id;
  popularity_source?: PopularityPrimitiveEnum;
  /**
   * The rating value
   */
  value?: number;
  /**
   * Timestamp of when the primatives were calculated
   */
  calculated_at?: number;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * Date this was last updated in the IGDB database
   */
  updated_at?: number;
};
