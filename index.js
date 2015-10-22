// START HEROKU SETUP
var express = require("express");
var app = express();
app.get('/', function(req, res){ res.send('The robot is happily running.'); });
app.listen(process.env.PORT || 5000);
// END HEROKU SETUP

// var mw = require('nodemw');
var Twit = require('twit');

var conf = {
  consumer_key:         process.env['c_consumer'],
  consumer_secret:      process.env['c_secret'],
  access_token:         process.env['a_token'],
  access_token_secret:  process.env['a_secret']
};

//console.dir(conf);

var T = new Twit(conf);

var HOW_MANY_MINUTES_N_STUFF = parseInt(process.env.timeout) || 20;

// // Get the members of our list, and pass them into a callback function.
// function getListMembers(callback) {
//     var memberIDs = [];
//
//     tu.listMembers({owner_screen_name: config.me,
//         slug: config.myList
//     },
//     function(error, data){
//         if (!error) {
//             for (var i=0; i < data.users.length; i++) {
//                 memberIDs.push(data.users[i].id_str);
//             }
//
//             // This callback is designed to run listen(memberIDs).
//             callback(memberIDs);
//         } else {
//             console.log(error);
//             console.log(data);
//         }
//     });
// }
//
// // What to do after we retweet something.
// function onReTweet(err) {
//     if(err) {
//         console.error("retweeting failed :(");
//         console.error(err);
//     }
// }
//
// // What to do when we get a tweet.
// function onTweet(tweet) {
//     // Reject the tweet if:
//     //  1. it's flagged as a retweet
//     //  2. it's matches our regex rejection criteria
//     //  3. it doesn't match our regex acceptance filter
//     var regexReject = new RegExp(config.regexReject, 'i');
//     var regexFilter = new RegExp(config.regexFilter, 'i');
//     if (tweet.retweeted) {
//         return;
//     }
//     if (config.regexReject !== '' && regexReject.test(tweet.text)) {
//         return;
//     }
//     if (regexFilter.test(tweet.text)) {
//         console.log(tweet);
//         console.log("RT: " + tweet.text);
//         // Note we're using the id_str property since javascript is not accurate
//         // for 64bit ints.
//         tu.retweet({
//             id: tweet.id_str
//         }, onReTweet);
//     }
// }
//
// // Function for listening to twitter streams and retweeting on demand.
// function listen(listMembers) {
//     tu.filter({
//         follow: listMembers
//     }, function(stream) {
//         console.log("listening to stream");
//         stream.on('tweet', onTweet);
//     });
// }

// // The application itself.
// // Use the tuiter node module to get access to twitter.
// var tu = require('tuiter')(config.keys);
//
// // Run the application. The callback in getListMembers ensures we get our list
// // of twitter streams before we attempt to listen to them via the twitter API.
// getListMembers(listen);

function getKanyeQuotez() {
  var client = new mw({
    server: 'en.wikiquote.org',  // host name of MediaWiki-powered site
    path: '/w',                  // path to api.php script
    debug: false                 // is more verbose when set to true
  });

  client.getArticle('Kanye_West', function(err, data) {
    // error handling
    if (err) {
      console.error(err);
      return;
    }

    console.dir(data);
  });
}

function generateChainz(titles) {
  var terminals = {};
  var startwords = [];
  var wordstats = {};

  var MAGICNUMBERONE = 1;
  var MAGICNUMBERTWO = 2;

  for (var i = 0; i < titles.length; i++) {
      var words = titles[i].split(' ');
      terminals[words[words.length-1]] = true;
      startwords.push(words[0]);
      for (var j = 0; j < words.length - 1; j++) {
          if (wordstats.hasOwnProperty(words[j])) {
              wordstats[words[j]].push(words[j+1]);
          } else {
              wordstats[words[j]] = [words[j+1]];
          }
      }
  }

  var choice = function (a) {
      var i = Math.floor(a.length * Math.random());
      return a[i];
  };

  var make_title = function (min_length) {
      word = choice(startwords);
      var title = [word];
      while (wordstats.hasOwnProperty(word)) {
          var next_words = wordstats[word];
          word = choice(next_words);
          title.push(word);
          if (title.length > min_length && terminals.hasOwnProperty(word)) break;
      }
      if (title.length < min_length) return make_title(min_length);
      return title.join(' ');
  };

  return make_title(MAGICNUMBERONE + Math.floor(MAGICNUMBERTWO * Math.random()));
}

/////// TO BE REPLACED WITH MEDIAWIKI STUFF

var titles = [
    "Shoot for the stars, so if you fall you land on a cloud.",
    "Everything I'm not makes me everything I am",
    "For me giving up is way harder than trying.",
    "If you admire somebody, you should go ahead and tell them. People never get the flowers while they can still smell them.",
    "I hate when I'm on a flight and I wake up with a water bottle next to me like oh great now I gotta be responsible for this water bottle",
    "My music isn't just music — it's medicine.",
    "Love your haters - they're your biggest fans",
    "Believe in your flyness -- conquer your shyness",
    "Society has put up so many boundaries, so many limitations on what’s right and wrong that it’s almost impossible to get a pure thought out. It’s like a little kid, a little boy, looking at colors, and no one told him what colors are good, before somebody tells you you shouldn’t like pink because that’s for girls, or you’d instantly become a gay two-year-old. Why would anyone pick blue over pink? Pink is obviously a better color. Everyone’s born confident, and everything’s taken away from you.",
    "Sometimes when I see a bad performance and people still clap... I wonder if they're clapping because they liked what they saw or because they're happy it's over?",
    "I am not a fan of books. I would never want a book's autograph.",
    "To use is necessary. And if you can't be used, then you're useless.",
    "I'll say things that are serious and put them in a joke form so people can enjoy them. We laugh to keep from crying.",
    "I believe in myself like a five-year-old believes in himself. They say look at me, look at me! Then they do a flip in the backyard. It won't even be that amazing, but everyone will be clapping for them.",
    "That that don't kill me, can only make me stronger.",
    "Talkin', talkin, talkin', talk. Baby, let's just knock it off. They don't know what we been through. They don't know 'bout me and you.",
    "They say ya additude determines ya laditude...",
    "If you know you're the best it only makes sense for you to surround yourself with the best. NO EXCEPTIONS",
    "Having money isn't everything, not having it is.",
    "Homie I'm graduated",
    "My greatest pain in life is that I will never be able to see myself perform live.",
    "I HEARD YOU LIKE TO DO IT WITH THE LIGHTS ON. BUT I REALLY MAKE BABIES WHEN THE MIC'S ON. ",
    "Sometimes people write novels and they just be so wordy and so self-absorbed. I am not a fan of books ... I like to get information from doing stuff like actually talking to people and living real life.",
    "As we live, our hearts turn colder. Cause pain is what we go through, as we become older. We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand. We get our heart broken by people we love, even that we give them all we have. Then we lose family over time. What else could rust the heart more over time? Black gold.",
    "Keep rockin', and keep knockin'Whether you Louis Vuitton it up or Reebokin'You see the hate, that they're servin' on a platterSo what we gon' have, dessert or disaster?",
    "Success is the best revenge.",
    "I know I got to be right nowCause I can't get much wronger",
    "The prettiest people do the ugliest things.",
    "In the night, I hear 'em talk. Coldest story ever told. Somewhere far along this road he lost his soul.",
    "George Bush doesn't care about black people... They're saying black families are looting and white families are just looking for food... They're giving the (Army) permission to shoot us.",
    "Take your diamonds and throw em up like you're bulimic. Yeah, the beat cold, but the flow is anemic.",
    "I've known my mom since I was zero years old. She is quite dope.",
    "I wonder... Would you rather have 100 from an average person or 10 from someone who is outstanding",
    "George Bush doesn't care about black people.",
    "The things that don't kill me makes me stronger",
    "I just needed time alone with my own thoughts, got treasures in my mind but couldn’t open up my own vault",
    "Have you ever had sex with a Pharaoh? I put the pussy in a sarcophagus",
    "I don’t understand why they trippin’, if you ask me, Flow is just as nice as, I admit the propane, I just spit, probably, Just raise the gas prices, everybody in the club, Try and get as fresh as me, what you want dog, trying to stay recession free, and spit, refreshly, ",
    "The plan was, we drink untill the pain is over but whats worse, the pain or the hangover?",
    "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything. And I'm Kanye West at age 36.",
    "Got staples on my dick. Why? Fucking centerfolds.",
    "You’ve got to be really dialed into exactly who you are to the one hundredth power or you’re just everyone else",
    "I'm so gifted at findin' what I don't like the most",
    "There's nothing I really wanted to do in life that I wasn't able to get good at. That's my skill. I'm not really specifically talented at anything except for the ability to learn. That's what I do. That's what I'm here for.",
    "I always thought that you having my child was our destiny, but I can't even vibe with you sexually",
    "Unbreakable, would you thought they called me Mr. Glass, look back on my life like the ghost of Christmas past. Toys R Us where I used to spend that Christmas cash, and I still won't grow up, I'm a grown -ass kid. Swear I should be locked up for stupid shit that I did. But I'm a champion, so I turned tragedy to triumph. Make music that's fire, spit my soul through the wire.",
    "Where I’m from the dopeboys is the rockstars, but they can’t cop cars without seeing cop cars. I guess they want us all behind bars. I know it.",
    "Less talk more head right now, huh?",
    "I'm not interested in things unless they hit me in a certain place in my heart. I get bored really easily. I'm like majorly underwhelmed in general.",
    "You cut me deep bitch, cut me like surgery.",
    "There's leaders, and there's followers... But I'd rather be a dick than a swallower",
    "Pussy and religion is all I need",
    "Let's have a toast for the douchebags, let's have a toast for the assholes, let's have a toast for the scumbags, Every one of them that I know. Let's have a toast to the jerkoffs, that'll never take work off; baby, I got a plan -- run away fast as you can",
    "It ain 't happened yetAnd that's what intuition is ",
    "My life is dope and I do dope shit."
    ];

setInterval(function(){
  var quote = generateChainz(titles);
  T.post('statuses/update', {status: quote + ' — Kanye Markov West'}, function(err, data, res){
    if (err) {
      console.log(err);
    } else {
      console.log('Posted: ' + quote);
    }
  });
}, 60 * 1000 * HOW_MANY_MINUTES_N_STUFF);
