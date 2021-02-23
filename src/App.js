import TweetProvider from "./provider/TweetProvider";
import TweetsContainer from "./container/TweetsContainer";

const store = {
  tweets: []
}

function App() {
  return (
      <TweetProvider initialState={store}>
        <TweetsContainer/>
      </TweetProvider>
  );
}

export default App;
