import {TWEET_UPDATED} from "../actions/TweetActions";

const APP_LIST_COUNT = 20;

const filterTweets = (tweets) =>
{
    let filteredList = {};
    //remove duplicates ... point 5. in spec
    for (let i = 0; i < tweets.length; i++)
    {
        const tweet = tweets[i];
        if (filteredList[tweet.id]) {
            if (filteredList[tweet.id].timestamp < tweet.timeStamp)
            {
                filteredList[tweet.id] = tweet;
            }
        }
        else
        {
            filteredList[tweet.id] = tweet;
        }
    }

    tweets = Object.values(filteredList);
    //sorted ... point 3. && 4. in spec
    tweets.sort((a, b) => {
        return a.timeStamp < b.timeStamp
            ? 1
            : a.timeStamp > b.timeStamp
                ? -1
                : 0;
    });
    //keep only top 20 - just for view but could split into a infinite scroll or pagination if wanted, beyond scope
    return tweets.slice(0, APP_LIST_COUNT);
}

const tweetReducer = (state = {}, action) =>
{
    switch (action.type)
    {
        case TWEET_UPDATED:
            return { ...state, tweets: filterTweets([...state.tweets, ...action.payload]) };
        break;
        default:
            //unhandled action
        break;
    }
    return state;
};


export default tweetReducer;