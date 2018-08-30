const fetch = require("node-fetch");

const fetchJSON = function(url, headers = null) {
  const headerRequest = headers === null ? { timeout: 20000 } : headers;
  return fetch(url, headerRequest)
    .then(result => {
      if (result.status === 404) {
        return [];
      }
      return result.json();
    })
    .catch(err => {
      console.log("Fetch: Error fetchJSON: ", err);
      throw err;
    });
};

module.exports = {
  fetchJSON: fetchJSON,
};