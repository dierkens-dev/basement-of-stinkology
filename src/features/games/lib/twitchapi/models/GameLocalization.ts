/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Cover_properties_id } from "./Cover_properties_id";
import type { Games_properties_id } from "./Games_properties_id";
import type { Region_properties_id } from "./Region_properties_id";

/**
 * Game localization for a game
 */
export type GameLocalization = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * The localized name
   */
  name?: string;
  game?: Games_properties_id;
  /**
   * Date this was initially added to the IGDB database
   */
  cover?: Cover_properties_id;
  /**
   * The region ID
   */
  region?: Region_properties_id;
  created_at?: number;
  /**
   * Date this was last updated in the IGDB database
   */
  updated_at?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
