AnimalApp.controller('letterDisplayController', function ($scope, $location, $routeParams, $http, UserFactory, CauseFactory) {

    // Check for Safari, will need to use later to tell people to download a real broswer
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;


    $scope.gotCause     = false;
    $scope.printing     = false;
    $scope.selDiv       = '';
    $scope.chosenRep    = [];
    $scope.logoDown     = false;
    $scope.fixed        = {
                name    : '',
                pos     : '',
                addr    : '',
                city    : '',
                state   : '',
                zip     : '',
                pic     : ''
    }

    UserFactory.isLoggedIn(function(user){
        if(user.id){
            // If logged in, populate form with user info
            $scope.loggedUser = user;
            $scope.loggedIn = true;
        }
    });

    CauseFactory.getAllCauses(function(causes){
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
            $scope.gotCause     = true;
        }
        else{
            var payload             = {};
                payload.rep_level   = level;

            // Format address to send to civics API
            if($scope.loggedIn){
                payload.userAddr = $scope.loggedUser.street_address + ', ' + $scope.loggedUser.city + ' ' + $scope.loggedUser.state + ', ' + $scope.loggedUser.zipcode;
            }
            else{
                payload.userAddr = $scope.addr + ', ' + $scope.city + ' ' + $scope.state + ', ' + $scope.zip;
            }

            // Grab proper representatives
            $http.post('/representatives', payload).success(function(reps){
                for(var rep of reps){
                    // Grab the representative position for the letter salutation
                    var posArr = rep.position.split(' ');
                    for(var i=0; i< posArr.length; i++){
                        switch(posArr[i]){
                            case 'Senate'           : rep.letterPos = 'Senator'; break;
                            case 'President'        : rep.letterPos = 'President'; break;
                            case 'Vice-President'   : rep.letterPos = 'Vice-President'; break;
                            case 'Representatives'  : rep.letterPos = 'Representative'; break;
                            case 'Governor'         : rep.letterPos = 'Governor'; break;
                            case 'Lieutenant'       : rep.letterPos = 'Lieutenant Governor'; break;
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
                    var formAdd   = rep.rep.address[0].line1.split(' ').map(function(word){
                                        var upWord = word.charAt(0).toUpperCase() + word.slice(1);
                                        return upWord;
                                    }).join(' ');

                    // .map(function(word){ word = word[0].toUpperCase() + word.slice(1)}).join(' ');
                    var formCity  = rep.rep.address[0].city.split(' ').map(function(word){
                                        var upWord = word.charAt(0).toUpperCase() + word.slice(1);
                                        return upWord;
                                    }).join(' ');

                    rep.rep.address[0].line1 = formAdd;
                    rep.rep.address[0].city = formCity;
                }
                $scope.reps = reps;
                $scope.gotCause = true;
            })
        }   // End of static address check
    }

    $scope.repPicked = function(rep) {
        // Add or remove representative on checkbox tick/untick
        var alreadyPicked = false;
        for(var i=0; i < $scope.chosenRep.length; i++){
            if($scope.chosenRep[i] == rep){
                $scope.chosenRep.splice($scope.chosenRep[i], 1);
                alreadyPicked = true;
            }
        }
        if(!alreadyPicked){
            $scope.chosenRep.push(rep);
        }

        // if($scope.chosenRep.includes(rep)){
        //     $scope.chosenRep.splice($scope.chosenRep.indexOf(rep), 1);
        // }
        // else{
        //     $scope.chosenRep.push(rep);
        // }
    }

    $scope.printLetter = function(elem) {

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
        // Grab the letter(s) in the printDiv and store them in letters
        var letters = document.getElementById('printDiv').getElementsByTagName('div');
        // For each letter, package the div as a .doc file, create a link to the file, and have the user 'click' on it
        for(var letter of letters){
            // Change logo src to local and set new css style
            letter.children[0].src = 'L4Alogo.png';
            letter.children[0].style = 'float: right; margin-right: 45px; margin-top: 25px';

            var letterName  = 'Letter_to_' + letter.children[11].innerHTML + '.doc',
                letterName  = letterName.split(' ').join('_'),
                link        = document.createElement('a'),
                mimeType    = 'application/msword',
                elHtml      = letter.innerHTML;

            // 'Click' the generated link to force file download
            link.setAttribute('download', letterName);
            link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
            // Check if browser is Firefox
            if(typeof InstallTrigger !== 'undefined'){
                document.body.appendChild(link);
            }
            link.click();

            // Reset logo src so printing doesn't break
            letter.children[0].src = './assets/L4A-logo-cattle2-7-2016.png';
        }
        // Download the logo once
        if(!$scope.logoDown){
            var link = document.createElement('a');
            link.setAttribute('download', 'L4Alogo.png');
            link.setAttribute('href', './assets/L4A-logo-cattle2-7-2016.png');
            // Check if browser is Firefox
            if(typeof InstallTrigger !== 'undefined'){
                document.body.appendChild(link);
            }
            link.click();
            $scope.logoDown = true;
        }
    }   // End of saveLetter()

});
