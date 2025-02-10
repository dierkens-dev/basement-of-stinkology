/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CharacterGenderEnum } from "./CharacterGenderEnum";
import type { CharacterMugShot_properties_id } from "./CharacterMugShot_properties_id";
import type { CharacterSpeciesEnum } from "./CharacterSpeciesEnum";
import type { Games_properties_id } from "./Games_properties_id";

/**
 * Video game characters
 */
export type Character = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * Alternative names for a character
   */
  akas?: Array<string>;
  /**
   * A Character's country of origin
   */
  country_name?: string;
  /**
   * Date this was initally added to the IGDB database
   */
  created_at?: number;
  /**
   * Text describing a character
   */
  description?: string;
  games?: Array<Games_properties_id>;
  gender?: CharacterGenderEnum;
  mug_shot?: CharacterMugShot_properties_id;
  /**
   * The character's name
   */
  name?: string;
  /**
   * A url-safe, unique, lower-case version of the name
   */
  slug?: string;
  species?: CharacterSpeciesEnum;
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
