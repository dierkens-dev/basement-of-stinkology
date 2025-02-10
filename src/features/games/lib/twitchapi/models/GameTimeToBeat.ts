/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";

/**
 * Average time to beat times for a game.
 */
export type GameTimeToBeat = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  game_id?: Games_properties_id;
  /**
   * Average time (in seconds) to finish the game to its credits without spending notable time on extras such as side quests.
   */
  hastily?: number;
  /**
   * Average time (in seconds) to finish the game while mixing in some extras such as side quests without being overly thorough.
   */
  normally?: number;
  /**
   * Average time (in seconds) to finish the game to 100% completion.
   */
  completely?: number;
  /**
   * Total number of time to beat submissions for this game
   */
  count?: number;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
