/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GameVersionFeatureCategoryEnums } from "./GameVersionFeatureCategoryEnums";
import type { GameVersionFeatures_properties_id } from "./GameVersionFeatures_properties_id";

/**
 * Features and descriptions of what makes each version/edition different from the main game
 */
export type GameVersionFeatures = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * The category of the feature description
   */
  category?: GameVersionFeatureCategoryEnums;
  /**
   * The description of the feature
   */
  description?: string;
  /**
   * Position of this feature in the list of features
   */
  position?: number;
  /**
   * The title of the version/addition/DLC
   */
  title?: string;
  /**
   * The bool/text value of the feature
   */
  values?: Array<GameVersionFeatures_properties_id>;
  /**
   * Hash of the object
   */
  checksum?: string;
};
