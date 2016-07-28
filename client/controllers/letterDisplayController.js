AnimalApp.controller('letterDisplayController', function ($scope, $location, $route, $routeParams, $http, UserFactory, CauseFactory) {
    // Browser checks, to be used later maybe
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;


    $scope.gotCause     = false;
    $scope.printing     = false;
    $scope.selDiv       = '';
    $scope.chosenRep    = [];
    $scope.payload      = {};
    $scope.logoDown     = false;
    $scope.supported    = false;
    $scope.letterFormat = false;
    $scope.fixed        = {
        name    : '',
        pos     : '',
        addr    : '',
        city    : '',
        state   : '',
        zip     : '',
        pic     : ''
    }
    $scope.showDetails = false;
    $scope.showGuestFields = false;
    $scope.select_recipients = false;
    // $scope.showFixedLetter = true;


    UserFactory.isLoggedIn(function(user){
        if(user.id){
            $scope.loggedUser = user;
            $scope.loggedIn = true;
        }
    });

    CauseFactory.getAllCauses(function(causes){
        for(var ind in causes){
            // Check if cause should be pre-selected from a link/URL
            if(causes[ind].id == $routeParams.causeId){
                $scope.selCause = causes[ind];
                $scope.update();
            }
        }
        $scope.causes = causes;
    })


    $scope.getReps = function(level){

        // Check if the cause has a fixed recipient/address
        if($scope.selCause.fixed){
            $scope.fixed.name    = $scope.selCause.fixed_name;
            $scope.fixed.addr    = $scope.selCause.fixed_address;
            $scope.fixed.city    = $scope.selCause.fixed_city;
            $scope.fixed.state   = $scope.selCause.fixed_state;
            $scope.fixed.zip     = $scope.selCause.fixed_zipcode;
            $scope.fixed.pos     = $scope.selCause.rep_level;
            $scope.fixed.pic     = './assets/blank.jpg';

            $scope.gotCause      = true;
        }
        else{
            $scope.payload.rep_level   = level;
            // $scope.payload.rep_level = 'State Assembly';
            // $scope.selCause.rep_level = 'State Assembly';

            // Check to see if the cause is state-level
            if($scope.selCause.rep_level == 'State Senate' || $scope.selCause.rep_level == 'State Assembly'){
                // Package address for Geocoder
                var geoAddr = {};
                if($scope.loggedIn){
                    geoAddr = {
                        address: $scope.loggedUser.street_address,
                        city   : $scope.loggedUser.city,
                        state  : $scope.loggedUser.state,
                        zip    : $scope.loggedUser.zipcode
                    };
                    // Call the Google Geocoder API to get user lat/long to pass to OpenStates API
                    $http.post('/addressConfirmation', geoAddr).success(function(geoRes){
                        $scope.payload.userCoords = geoRes[0].geometry.location;
                        $scope.payload.userCoords.state = $scope.loggedUser.state;
                        $scope.repPost();
                    })
                }
                else {
                    $scope.payload.userCoords = $scope.address.choice.geometry.location;
                    $scope.payload.userCoords.state = $scope.state;
                    $scope.repPost();
                }
            }   // End of state-level check
            else {
                $scope.repPost();
            }
        }   // End of static address check
    }

    $scope.repPost = function() {

        // Format the user address to send to APIs
        if($scope.loggedIn){
            $scope.payload.userAddr = $scope.loggedUser.street_address + ', ' + $scope.loggedUser.city + ' ' + $scope.loggedUser.state + ', ' + $scope.loggedUser.zipcode;
        }
        else{
            $scope.payload.userAddr = $scope.addr + ', ' + $scope.city + ' ' + $scope.state + ', ' + $scope.zip;
        }

        // Grab proper representatives
        $http.post('/representatives', $scope.payload).success(function(reps){

            for(var ind in reps){
                var rep = reps[ind];

                var posArr = rep.position.split(' ');
                for(var i=0; i< posArr.length; i++){
                    switch(posArr[i]){
                        case 'President'        : rep.letterPos = 'President'; break;
                        case 'Vice-President'   : rep.letterPos = 'Vice-President'; break;
                        case 'Senate'           : rep.letterPos = 'Senator'; break;
                        case 'Representatives'  : rep.letterPos = 'Representative'; break;
                        case 'Governor'         : rep.letterPos = 'Governor'; break;
                        case 'Lieutenant'       : rep.letterPos = 'Lieutenant Governor'; break;
                        case 'Senator'          : rep.letterPos = 'Senator'; break;
                        case 'Representative'   : rep.letterPos = 'Representative'; break;
                    }
                }

                // Grab the representative's last name for letter salutation
                var nameSplit = rep.rep.name.split(' ');
                // Check if representative has a 'Jr.', 'Sr.', or other title at the end
                if(nameSplit[nameSplit.length-1][nameSplit[nameSplit.length-1].length-1] == '.'){
                    rep.letterName = nameSplit[nameSplit.length-2];
                }
                else{
                    rep.letterName = nameSplit[nameSplit.length-1];
                }

                // Check representative photo
                if(!rep.rep.photoUrl){
                    rep.rep.photoUrl = './assets/blank.jpg';
                }

                // Format the address to upper-case for letter

                var newLine1  = rep.rep.address[0].line1.split(' ').map(function(word){
                                    var upWord = word.charAt(0).toUpperCase() + word.slice(1);
                                    return upWord;
                                }).join(' ');
                if(rep.rep.address[0].line2){
                    var newLine2 = rep.rep.address[0].line2.split(' ').map(function(word){
                                        var upWord = word.charAt(0).toUpperCase() + word.slice(1);
                                        return upWord;
                                    }).join(' ');
                }

                var formCity  = rep.rep.address[0].city.split(' ').map(function(word){
                    var upWord = word.charAt(0).toUpperCase() + word.slice(1);
                    return upWord;
                }).join(' ');

                rep.rep.address[0].line1 = newLine1;
                rep.rep.address[0].line2 = newLine2;
                rep.rep.address[0].city = formCity;
            }
            $scope.reps = reps;
            $scope.gotCause = true;
        })  // End of POST
    }

    $scope.repPicked = function(rep) {
        // Add or remove representative on checkbox tick/untick
        var alreadyPicked = false;
        for(var i=0; i < $scope.chosenRep.length; i++){
            if($scope.chosenRep[i] == rep){
                $scope.chosenRep.splice(i, 1);
                alreadyPicked = true;
                if($scope.chosenRep.length == 0){
                    $scope.letterFormat = false;
                }
            }
        }
        if(!alreadyPicked){
            $scope.letterFormat = true;
            $scope.chosenRep.push(rep);
            $scope.formatLetter();
        }
    }

    $scope.formatLetter = function() {
        setTimeout(function(){

            document.getElementById('letterrichtext').innerHTML = $scope.selCause.letter_body;

        }, 500);
    }

    $scope.printLetter = function(elem) {
        $scope.addSupport();
        // Create a new window, write the contents of the letter div(s) into the window, print it
        var mywindow = window.open('', '', 'fullscreen=yes, status=no, toolbar=no, titlebar=no, location=no, menubar=no');
        mywindow.document.write('<html><head><title>Letter To Representative</title>');
        mywindow.document.write('<link rel="stylesheet" href="./css/letterStyle.css" type="text/css" />');
        mywindow.document.write('</head><body >');
        mywindow.document.write($(elem).html());
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10

        // Pause to make sure style/images are loaded
        setTimeout(function(){
            mywindow.print();
            mywindow.close();
        }, 500);

    }   // End of printLetter()

    $scope.saveLetter = function(){
        $scope.addSupport();
        // Grab the letter(s) in the printDiv and store them in letters
        var letters = document.getElementById('printDiv').getElementsByTagName('div');

        console.log('=========letters=========');
        console.log(letters);
        console.log('=========letters=========');

        // For each letter, package the div as a .doc file, create a link to the file, and have the user 'click' on it
        for(var i=0; i < letters.length; i++){
            console.log('=========letters[i].children=========');
            console.log(letters[i].children);
            console.log('=========letters[i].children=========');
            // Change logo src to local and set new css style
            letters[i].children[0].src = 'L4Alogo.png';
            letters[i].children[0].style = 'float: right; margin-right: 45px; margin-top: 25px';

            var letterName  = 'Letter_to_' + letters[i].children[12].innerHTML + '.doc',
            letterName  = letterName.split(' ').join('_'),
            link        = document.createElement('a'),
            mimeType    = 'application/msword',
            elHtml      = letters[i].innerHTML;

            // 'Click' the generated link to force file download
            link.setAttribute('download', letterName);
            link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
            if(isFirefox){
                document.body.appendChild(link);
            }
            link.click();

            // Reset logo src so printing doesn't break
            letters[i].children[0].src = './assets/L4A-logo-cattle2-7-2016.png';
        }
        // Download the logo once
        if(!$scope.logoDown){
            var link = document.createElement('a');
            link.setAttribute('download', 'L4Alogo.png');
            link.setAttribute('href', './assets/L4A-logo-cattle2-7-2016.png');
            if(isFirefox){
                document.body.appendChild(link);
            }
            link.click();
            $scope.logoDown = true;
        }
    }   // End of saveLetter()

    $scope.addSupport = function(){
        if ($scope.loggedIn && !$scope.supported) {
            var support = {
                cause_id: $scope.selCause.id,
                user_id: $scope.loggedUser.id
            }
            CauseFactory.addSupport({support: support});
            $scope.supported = true;
        } else if(!$scope.loggedIn && !$scope.supported){
            $scope.addGuest();
        }
    }
    $scope.addGuest = function(){
        var guest = {
            cause_id: $scope.selCause.id,
            first_name: $scope.user.firstName,
            last_name: $scope.user.lastName,
            street_address: $scope.addr,
            city: $scope.city,
            state: $scope.state,
            zipcode: $scope.zip
        }
        CauseFactory.addGuest({guest: guest});
        $scope.supported = true;
    }

    // to hide or show the Cause Details
    $scope.update = function(){
        if(!$scope.loggedIn){
            $scope.showGuestPrint = true;
        }else{
            $scope.showReviewUser = true;
        }
        $scope.showDetails = true;
    }

    // to hide or show the Print letter and show Representatives section
    $scope.review_letter = function(){
        if($scope.loggedIn){
            // Reset any info entered into form before logging in
            $scope.user.firstName = null;
            $scope.user.lastName = null;
            $scope.addr = null;
            $scope.city = null;
            $scope.state = null;
            $scope.zip = null;
            $scope.choice = null;
        }
        $scope.getReps($scope.selCause.rep_level); // Prompt user to select recipient(s)

        $scope.showGuestFields = false;
        $scope.select_recipients = true;
    }

    // Restart Letter
    $scope.start_over = function(){
        $route.reload();
    }

    // show Guest fields
    $scope.print_as_guest = function(){
        $scope.showGuestFields = true;
    }

    // on address Selection, show review
    $scope.address_selection = function(){
        $scope.showReviewStep = true;
    }

    // For selected rep background
    $scope.select= function(item) {
   	       $scope.selected = item;
   	};

    $scope.isActive = function(item) {

       if($scope.fixed.name){

       }else{
           for(var i=0; i < $scope.chosenRep.length; i++){
               if($scope.chosenRep[i] == item){
                   return true;
               }
           }
       }
   	};

    // Guest address section
    $scope.address = {choice: undefined};
    $scope.loginErrors = '';
    $scope.regErrors = {
        firstName       : '',
        lastName        : '',
        password        : '',
        confirmPassword : '',
        addrNotFound    : '',
        address       : '',
        city          : '',
        state         : '',
        zip           : ''
    };
    var errorMessages = {
        firstName           : 'First name field is required',
        lastName            : 'Last name field is required',
        email               : 'Last name field is required',
        password            : 'Password is required',
        confirmPassword     : 'Passwords must match',
        address             : 'Address field is required',
        city                : 'City field is required',
        state               : 'State field is required',
        zip                 : 'Zip field is required'
    }


    $scope.registerAddress = function() {
        $scope.regErrors.addrNotFound = '';

        if ($scope.addr && $scope.city && $scope.state && $scope.zip) {
            var address = {
                address: $scope.addr,
                city   : $scope.city,
                state  : $scope.state,
                zip    : $scope.zip };

            $http.post('/addressConfirmation', address).success(function(data) {
                if (data == 'Not Found') {
                    $scope.regErrors.addrNotFound = 'Address is not found, Please double check your address fields';
                } else {
                    if (typeof(data) == 'object') {
                        // Present all the choices and wait for them to pick
                        $scope.choices = data; }
                }
            })
        }
    }
});
