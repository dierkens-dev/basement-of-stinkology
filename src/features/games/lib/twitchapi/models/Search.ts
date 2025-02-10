/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Character_properties_id } from "./Character_properties_id";
import type { Collection_properties_id } from "./Collection_properties_id";
import type { Company_properties_id } from "./Company_properties_id";
import type { Games_properties_id } from "./Games_properties_id";
import type { Platform_properties_id } from "./Platform_properties_id";
import type { Theme_properties_id } from "./Theme_properties_id";

/**
 * Search IGDB and get the IDs of items matching your search
 */
export type Search = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  alternative_name?: string;
  character?: Character_properties_id;
  collection?: Collection_properties_id;
  company?: Company_properties_id;
  description?: string;
  game?: Games_properties_id;
  name?: string;
  platform?: Platform_properties_id;
  /**
   * The date this item was initally published by the third party
   */
  published_at?: number;
  /**
   * Reference ID for Test Dummy
   */
  test_dummy?: number;
  theme?: Theme_properties_id;
  /**
   * Hash of the object
   */
  checksum?: string;
};
