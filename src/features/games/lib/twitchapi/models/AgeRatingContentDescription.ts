/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AgeRatingContentDescriptionCategoryEnums } from "./AgeRatingContentDescriptionCategoryEnums";

export type AgeRatingContentDescription = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  category?: AgeRatingContentDescriptionCategoryEnums;
  /**
   * A string containing the age rating content descriptions
   */
  description?: string;
  /**
   * Hash of the object
   */
  checksum?: string;
};
