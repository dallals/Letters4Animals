//Module Export
var
    https           = require("https"),
    http            = require("http"),
    StringDecoder   = require("string_decoder").StringDecoder,
    decoder         = new StringDecoder('utf8');

module.exports = (function() {
    return {

        findReps: function(req, response) {

            // Check for state level to determine which API gets called
            if(req.body.rep_level == 'State Senate' || req.body.rep_level == 'State Assembly'){
                var data       = [],
                    dataString = '',
                    dataJson   = {},
                    results    = [],

                civics         = {
                    //Host: website that serves it.
                    host    : 'openstates.org',
                    //Path: proceeding the host. The rest of the URL.
                    path    : '/api/v1/legislators/geo/?lat='+req.body.userCoords.lat+'&long='+req.body.userCoords.lng+'&apikey=9db9f174815a449cb94ff480f2fbe482&fields=full_name,offices,photo_url'
                }

                //Request for the get to the above options.
                request = https.get(civics, function(res) {
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

                        // Package results so they match Civics API called
                        var selRep   = {},
                            finalRep = {
                                rep: {
                                    name: '',
                                    address: [{
                                        line1: '',
                                        line2: '',
                                        city: '',
                                        state: '',
                                        zip: ''
                                    }],
                                    photoUrl: ''
                                },
                                position: ''
                            };

                        // Nebraska check (Nebaska only has one state house so will always return only one rep.)
                        if(req.body.userCoords.state == 'NE'){
                            selRep = dataJson[0];
                            finalRep.position = 'State Senator';
                        }

                        // Find the rep for the right cause level
                        else {
                            for(var rep of dataJson){
                                if(req.body.rep_level == 'State Senate'){
                                    if(rep.chamber == 'upper'){
                                        selRep = rep;
                                        finalRep.position = 'State Senator';
                                    }
                                }
                                if(req.body.rep_level == 'State Assembly'){
                                    if(rep.chamber == 'lower'){
                                        selRep = rep;
                                        finalRep.position = 'State Representative';
                                    }
                                }
                            }
                        }

                        // Misc info
                        finalRep.rep.name       = selRep.full_name;
                        finalRep.rep.photoUrl   = selRep.photo_url;

                        // Grab and format the correct office address
                        for(var addr of selRep.offices){
                            if(addr.type == 'capitol'){
                                var addSplit = addr.address.split(', ');
                                finalRep.rep.address[0].zip     = addSplit[addSplit.length-1].split(' ')[1];
                                finalRep.rep.address[0].state   = addSplit[addSplit.length-1].split(' ')[0];
                                finalRep.rep.address[0].city    = addSplit[addSplit.length-2];

                                // Check for address having a new line symbol in it because this API hates me
                                var symbol = false;
                                for(var i=0; i < addSplit[addSplit.length-2].length; i++){
                                    if(addSplit[addSplit.length-2][i] === "\n"){
                                        symbol = true;
                                        i++;
                                        finalRep.rep.address[0].city = '';
                                    }
                                    if(symbol){
                                        finalRep.rep.address[0].city += addSplit[addSplit.length-2][i];
                                    }
                                }
                                finalRep.rep.address[0].line1   = addSplit[0];
                                if(!symbol){
                                    if(addSplit[1] != finalRep.rep.address[0].city){
                                        finalRep.rep.address[0].line2 = addSplit[1];
                                    }
                                }
                                else{
                                    for(var i=0; i < addSplit[1].length; i++){
                                        if(addSplit[1][i] === "\n"){
                                            break;
                                        }
                                        else {
                                            finalRep.rep.address[0].line2 += addSplit[1][i];
                                        }
                                    }
                                }
                            }
                        }   // End of address formatting

                        results.push(finalRep);
                        response.json(results);
                    })
                })   // end of req
            }
            else{
                //Adds %20 for the URL.
                var addArray    = req.body.userAddr.split(' '),
                    formatAdd   = addArray.join('%20');

                var
                    data        = [],                //Where all of the data will be stored
                    dataString  = '',
                    dataJson    = {},
                    position    = req.body.rep_level,
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
                                    for (thing of things.officialIndices) {
                                        // Check for President/VP/gov/lt.Gov so that the right one is returned
                                        if(position == 'President of the United States' || position == 'Vice-President of the United States' || position == 'Governor' || position == 'Lieutenant Governor'){
                                            if(position == things.name){
                                                var finalRep = {};
                                                    finalRep.rep        = dataJson.officials[thing];
                                                    finalRep.position   = things.name;
                                                results.push(finalRep);
                                            }
                                        }
                                        else{
                                            var finalRep = {};
                                                finalRep.rep        = dataJson.officials[thing];
                                                finalRep.position   = things.name;
                                            results.push(finalRep);
                                        }
                                    }
                                }
                            }
                            response.json(results);
                        })

                    })  //var req end
            } // End of state check
        }, //end of findReps method

    }
})();
