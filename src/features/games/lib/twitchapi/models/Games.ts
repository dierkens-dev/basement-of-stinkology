/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AgeRatingEnums } from "./AgeRatingEnums";
import type { AlternativeNames_properties_id } from "./AlternativeNames_properties_id";
import type { Artwork_properties_id } from "./Artwork_properties_id";
import type { Collection_properties_id } from "./Collection_properties_id";
import type { Company_properties_id } from "./Company_properties_id";
import type { Cover_properties_id } from "./Cover_properties_id";
import type { ExternalGame_properties_id } from "./ExternalGame_properties_id";
import type { GameCategoryEnums } from "./GameCategoryEnums";
import type { GameEngine_properties_id } from "./GameEngine_properties_id";
import type { GameLocalization_properties_id } from "./GameLocalization_properties_id";
import type { GameMode_properties_id } from "./GameMode_properties_id";
import type { Games_properties_id } from "./Games_properties_id";
import type { GameStatusEnums } from "./GameStatusEnums";
import type { GameVideo_properties_id } from "./GameVideo_properties_id";
import type { Genre_properties_id } from "./Genre_properties_id";
import type { Keyword_properties_id } from "./Keyword_properties_id";
import type { LanguageSupport_properties_id } from "./LanguageSupport_properties_id";
import type { MultiplayerMode_properties_id } from "./MultiplayerMode_properties_id";
import type { Platform_properties_id } from "./Platform_properties_id";
import type { PlayerPerspective_properties_id } from "./PlayerPerspective_properties_id";
import type { ReleaseDate_properties_id } from "./ReleaseDate_properties_id";
import type { Screenshot_properties_id } from "./Screenshot_properties_id";
import type { Theme_properties_id } from "./Theme_properties_id";
import type { Website_properties_id } from "./Website_properties_id";

/**
 * Video Games!
 */
export type Games = {
  /**
   * The IGDB object unique identifier
   */
  id?: number;
  age_ratings?: Array<AgeRatingEnums>;
  /**
   * Rating based on external critic scores
   */
  aggregated_rating?: number;
  /**
   * Number of external critic scores
   */
  aggregated_rating_count?: number;
  alternative_names?: Array<AlternativeNames_properties_id>;
  artworks?: Array<Artwork_properties_id>;
  bundles?: Array<Games_properties_id>;
  category?: GameCategoryEnums;
  collections?: Array<Collection_properties_id>;
  cover?: Cover_properties_id;
  /**
   * Date this was initially added to the IGDB database
   */
  created_at?: number;
  dlcs?: Array<Games_properties_id>;
  expanded_games?: Array<Games_properties_id>;
  expansions?: Array<Games_properties_id>;
  external_games?: Array<ExternalGame_properties_id>;
  /**
   * The first release date for this game
   */
  first_release_date?: number;
  forks?: Array<Games_properties_id>;
  /**
   * The main franchise
   */
  franchise?: string;
  /**
   * Other franchises the game belongs to
   */
  franchises?: Array<Games_properties_id>;
  /**
   * The game engine used in this game
   */
  game_engines?: Array<GameEngine_properties_id>;
  /**
   * Supported game localizations for this game. A region can have at most one game localization for a given game
   */
  game_localizations?: Array<GameLocalization_properties_id>;
  /**
   * Modes of gameplay
   */
  game_modes?: Array<GameMode_properties_id>;
  /**
   * Genres of the game
   */
  genres?: Array<Genre_properties_id>;
  /**
   * Number of follows a game gets before release
   */
  hypes?: number;
  /**
   * Companies who developed this game
   */
  involved_companies?: Array<Company_properties_id>;
  /**
   * Associated keywords
   */
  keywords?: Array<Keyword_properties_id>;
  /**
   * Supported Languages for this game
   */
  language_supports?: Array<LanguageSupport_properties_id>;
  /**
   * Multiplayer modes for this game
   */
  multiplayer_modes?: Array<MultiplayerMode_properties_id>;
  /**
   * The name of the Game
   */
  name?: string;
  /**
   * If a DLC, expansion or part of a bundle, this is the main game or bundle
   */
  parent_game?: Games_properties_id;
  /**
   * Platforms this game was released on
   */
  platforms?: Array<Platform_properties_id>;
  /**
   * The main perspective of the player
   */
  player_perspectives?: Array<PlayerPerspective_properties_id>;
  /**
   * Ports of this game
   */
  ports?: Array<Games_properties_id>;
  /**
   * Average IGDB user rating
   */
  rating?: number;
  /**
   * Total number of IGDB user ratings
   */
  rating_count?: number;
  /**
   * Release dates of this game
   */
  release_dates?: Array<ReleaseDate_properties_id>;
  /**
   * Remakes of this game
   */
  remakes?: Array<Games_properties_id>;
  /**
   * Remasters of this game
   */
  remasters?: Array<Games_properties_id>;
  /**
   * Screenshots of this game
   */
  screenshots?: Array<Screenshot_properties_id>;
  /**
   * Similar games
   */
  similar_games?: Array<Games_properties_id>;
  /**
   * A url-safe, unique, lower-case version of the name
   */
  slug?: string;
  /**
   * Standalone expansions of this game
   */
  standalone_expansions?: Array<Games_properties_id>;
  status?: GameStatusEnums;
  /**
   * A short description of a games story
   */
  storyline?: string;
  /**
   * A description of the game
   */
  summary?: string;
  /**
   * Related entities in the IGDB API
   */
  tags?: Array<number>;
  /**
   * Themes of the game
   */
  themes?: Array<Theme_properties_id>;
  /**
   * Average rating based on both IGDB user and external critic scores
   */
  total_rating?: number;
  /**
   * Total number of user and external critic scores
   */
  total_rating_count?: number;
  /**
   * The last date this entry was updated in the IGDB database
   */
  updated_at?: number;
  /**
   * The website address (URL) of the item
   */
  url?: string;
  /**
   * If a version, this is the main game
   */
  version_parent?: Array<Games_properties_id>;
  /**
   * Title of this version (i.e Gold edition)
   */
  version_title?: string;
  /**
   * Videos of this game
   */
  videos?: Array<GameVideo_properties_id>;
  /**
   * Websites associated with this game
   */
  websites?: Array<Website_properties_id>;
  /**
   * Hash of the object
   */
  checksum?: string;
};
