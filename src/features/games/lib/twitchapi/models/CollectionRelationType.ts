/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionType_properties_id } from "./CollectionType_properties_id";

/**
 * Enums for collection membership type
 */
export type CollectionRelationType = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * The membership type name
   */
  name?: string;
  /**
   * Description of the membership type
   */
  description?: string;
  allowed_child_type?: CollectionType_properties_id;
  allowed_parent_type?: CollectionType_properties_id;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
  /**
   * Date this was initally added to the IGDB database
   */
  created_at?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
