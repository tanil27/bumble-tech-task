const BASE_URL = 'https://bumble-twitter-interview.herokuapp.com/tanil-patel';

//Putting this here in a constants type format but ideally could be moved to a network layer
// to expose request/response per api def.
// Batch requests as much as possible to avoid roundtrips, prefered to use these where the "TWEETS_PRE_ID" is a ...
// means to bridge any gaps between latency from pre/post timestamps requests. See TweetProvider.js for implementation

const api = {
    TWEETS_PRE_ID       : (id, count = 20) => `${BASE_URL}/api?count=${count}&beforeId=${id}`,
    TWEETS_POST_PERIOD  : (timestamp, count = 20) => `${BASE_URL}/api?count=${count}&afterTime=${timestamp}`,
    TWEETS_PRE_PERIOD   : (timestamp, count = 20) => `${BASE_URL}/api?count=${count}&beforeTime=${timestamp}`
}

export default api;