/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionType_properties_id } from "./CollectionType_properties_id";

/**
 * Enums for collection membership type
 */
export type CollectionMembershipType = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  allowed_collection_type?: CollectionType_properties_id;
  /**
   * Hash of the object
   */
  checksum?: string;
  /**
   * Date this was initally added to the IGDB database
   */
  created_at?: number;
  /**
   * Description of the membership type
   */
  description?: string;
  /**
   * The membership type name
   */
  name?: string;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
};
