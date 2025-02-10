/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Company_properties_id } from "./Company_properties_id";
import type { GameEngineLogo_properties_id } from "./GameEngineLogo_properties_id";
import type { Platform_properties_id } from "./Platform_properties_id";

/**
 * Video game engines such as unreal engine
 */
export type GameEngine = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  companies?: Array<Company_properties_id>;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * Description of the game engine
   */
  description?: string;
  /**
   * Logo of the game engine
   */
  logo?: GameEngineLogo_properties_id;
  /**
   * Name of the game engine
   */
  name?: string;
  /**
   * Platforms this game engine was deployed on
   */
  platforms?: Array<Platform_properties_id>;
  /**
   * A url-safe, unique, lower-case version of the name
   */
  slug?: string;
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
