/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Event_properties_id } from "./Event_properties_id";

/**
 * Logo for the event
 */
export type EventLogo = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  event?: Event_properties_id;
  alpha_channel?: boolean;
  animated?: boolean;
  /**
   * The height of the image in pixels
   */
  height?: number;
  /**
   * The ID of the image used to construct an IGDB image link
   */
  image_id?: string;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  /**
   * The width of the image in pixels
   */
  width?: number;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  /**
   * Hash of the object
   */
  checksum?: string;
};
