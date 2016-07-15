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

            console.log('=========req.body in findReps=========');
            console.log(req.body);
            console.log('=========req.body in findReps=========');

            //Adds %20 for the URL.
            var addArray    = req.body.userAddr.split(' '),
                formatAdd   = addArray.join('%20');

            //Address Object instantiate
            var address     = {};

            // if (req.params.user == 'guest') {
            //     address     = {
            //         number  :   req.body.number,                        //Street Number
            //         street  :   req.body.street+'%20'+req.body.strtype, //Street typt must be short. IE: Street => St., Drive => Dr., Avenue => Ave.
            //         city    :   req.body.city,                          //City Name
            //         state   :   req.body.state };                       //Letter representation of the State. IE: California => CA
            // }

            var causePos;
            if(req.body.rep_level == 'Senator'){
                causePos = 'Senate';
            }
            else{
                causePos = req.body.rep_level;
            }

            var
                data        = [],                                       //Where all of the data will be stored
                dataString  = '',
                dataJson    = {},
                position    = causePos,
                results     = [],

                civics      = {
                    //Host: website that serves it.
                    host    : 'www.googleapis.com',
                    //Path: proceeding the host. The rest of the URL.
                    path    : '/civicinfo/v2/representatives?key=AIzaSyBHSukFM4B6MafgSHWm83ZHvvLOXPTs8PI&address='+formatAdd
                },

                //Request for the get to the above options.
                req = https.get(civics, function(res) {

                    //Think of it as a loop. Every data get that happens runs the res.on
                    res.on('data', function(d) {
                        data.push(decoder.write(d));
                    })

                    //End of the res.on....
                    res.on('end',function() {
                        for (x of data) {
                            dataString+=x;
                        }
                        dataJson = JSON.parse(dataString);

                        for (things of dataJson.offices) {
                            if (things.name.includes(position)) {
                                // console.log(things)
                                for (thing of things.officialIndices) {
                                    var finalRep = {};
                                        finalRep.rep        = dataJson.officials[thing];
                                        finalRep.position   = things.name;
                                    results.push(finalRep);
                                }
                            }
                        }
                        console.log('=========results in server pre-send=========');
                        console.log(results);
                        console.log('=========results in server pre-send=========');
                        response.json(results);
                    })

                })  //var req end

        }, //end of findReps method

    }
})();
