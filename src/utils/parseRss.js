import { v4 as uuidv4 } from "uuid";

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
      id: uuidv4(),
      title: item.querySelector("title").textContent,
      description: item.querySelector("description")?.textContent ?? "",
      link: item.querySelector("link").textContent,
    }));

  return { feed, posts };
};

export default parseRss;
