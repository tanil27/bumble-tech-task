import React from 'react';

const dateFormatter = (date) =>
{
    // something more robust here like a string configurator ... dd/mm/yyyy or ddd mmm yyyy etc.
    // ...beyond scope
    return new Date(date).toGMTString();
}

const TweetContainer = ({ tweet }) =>
{
    /*TODO: Sub components for each element in view - beyond scope somewhat so will leave it like this*/
    // styling not included so just put some inline for the image to display could go with something more formal, like css
    // or sass generators or any react style type framework.
    return (
        <div>
            <div>
                <img style={{width: '75px', height: '75px'}} alt={tweet.id+"_"+tweet.username} src={tweet.image}/>
                <span>{tweet.username}</span>
            </div>
            <div>
                {tweet.text}
            </div>
            <div>
                {dateFormatter(tweet.timeStamp)}
            </div>
        </div>
    );
};

export default TweetContainer;