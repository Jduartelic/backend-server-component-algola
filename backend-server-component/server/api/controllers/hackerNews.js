const modelHackerNews = require('../models/hackerNews')
const url = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
const fetch = require('../../utils/fetch')  
const config = require('../../utils/config.js');
const moment = config.moment;

const _getDate = (date) =>{

  const today = moment();
  let dateCreated = moment(date, "D MMMM YYYY");
  let diffBetweenDates = today.diff(dateCreated, "days", true);
  // console.log(diffBetweenDates + ' --- ' + date)
  console.log(diffBetweenDates + ' --- ' + date)

  return diffBetweenDates < 1  ? config.getMomentConfEnv(date, "LT") 
    : diffBetweenDates >= 1 || 2 <= diffBetweenDates  ? 'Yesterday' 
    : config.getMomentConfEnv(date, "DD MMMM") 

}; 

const getNewsFromApiAndSaveOnDB = async () => {
   return fetch.fetchJSON(url) 
    .then(data => {
        modelHackerNews.insertMany(data.hits, (err, doc) =>{ console.log(err + ' - ' + doc)  })
    })
    .catch((err) => {
        console.log(err)
    });
};

const getNewsFromDB = async () =>{
    let newsIndicted =
     await modelHackerNews.find({ deleted: false }, (err, doc) =>{
    }).lean().exec();

    // console.log(newsIndicted)
    let news = newsIndicted.map(val =>{
      if(val.story_title !== null || val.title !== null ){
        let date_news = moment(val.created_at, "D MMMM YYYY");
        return {
            _id: val._id,
            story_title: val.story_title !== null ? val.story_title : val.title,
            story_url: val.story_url,
            author: val.author,
            created_at: _getDate(val.created_at),
            created_date: date_news          
        }
      }
    })
    let sortedNews = news.sort((a, b) =>{ return b.created_date - a.created_date  });
    return sortedNews;
}  

const removeNews = async(id) => {
  return modelHackerNews.update(
    {_id: id},
    {deleted: true}
  )
  .catch((err) => {
    throw err;
  });
};
  
module.exports = { getNewsFromApiAndSaveOnDB, getNewsFromDB, removeNews };
  