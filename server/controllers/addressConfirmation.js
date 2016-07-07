var
    https           = require("https"),
    http            = require("http"),
    StringDecoder   = require("string_decoder").StringDecoder,
    decoder         = new StringDecoder('utf8');

module.exports = (function(){
    return {
        // Contact Emailer uses nodemailer
        confirmAddr: function(req, response) {
            console.log('Confirming Address');
            console.log(req.body);
            var addy;
            if (req.body.address && req.body.state && req.body.zip) {
                addy = req.body.address+' '+req.body.state+' '+req.body.zip;
            }
            console.log(addy);
            if (addy) {
                //Variables
                var
                    data    = [],
                    format  = '';
                    console.log(addy);
                //API call for geocode to get formatted_address
                https.get('https://maps.googleapis.com/maps/api/geocode/json?address='+addy+'&key=AIzaSyBHSukFM4B6MafgSHWm83ZHvvLOXPTs8PI', function(res){
                    console.log(res.statusMessage);
                    res.on('data', function(d) {
                        data.push(decoder.write(d));
                    })
                    res.on('end',function() {
                        for (x of data) {
                            format+=x;
                        }
                        dataJson = JSON.parse(format);
                        console.log(dataJson);
                        //If no result
                        if(dataJson.status == 'ZERO_RESULTS'){
                            //Nothing found
                            response.send('Not Found');
                        }
                        //If result
                        else{
                            //If there's more than one result
                            if(dataJson.results.length > 1){
                                var choices = [];
                                //For each Result
                                for(choice of dataJson.results){
                                    //Filter results to only show USA
                                    choiceArr = choice.formatted_address.split(',');
                                    if (choiceArr[choiceArr.length-1].includes('USA')) {
                                        //Push to the choices
                                        choices.push(choice.formatted_address);
                                    }
                                }
                                //Send it back to client
                                response.send(choices);
                            }
                            //If only one result
                            else{
                                //Send the first thing.
                                response.send(dataJson.results[0].formatted_address); }
                        }
                    })
                })
            }
        }
    }
})();
