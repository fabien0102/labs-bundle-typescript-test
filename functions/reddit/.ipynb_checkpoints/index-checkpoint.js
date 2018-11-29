const { default: fetch } = require("node-fetch");
const http = require("http");
const {join} = require("path");
const getQueryParams = require("./utils/getQueryParams");

let invoked = 0;
let mock = require("./utils/mock");

http
  .createServer(async (req, res) => {
    console.time("Import React" + invoked);
    const React = require("react");
    const { renderToString } = require("react-dom/server");
    console.timeEnd("Import React" + invoked);

    const queryParams = getQueryParams(req);

    if (queryParams.fetch) {
      const rawMock = await fetch("https://reddit.com/r/" + queryParams.fetch + ".json");
      mock = await rawMock.json();
    }

    res.writeHead(200, { "content-type": "text/html" });
    res.end(
      '<link rel="stylesheet" href="/style.css">' +
        '<meta charset="utf-8">' +
        renderToString(
          React.createElement(
            "div",
            { className: "App" },
            React.createElement(
              "header",
              { className: "header" },
              React.createElement(
                "div",
                { className: "header__logo-container" },
                React.createElement("img", {
                  className: "header__logo",
                  alt: "Logo",
                  src: "https://logos-download.com/wp-content/uploads/2016/06/Reddit_logo_full_1.png",
                }),
              ),
              React.createElement(
                "div",
                { className: "header__search-container" },
                React.createElement(
                  "form",
                  {
                    action: "",
                  },
                  React.createElement("input", {
                    name: "fetch",
                    className: "header__search",
                    placeholder: "Enter a Subreddit...",
                  }),
                ),
              ),
              React.createElement(
                "div",
                { className: "header__user-area" },
                React.createElement(
                  "div",
                  null,
                  React.createElement("div", { className: "header__username" }, "evilrabbit"),
                  React.createElement(
                    "div",
                    { className: "header__karma-container" },
                    React.createElement("div", { className: "header__karma-thing" }),
                    React.createElement("div", { className: "header__karma-counter" }, "1 karma"),
                  ),
                ),
                React.createElement(
                  "div",
                  { className: "header__avatar-container" },
                  React.createElement("img", {
                    className: "header__avatar",
                    alt: "Evil Rabbit",
                    src: "https://pbs.twimg.com/profile_images/751015840464695296/atZxLCkV_400x400.jpg",
                  }),
                ),
              ),
            ),
            React.createElement(
              "main",
              { className: "main" },
              React.createElement(
                "div",
                { className: "section" },
                React.createElement("h6", { className: "section__heading" }, "Reddit Feeds"),
                React.createElement(
                  "ul",
                  { className: "section__list" },
                  React.createElement(
                    "li",
                    { className: "section__list-item" },
                    React.createElement("a", { href: "?fetch=" }, "Home"),
                  ),
                  React.createElement(
                    "li",
                    { className: "section__list-item" },
                    React.createElement("a", { href: "?fetch=all/popular" }, "Popular"),
                  ),
                  React.createElement(
                    "li",
                    { className: "section__list-item" },
                    React.createElement("a", { href: "?fetch=all/new" }, "New"),
                  ),
                  React.createElement(
                    "li",
                    { className: "section__list-item" },
                    React.createElement("a", { href: "?fetch=all/top" }, "Top"),
                  ),
                  React.createElement(
                    "li",
                    { className: "section__list-item" },
                    React.createElement("a", { href: "?fetch=all/controversial" }, "Controversial"),
                  ),
                ),
              ),
              React.createElement("div", null),
              React.createElement(
                "div",
                { className: "feed" },
                mock.data.children.map(function(_ref) {
                  var data = _ref.data;
                  return React.createElement(
                    "a",
                    { className: "feed__feed-link feed-link", href: data.url, target: "_blank" },
                    React.createElement(
                      "div",
                      { className: "feed__feed-item feed-item" },
                      React.createElement("div", { className: "feed-item__voting" }, data.ups - data.downs),
                      React.createElement("div", {
                        className: "feed-item__image-container",
                        style: { backgroundImage: "url(" + data.thumbnail },
                      }),
                      React.createElement(
                        "div",
                        { className: "feed-item__info" },
                        React.createElement(
                          "div",
                          { className: "feed-item__header" },
                          React.createElement("h2", { className: "feed-item__heading" }, data.title.slice(0, 100)),
                          React.createElement("span", { className: "feed_item__short-link" }, data.url.split("/")[2]),
                        ),
                        React.createElement(
                          "div",
                          { className: "feed-item__meta" },
                          "r/",
                          data.subreddit,
                          " \u2022 Posted by",
                          " ",
                          React.createElement("strong", null, "u/", data.author),
                        ),
                      ),
                      React.createElement(
                        "div",
                        { className: "feed-item__comments" },
                        "\uD83D\uDCAC ",
                        data.num_comments,
                      ),
                    ),
                  );
                }),
              ),
            ),
          ),
        ),
    );
    invoked++;
  })
  .listen();
