import React, {useContext} from 'react';
import {TweetFeedContext} from "../provider/TweetProvider";
import TweetContainer from "./TweetContainer";

const TweetsContainer = () =>
{
    const {state} = useContext(TweetFeedContext);
    const { tweets } = state;
    return (
        <div>
            {
                tweets.map(tweet => <TweetContainer key={tweet.id} tweet={tweet}/>)
            }
        </div>
    );
}

export default TweetsContainer;