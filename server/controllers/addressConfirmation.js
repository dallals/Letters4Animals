var
    https           = require("https"),
    http            = require("http"),
    StringDecoder   = require("string_decoder").StringDecoder,
    decoder         = new StringDecoder('utf8');

module.exports = (function(){
    return {
        confirmAddr: function(req, response) {
            var addy;
            if (req.body.address && req.body.city && req.body.state && req.body.zip) {
                addy = req.body.address+' '+req.body.city+' '+req.body.state+' '+req.body.zip;
            }
            if (addy) {
                //Variables
                var
                    data    = [],
                    format  = '';
                //API call for geocode to get formatted_address
                https.get('https://maps.googleapis.com/maps/api/geocode/json?address='+addy+'&key=AIzaSyBHSukFM4B6MafgSHWm83ZHvvLOXPTs8PI', function(res){
                    //On each data chunk, we push the decoded version into an array
                    res.on('data', function(d) {
                        data.push(decoder.write(d));
                    })
                    //At the end, after all of the chunks are received, we append it to a string => to json
                    res.on('end',function() {
                        //To String
                        for (x of data) {
                            format+=x;
                        }
                        //To JSON
                        dataJson = JSON.parse(format);
                        ////////////////////////////////////////////////////////////
                        //                        Results                         //
                        ////////////////////////////////////////////////////////////
                        //If no result
                        if(dataJson.status == 'ZERO_RESULTS'){
                            //Nothing found
                            response.send('Not Found');
                        }
                        //If result
                        else{
                            //If there's more than one result, we filter it and send it back for them to choose
                            if(dataJson.results.length >= 1){
                                var choices = [];
                                //For each Result we want to keep only USA
                                for(choice of dataJson.results){
                                    choiceArr = choice.formatted_address.split(',');
                                    if (choiceArr[choiceArr.length-1].includes('USA')) {
                                        choices.push(choice.formatted_address);
                                    }
                                }
                                //Send the choices back to client
                                response.send(choices);
                            }
                        }
                    })
                })
            }
        }
    }
})();
