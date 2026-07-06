const updateFeeds = (state) => {
  console.log("checking feeds...");

  setTimeout(() => {
    updateFeeds(state);
  }, 5000);
};

export default updateFeeds;
