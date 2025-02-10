/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgeRating } from "../models/AgeRating";
import type { AgeRatingContentDescription } from "../models/AgeRatingContentDescription";
import type { AlternativeNames } from "../models/AlternativeNames";
import type { Artwork } from "../models/Artwork";
import type { Character } from "../models/Character";
import type { CharacterMugShot } from "../models/CharacterMugShot";
import type { Collection } from "../models/Collection";
import type { CollectionMembership } from "../models/CollectionMembership";
import type { CollectionMembershipType } from "../models/CollectionMembershipType";
import type { CollectionRelation } from "../models/CollectionRelation";
import type { CollectionRelationType } from "../models/CollectionRelationType";
import type { CollectionType } from "../models/CollectionType";
import type { Company } from "../models/Company";
import type { CompanyLogo } from "../models/CompanyLogo";
import type { CompanyWebsite } from "../models/CompanyWebsite";
import type { Cover } from "../models/Cover";
import type { Event } from "../models/Event";
import type { EventLogo } from "../models/EventLogo";
import type { EventNetwork } from "../models/EventNetwork";
import type { ExternalGame } from "../models/ExternalGame";
import type { Franchise } from "../models/Franchise";
import type { GameEngine } from "../models/GameEngine";
import type { GameEngineLogo } from "../models/GameEngineLogo";
import type { GameLocalization } from "../models/GameLocalization";
import type { GameMode } from "../models/GameMode";
import type { Games } from "../models/Games";
import type { GameTimeToBeat } from "../models/GameTimeToBeat";
import type { GameVersion } from "../models/GameVersion";
import type { GameVersionFeatures } from "../models/GameVersionFeatures";
import type { GameVersionFeatureValue } from "../models/GameVersionFeatureValue";
import type { GameVideo } from "../models/GameVideo";
import type { Genre } from "../models/Genre";
import type { InvolvedCompany } from "../models/InvolvedCompany";
import type { Keyword } from "../models/Keyword";
import type { Language } from "../models/Language";
import type { LanguageSupport } from "../models/LanguageSupport";
import type { LanguageSupportType } from "../models/LanguageSupportType";
import type { MultiplayerMode } from "../models/MultiplayerMode";
import type { NetworkType } from "../models/NetworkType";
import type { Platform } from "../models/Platform";
import type { PlatformFamily } from "../models/PlatformFamily";
import type { PlatformLogo } from "../models/PlatformLogo";
import type { PlatformVersion } from "../models/PlatformVersion";
import type { PlatformVersionCompany } from "../models/PlatformVersionCompany";
import type { PlatformVersionReleaseDate } from "../models/PlatformVersionReleaseDate";
import type { PlatformWebsite } from "../models/PlatformWebsite";
import type { PlayerPerspective } from "../models/PlayerPerspective";
import type { PopularityPrimatives } from "../models/PopularityPrimatives";
import type { PopularityTypes } from "../models/PopularityTypes";
import type { Region } from "../models/Region";
import type { ReleaseDate } from "../models/ReleaseDate";
import type { ReleaseDateStatus } from "../models/ReleaseDateStatus";
import type { Screenshot } from "../models/Screenshot";
import type { Search } from "../models/Search";
import type { Theme } from "../models/Theme";
import type { Website } from "../models/Website";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class EndpointsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Age Rating according to various rating organizations
   * @returns AgeRating Success
   * @throws ApiError
   */
  public retrieveAgeRating({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<AgeRating>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/age_ratings",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Age Rating Descriptors
   * @returns AgeRatingContentDescription Success
   * @throws ApiError
   */
  public retrieveAgeRatingContentDescription({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<AgeRatingContentDescription>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/age_rating_content_descriptions",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Alternative and international game titles
   * @returns AlternativeNames Success
   * @throws ApiError
   */
  public retrieveAlternativeNames({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<AlternativeNames>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/alternative_names",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Official artworks (resolution and aspect ratio may vary)
   * @returns Artwork Success
   * @throws ApiError
   */
  public retreiveArtwork({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Artwork>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/artworks",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Video game characters
   * @returns Character Success
   * @throws ApiError
   */
  public retreiveCharacter({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Character>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/characters",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Images depicting game characters
   * @returns CharacterMugShot Success
   * @throws ApiError
   */
  public retreiveCharacterMugShot({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<CharacterMugShot>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/character_mug_shots",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Collection, AKA Series
   * @returns Collection Success
   * @throws ApiError
   */
  public retreiveCollection({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Collection>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/collections",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * The Collection Memberships.
   * @returns CollectionMembership Success
   * @throws ApiError
   */
  public retreiveCollectionMembership({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<CollectionMembership>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/collection_memberships",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Enums for collection membership types.
   * @returns CollectionMembershipType Success
   * @throws ApiError
   */
  public retreiveCollectionMembershipType({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<CollectionMembershipType>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/collection_membership_types",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Describes Relationship between Collections.
   * @returns CollectionRelation Success
   * @throws ApiError
   */
  public retreiveCollectionRelation({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<CollectionRelation>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/collection_relations",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Collection Relation Types
   * @returns CollectionRelationType Success
   * @throws ApiError
   */
  public retreiveCollectionRelationType({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<CollectionRelationType>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/collection_relation_types",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Enums for collection types.
   * @returns CollectionType Success
   * @throws ApiError
   */
  public retreiveCollectionType({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<CollectionType>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/collection_types",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Video game companies. Both publishers & developers
   * @returns Company Success
   * @throws ApiError
   */
  public retreiveCompany({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Company>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/companies",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * The logos of developers and publishers
   * @returns CompanyLogo Success
   * @throws ApiError
   */
  public retreiveCompanyLogo({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<CompanyLogo>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/company_logos",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Company Websites
   * @returns CompanyWebsite Success
   * @throws ApiError
   */
  public retreiveCompanyWebsite({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<CompanyWebsite>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/company_websites",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * The cover art of games
   * @returns Cover Success
   * @throws ApiError
   */
  public retreiveCover({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Cover>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/covers",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Gaming event like GamesCom, Tokyo Game Show, PAX or GSL
   * @returns Event Success
   * @throws ApiError
   */
  public retreiveEvents({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Event>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/events",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Logo for the event
   * @returns EventLogo Success
   * @throws ApiError
   */
  public retreiveEventLogo({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<EventLogo>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/event_logos",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Urls related to the event like twitter, facebook and youtube
   * @returns EventNetwork Success
   * @throws ApiError
   */
  public retreiveEventNetwork({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<EventNetwork>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/event_networks",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * A list of video game franchises such as Star Wars.
   * @returns Franchise Success
   * @throws ApiError
   */
  public retreiveFranchise({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Franchise>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/franchises",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Video Games!
   * @returns Games Success
   * @throws ApiError
   */
  public retreiveGames({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Games>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/games",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Video game engines such as unreal engine.
   * @returns GameEngine Success
   * @throws ApiError
   */
  public retreiveGameEngine({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<GameEngine>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/game_engines",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * The logos of game engines
   * @returns GameEngineLogo Success
   * @throws ApiError
   */
  public retreiveGameEngineLogo({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<GameEngineLogo>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/game_engine_logos",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Game IDs on other services
   * @returns ExternalGame Success
   * @throws ApiError
   */
  public retreiveExternalGame({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<ExternalGame>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/external_games",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Details about game editions and versions.
   * @returns GameVersion Success
   * @throws ApiError
   */
  public retreiveGameVersion({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<GameVersion>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/game_versions",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Single player, Multiplayer etc
   * @returns GameMode Success
   * @throws ApiError
   */
  public retreiveGameMode({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<GameMode>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/game_modes",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Single player, Multiplayer etc
   * @returns GameTimeToBeat Success
   * @throws ApiError
   */
  public retreiveGameTimeToBeat({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<GameTimeToBeat>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/game_time_to_beats",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Features and descriptions of what makes each version/edition different from the main game
   * @returns GameVersionFeatures Success
   * @throws ApiError
   */
  public retreiveVersionFeatures({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<GameVersionFeatures>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/game_version_features",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * The bool/text value of the feature
   * @returns GameVersionFeatureValue Success
   * @throws ApiError
   */
  public retreiveVersionFeatureValue({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<GameVersionFeatureValue>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/game_version_feature_values",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Genres of video game
   * @returns Genre Success
   * @throws ApiError
   */
  public retreiveGenre({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Genre>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/genres",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Companies involved with the game
   * @returns InvolvedCompany Success
   * @throws ApiError
   */
  public retreiveInvolvedCompany({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<InvolvedCompany>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/involved_companies",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * A video associated with a game
   * @returns GameVideo Success
   * @throws ApiError
   */
  public retreiveGameVideo({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<GameVideo>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/game_videos",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Keywords are words or phrases that get tagged to a game such as “world war 2” or “steampunk”.
   * @returns Keyword Success
   * @throws ApiError
   */
  public retreiveKeyword({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Keyword>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/keywords",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Languages that are used in the Language Support endpoint.
   * @returns Language Success
   * @throws ApiError
   */
  public retreiveLanguage({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Language>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/languages",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Game localization for a game
   * @returns GameLocalization Success
   * @throws ApiError
   */
  public retreiveGameLocalization({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<GameLocalization>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/game_localizations",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Language Support Types contains the identifiers for the support types that Language Support uses.
   * @returns LanguageSupportType Success
   * @throws ApiError
   */
  public retreiveLanguageSupportType({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<LanguageSupportType>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/language_support_types",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Data about the supported multiplayer types
   * @returns MultiplayerMode Success
   * @throws ApiError
   */
  public retreiveMultiplayerMode({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<MultiplayerMode>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/multiplayer_modes",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Games can be played with different languages for voice acting, subtitles, or the interface language.
   * @returns LanguageSupport Success
   * @throws ApiError
   */
  public retreiveLanguageSupport({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<LanguageSupport>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/language_supports",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Social networks related to the event like twitter, facebook and youtube
   * @returns NetworkType Success
   * @throws ApiError
   */
  public retreiveNetworkType({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<NetworkType>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/network_types",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * A collection of closely related platforms
   * @returns PlatformFamily Success
   * @throws ApiError
   */
  public retreivePlatformFamily({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<PlatformFamily>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/platform_families",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Logo for a platform
   * @returns PlatformLogo Success
   * @throws ApiError
   */
  public retreivePlatformLogo({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<PlatformLogo>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/platform_logos",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * The platform's version
   * @returns PlatformVersion Success
   * @throws ApiError
   */
  public retreivePlatformVersion({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<PlatformVersion>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/platform_versions",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * A platform developer
   * @returns PlatformVersionCompany Success
   * @throws ApiError
   */
  public retreivePlatformVersionCompany({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<PlatformVersionCompany>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/platform_version_companies",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * The hardware used to run the game or game delivery network
   * @returns Platform Success
   * @throws ApiError
   */
  public retreivePlatform({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Platform>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/platforms",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * A handy endpoint that extends platform release dates. Used to dig deeper into release dates, platforms and versions.
   * @returns PlatformVersionReleaseDate Success
   * @throws ApiError
   */
  public retreivePlatformVersionReleaseDate({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<PlatformVersionReleaseDate>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/platform_version_release_dates",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * The main website for the platform
   * @returns PlatformWebsite Success
   * @throws ApiError
   */
  public retreivePlatformWebsite({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<PlatformWebsite>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/platform_websites",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Player perspectives describe the view/perspective of the player in a video game.
   * @returns PlayerPerspective Success
   * @throws ApiError
   */
  public retreivePlayerPerspective({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<PlayerPerspective>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/player_perspectives",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * This endpoint lists available primitives with their source and popularity type.
   * @returns PopularityPrimatives Success
   * @throws ApiError
   */
  public retreivePopularityPrimatives({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<PopularityPrimatives>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/popularity_primatives",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * This describes what type of popularity primitive or popularity indicator the popularity value is.
   * @returns PopularityTypes Success
   * @throws ApiError
   */
  public retreivePopularityType({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<PopularityTypes>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/popularity_types",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Region for game localization
   * @returns Region Success
   * @throws ApiError
   */
  public retreiveRegion({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Region>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/regions",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * A handy endpoint that extends game release dates. Used to dig deeper into release dates, platforms and versions.
   * @returns ReleaseDate Success
   * @throws ApiError
   */
  public retreiveReleaseDate({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<ReleaseDate>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/release_dates",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * An endpoint to provide definition of all of the current release date statuses.
   * @returns ReleaseDateStatus Success
   * @throws ApiError
   */
  public retreiveReleaseDateStatus({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<ReleaseDateStatus>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/release_date_statuses",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Screenshots of games
   * @returns Screenshot Success
   * @throws ApiError
   */
  public retreiveScreenshot({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Screenshot>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/screenshots",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Search IGDB!
   * @returns Search Success
   * @throws ApiError
   */
  public retreiveSearch({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Search>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/search",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Video game themes
   * @returns Theme Success
   * @throws ApiError
   */
  public retreiveTheme({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Theme>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/themes",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * A website url, usually associated with a game
   * @returns Website Success
   * @throws ApiError
   */
  public retreiveWebsite({
    requestBody,
  }: {
    requestBody?: string;
  }): CancelablePromise<Array<Website>> {
    return this.httpRequest.request({
      method: "POST",
      url: "/websites",
      body: requestBody,
      mediaType: "text/plain",
      errors: {
        400: `Bad Request`,
        401: `Authorization Failure`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
