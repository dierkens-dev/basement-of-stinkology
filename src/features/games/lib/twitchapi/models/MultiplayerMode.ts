/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";
import type { Platform_properties_id } from "./Platform_properties_id";

/**
 * Data about the supported multiplayer types
 */
export type MultiplayerMode = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * True if the game supports campaign coop
   */
  camapigncoop?: boolean;
  /**
   * True if the game supports drop in/out multiplayer
   */
  dropin?: boolean;
  game?: Games_properties_id;
  /**
   * True if the game supports LAN coop
   */
  lancoop?: boolean;
  /**
   * True if the game supports offline coop
   */
  offlinecoop?: number;
  /**
   * Maximum number of offline players in offline coop
   */
  offliencoopmax?: number;
  /**
   * Maximum number of players in offline multiplayer
   */
  offlinemax?: number;
  /**
   * True if the game supports online coop
   */
  onlinecoop?: boolean;
  /**
   * Maximum number of online players in online coop
   */
  onlinecoopmax?: number;
  /**
   * Maximum number of online players in online coop
   */
  onlinemax?: number;
  platform?: Platform_properties_id;
  /**
   * True if the game supports, split screen, offline multiplayer
   */
  splitscreen?: boolean;
  /**
   * True if the game supports split screen, online multiplayer
   */
  splitscreenonline?: boolean;
  /**
   * Hash of the object
   */
  checksum?: string;
};
