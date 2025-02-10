/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventNetwork_properties_id } from "./EventNetwork_properties_id";

/**
 * Social networks related to the event like twitter, facebook and youtube
 */
export type NetworkType = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * The name of the social network
   */
  name?: string;
  event_networks?: Array<EventNetwork_properties_id>;
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
