/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";

/**
 * The cover art of games
 */
export type Cover = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  alpha_channel?: boolean;
  animated?: boolean;
  /**
   * The game this cover is associated with. If it is empty then this cover belongs to a game_localization, which can be found under game_localization field
   */
  game?: Games_properties_id;
  /**
   * Reference ID for Game Localization this cover might be associated with
   */
  game_localization?: string;
  /**
   * The height of the image in pixels
   */
  height?: number;
  /**
   * The ID of the image used to construct an IGDB image link
   */
  image_id?: string;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  /**
   * The width of the image in pixels
   */
  width?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
