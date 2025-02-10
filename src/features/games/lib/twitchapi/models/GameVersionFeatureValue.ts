/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";
import type { GameVersionFeatures_properties_id } from "./GameVersionFeatures_properties_id";
import type { GameVersionIncludedFeatureEnums } from "./GameVersionIncludedFeatureEnums";

/**
 * The bool/text value of the feature
 */
export type GameVersionFeatureValue = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  game?: Games_properties_id;
  game_feature?: GameVersionFeatures_properties_id;
  included_feature?: GameVersionIncludedFeatureEnums;
  /**
   * The text value of this feature
   */
  note?: string;
  /**
   * Hash of the object
   */
  checksum?: string;
};
