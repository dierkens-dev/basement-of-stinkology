/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionRelation_properties_id } from "./CollectionRelation_properties_id";
import type { CollectionType_properties_id } from "./CollectionType_properties_id";
import type { Games_properties_id } from "./Games_properties_id";

/**
 * Collection, AKA Series
 */
export type Collection = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  as_child_relations?: Array<CollectionRelation_properties_id>;
  as_parent_relations?: Array<CollectionRelation_properties_id>;
  /**
   * Date this was initally added to the IGDB database
   */
  created_at?: number;
  games?: Array<Games_properties_id>;
  /**
   * Umbrella term for a collection of games
   */
  name?: string;
  /**
   * A url-safe, unique, lower-case version of the name
   */
  slug?: string;
  type?: CollectionType_properties_id;
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
