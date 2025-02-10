/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";
import type { Language_properties_id } from "./Language_properties_id";
import type { LanguageSupportType_properties_id } from "./LanguageSupportType_properties_id";

/**
 * Games can be played with different languages for voice acting, subtitles, or the interface language.
 */
export type LanguageSupport = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  game?: Games_properties_id;
  language?: Language_properties_id;
  language_support_type?: LanguageSupportType_properties_id;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * Date this was last updated in the IGDB database
   */
  updated_at?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
