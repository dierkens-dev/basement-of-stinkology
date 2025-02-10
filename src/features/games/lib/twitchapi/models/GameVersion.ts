/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";
import type { GameVersionFeatures_properties_id } from "./GameVersionFeatures_properties_id";

/**
 * Details about game editions and versions. (DLC and more)
 */
export type GameVersion = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * Features and descriptions of what makes each version/edition different from the main game
   */
  features?: Array<GameVersionFeatures_properties_id>;
  /**
   * The game these versions/editions are of
   */
  game?: Games_properties_id;
  /**
   * Game Versions and Editions
   */
  games?: Array<Games_properties_id>;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  /**
   * Hash of the object
   */
  checksum?: string;
};
