import { TwitchAPIClient } from "./twitchapi";

// invariant(process.env.BOS_TENANT_ID, "BOS_TENANT_ID should be set");

export const twitchApiClient = new TwitchAPIClient({
  TOKEN: process.env.BOS_TWITCH_TOKEN,
});
