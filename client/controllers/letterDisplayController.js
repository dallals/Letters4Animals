AnimalApp.controller('letterDisplayController', function ($scope, $location, $routeParams, $http, UserFactory, CauseFactory) {

    $scope.gotCause = false;
    $scope.printing = false;
    $scope.selDiv = '';
    $scope.chosenRep = [];

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
                if(posArr.includes('Senate')){
                    rep.letterPos = 'Senator';
                }
                if(posArr.includes('President')){
                    rep.letterPos = 'President';
                }
                if(posArr.includes('Vice-President')){
                    rep.letterPos = 'Vice-President';
                }

                // Grab the representative's last name for letter salutation
                var nameSplit = rep.rep.name.split(' ');
                rep.letterName = nameSplit[nameSplit.length-1];

                // Format the address to upper-case for letter
                var formAdd     = rep.rep.address[0].line1.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
                    formCity    = rep.rep.address[0].city.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
                rep.rep.address[0].line1 = formAdd;
                rep.rep.address[0].city = formCity;
            }
            $scope.reps = reps;
            $scope.gotCause = true;
        })
    }

    $scope.repPicked = function(rep) {
        // Add or remove representative on checkbox tick/untick
        if($scope.chosenRep.includes(rep)){
            $scope.chosenRep.splice($scope.chosenRep.indexOf(rep), 1);
        }
        else{
            $scope.chosenRep.push(rep);
        }
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

    }

    $scope.saveLetter = function(){
        // Grab the letter(s) in the printDiv and store them in letters
        var letters = document.getElementById('printDiv').getElementsByTagName('div');
        // For each letter, package the div as a .doc file, create a link to the file, and have the user 'click' on it
        for(var letter of letters){
            var letterName  = 'Letter_to_' + $('.repPosName').html() + '.doc',
                letterName  = letterName.split(' ').join('_'),
                link        = document.createElement('a'),
                mimeType    = 'application/msword',
                elHtml      = letter.innerHTML;
            link.setAttribute('download', letterName);
            link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
            link.click();
        }
    }

});
