/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Games_properties_id } from "./Games_properties_id";

/**
 * A video associated with a game
 */
export type GameVideo = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  game?: Games_properties_id;
  /**
   * The name of the video
   */
  name?: string;
  /**
   * The external ID of the video (usually youtube)
   */
  video_id?: string;
  /**
   * Hash of the object
   */
  checksum?: string;
};
