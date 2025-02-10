/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Collection_properties_id } from "./Collection_properties_id";
import type { CollectionRelationType_properties_id } from "./CollectionRelationType_properties_id";

/**
 * Describes relationship between collections
 */
export type CollectionRelation = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  child_collection?: Collection_properties_id;
  /**
   * Date this was initally added to the IGDB database
   */
  created_at?: number;
  parent_collection?: Collection_properties_id;
  type?: CollectionRelationType_properties_id;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
