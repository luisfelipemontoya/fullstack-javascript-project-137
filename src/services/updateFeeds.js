import loadFeed from "./loadFeed.js";
import parseRss from "../utils/parseRss.js";

const updateFeeds = (state) => {
  state.feeds.forEach((feed) => {
    loadFeed(feed.url)
      .then((response) => {
        const data = parseRss(response.data.contents);
        
        const existingLinks = state.posts.map((post) => post.link);

        const newPosts = data.posts.filter(
          (post) => !existingLinks.includes(post.link),
        );
        
        if (newPosts.length > 0) {
        state.posts.unshift(...newPosts);
        }        
      })
      .catch(() => {});
  });

  setTimeout(() => {
    updateFeeds(state);
  }, 5000);
};

export default updateFeeds;
