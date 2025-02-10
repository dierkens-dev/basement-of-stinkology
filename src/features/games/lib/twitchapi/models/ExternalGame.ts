/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExternalGameCategoryEnums } from "./ExternalGameCategoryEnums";
import type { ExternalGameMediaEnums } from "./ExternalGameMediaEnums";
import type { Games_properties_id } from "./Games_properties_id";
import type { Platform_properties_id } from "./Platform_properties_id";

/**
 * Game IDs on other services
 */
export type ExternalGame = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * The id of the other service
   */
  category?: ExternalGameCategoryEnums;
  /**
   * The ISO country code of the external game product.
   */
  countries?: Array<number>;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  game?: Games_properties_id;
  /**
   * The media of the external game.
   */
  media?: ExternalGameMediaEnums;
  /**
   * The name of the game according to the other service
   */
  name?: string;
  /**
   * The platform of the external game product.
   */
  platform?: Platform_properties_id;
  /**
   * The other services ID for this game
   */
  uid?: string;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  /**
   * The year in full (2018)
   */
  year?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
