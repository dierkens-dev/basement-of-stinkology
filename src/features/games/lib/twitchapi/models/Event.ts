/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventLogo_properties_id } from "./EventLogo_properties_id";
import type { EventNetwork_properties_id } from "./EventNetwork_properties_id";
import type { Games_properties_id } from "./Games_properties_id";
import type { GameVideo_properties_id } from "./GameVideo_properties_id";

/**
 * Gaming events like GamesCom, Tokyo Game Show, PAX, or GSL
 */
export type Event = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  /**
   * The name of the event
   */
  name?: string;
  /**
   * The description of the event
   */
  description?: string;
  /**
   * A url-safe, unique, lower-case version of the name
   */
  slug?: string;
  event_logo?: EventLogo_properties_id;
  /**
   * Start time of the event in UTC
   */
  start_time?: number;
  /**
   * End time of the event in UTC
   */
  end_time?: number;
  /**
   * Timezone the event is in.
   */
  time_zone?: string;
  /**
   * URL to the livestream of the event.
   */
  live_stream_url?: string;
  games?: Array<Games_properties_id>;
  videos?: Array<GameVideo_properties_id>;
  event_networks?: Array<EventNetwork_properties_id>;
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
