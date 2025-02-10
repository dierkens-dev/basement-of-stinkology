/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AgeRatingCategoryEnums } from "./AgeRatingCategoryEnums";
import type { AgeRatingContentDescription_properties_id } from "./AgeRatingContentDescription_properties_id";
import type { AgeRatingEnums } from "./AgeRatingEnums";

export type AgeRating = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  category?: AgeRatingCategoryEnums;
  /**
   * Array of Age Rating Content Description IDs
   */
  content_descriptions?: Array<AgeRatingContentDescription_properties_id>;
  rating?: AgeRatingEnums;
  /**
   * The url for the image of an age rating
   */
  rating_cover_url?: string;
  /**
   * A free text motivating a rating
   */
  synopsis?: string;
  /**
   * Hash of the object
   */
  checksum?: string;
};
