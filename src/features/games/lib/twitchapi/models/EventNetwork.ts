/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Event_properties_id } from "./Event_properties_id";
import type { NetworkType_properties_id } from "./NetworkType_properties_id";

/**
 * URLs related to the event like Twitter, Facebook, and Youtube
 */
export type EventNetwork = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  event?: Event_properties_id;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  network_type?: NetworkType_properties_id;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
