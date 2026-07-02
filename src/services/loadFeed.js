import axios from 'axios';

const loadFeed = (url) => {
  const proxyUrl = new URL('https://allorigins.hexlet.app/get');

  proxyUrl.searchParams.set('disableCache', 'true');
  proxyUrl.searchParams.set('url', url);

  return axios.get(proxyUrl.toString());
};

export default loadFeed;
