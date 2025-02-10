/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionMembershipType_properties_id } from "./CollectionMembershipType_properties_id";
import type { Games_properties_id } from "./Games_properties_id";

/**
 * The collection memberships
 */
export type CollectionMembership = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  game?: Games_properties_id;
  /**
   * Reference ID for Collection
   */
  collection?: string;
  type?: CollectionMembershipType_properties_id;
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
