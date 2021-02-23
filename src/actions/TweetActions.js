export const TWEET_UPDATED = "tweet-updated";

export function updateFeed(tweets)
{
    return {
        type: TWEET_UPDATED,
        payload: tweets
    };
}