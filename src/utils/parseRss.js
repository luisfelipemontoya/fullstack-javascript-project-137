const parseRss = (xml) => {
  const parser = new DOMParser();

  const document = parser.parseFromString(
    xml,
    "application/xml",
  );

  const parsingError = document.querySelector("parsererror");

  if (parsingError) {
    throw new Error("invalidRss");
  }

  const channel = document.querySelector("channel");

  const feed = {
    title: channel.querySelector("title").textContent,
    description: channel.querySelector("description").textContent,
  };

  const posts = [...document.querySelectorAll("item")]
    .map((item) => ({
      title: item.querySelector("title").textContent,
      link: item.querySelector("link").textContent,
    }));

  return { feed, posts };
};

export default parseRss;
