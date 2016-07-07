//Module Export
var
    https           = require("https"),
    http            = require("http"),
    StringDecoder   = require("string_decoder").StringDecoder,
    decoder         = new StringDecoder('utf8');

module.exports = (function() {
    return {
        //Index method. currently for route: /representatives as a POST request. req.body should have the following fields in civics
        findReps: function(req, response) {
            //curl "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBHSukFM4B6MafgSHWm83ZHvvLOXPTs8PI&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS"
            //curl "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBHSukFM4B6MafgSHWm83ZHvvLOXPTs8PI&address=19814%20Oakhaven%20Dr.%20Saratoga%20CA"
            //Address     Zip     State

            //Adds %20 for the URL.
            var addArray    = req.body.data.split(' '),
                formatAdd   = addArray.join('%20');

            //Address Object instantiate
            var address     = {};
            //Check to see if user is loggedin via the req.params.user
            //Grab details based on user.

            //If not user.
            if (req.params.user == 'guest') {
                address     = {
                    number  :   req.body.number,                        //Street Number
                    street  :   req.body.street+'%20'+req.body.strtype, //Street typt must be short. IE: Street => St., Drive => Dr., Avenue => Ave.
                    city    :   req.body.city,                          //City Name
                    state   :   req.body.state };                       //Letter representation of the State. IE: California => CA
            }


            var
                data        = [],                                       //Where all of the data will be stored
                dataString  = '',
                dataJson    = {},
                position    = 'Senate',
                results     = [],

                civics      = {
                    //Host: website that serves it.
                    host    : 'www.googleapis.com',
                    //Path: proceeding the host. The rest of the URL.
                    path    : '/civicinfo/v2/representatives?key=AIzaSyBHSukFM4B6MafgSHWm83ZHvvLOXPTs8PI&address='+formatAdd
                                    // address.number+'%20'+
                                    // address.street+'%20'+
                                    // address.city+'%20'+
                                    // address.state
                },
                //Request for the get to the above options.
                req         = https.get(civics, function(res) {
                    //Think of it as a loop. Every data get that happens runs the res.on
                    res.on('data', function(d) {
                        data.push(decoder.write(d));
                    })
                    //End of the res.on....
                    res.on('end',function() {
                        // console.log('=========res.on(end) data=========');
                        // console.log(data);
                        // console.log('==================');
                        for (x of data) {
                            dataString+=x;
                        }
                        dataJson = JSON.parse(dataString);

                        for (things of dataJson.offices) {
                            if (things.name.includes(position)) {
                                // console.log(things)
                                for (thing of things.officialIndices) {
                                    results.push(dataJson.officials[thing]);
                                }
                            }
                        }
                        // response.json(results);
                        response.json(dataJson);
                    })
                })  //var req end
        }, //end of findReps method

    }
})();
