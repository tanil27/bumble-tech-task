import React, {useEffect, useReducer} from 'react';
import tweetReducer from "../reducer/TweetReducer";
import api from "../constants/apiDefinitions";
import {updateFeed} from "../actions/TweetActions";

let timeSinceLastFeed = null;
let lastTweetId = -1;

const getFeed = async (url) =>
{
    //could handle with a retry count here to satisfy point 7. on spec but will ...
    // ... opt to just keep hitting server til a response is successful (200:OK)
    let retryCount = 0;
    let success = false;
    let tweets = [];
    while(!success)
    {
        try {
            const response = await fetch(url);
            if (response.status === 200) {
                tweets = await response.json();


                tweets.sort((a, b) => {
                    return a.id < b.id
                        ? 1
                        : a.id > b.id
                            ? -1
                            : 0;
                });

                if(lastTweetId > 0) {
                    //bridge gaps between requests .. point 6. in spec
                    const lastTweet = tweets[tweets.length - 1].id;
                    const gap = lastTweet - lastTweetId;
                    if (gap > 1) {
                        //gaps
                        console.log("BRIDGING GAP BETWEEN: ", lastTweet, " + ", gap);
                        const missedTweets = await getFeed(api.TWEETS_PRE_ID(lastTweet, gap));
                        tweets = [...tweets, ...missedTweets];
                    }
                }

                lastTweetId = tweets[0].id;
                success = true;
            }
        }
        catch (e)
        {
            console.error("some issue");
        }
        retryCount++;
    }
    return tweets;
}

const subscribeToTweetFeed = (dispatch) =>
{
    //ideally create a tick handler system but will do for the purpose here
    //... point 2. in spec
    setInterval(() => {
        getFeed(api.TWEETS_POST_PERIOD(timeSinceLastFeed)).then(r => dispatch(updateFeed(r)));
        timeSinceLastFeed = Date.now();
    }, 2000);
};


const TweetProvider = ({ initialState, children }) =>
{
    const [state, dispatch] = useReducer(tweetReducer, initialState);

    useEffect(() => {
        //get initial feed (point 1. in spec)
        timeSinceLastFeed = Date.now();
        getFeed(api.TWEETS_PRE_PERIOD(timeSinceLastFeed)).then(r => dispatch(updateFeed(r)));

        subscribeToTweetFeed(dispatch);
    },[dispatch]);

    return (
        <TweetFeedContext.Provider value={ {state, dispatch} }>
            { children }
        </TweetFeedContext.Provider>
    )
};

export const TweetFeedContext = React.createContext(null);
export default TweetProvider;
