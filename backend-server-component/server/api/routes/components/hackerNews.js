const HackerNews = require("../../controllers/hackerNews");

module.exports = {
  getNewsFromAPI(req, res, next) {
    return HackerNews.getNewsFromApiAndSaveOnDB()  
      .then(() => {
        return res.status(200).send({
          message: 'DB algolia have been updated!!!.'
        })
      })
      .catch(err => {
        console.log("SaveNewsFromDB: ", err);
        next(err);
      });
  },

  getNews(req, res, next) {
    return HackerNews.getNewsFromDB()
      .then(result => {
        const response = {
            data: result
          };
        return res.send(response);
      })
      .catch(err => {
        console.log("getNewsFromDB: ", err);
        next(err);
      });
  },

  removeNews(req, res, next) {
    return HackerNews.removeNews(req.params.id)
      .then(result => {
        const response = {
            data: result
          };
        return res.send(response);
      })
      .catch(err => {
        console.log("removeNews: ", err);
        next(err);
      });
  }

};