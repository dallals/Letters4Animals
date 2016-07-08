var mysql = require('mysql');
var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "rendezvous"
})
var emailConfLinks = [],
    genLength      = 50;


var emailConfGen = function(i, gen) {
    var valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    if (i===undefined)   {i = 0;}   else {i++;}
    if (gen===undefined) {gen = ''} else {gen += valid[Math.floor(Math.random()*valid.length)]}
    if (i<genLength)     {return emailConfGen(i, gen)} else {emailConfLinks.push(gen); return gen;}
}
var includesS = function(haystack, needle) {
}
// var Employee = mysql.model('Employee');

module.exports = (function(){
  return {
        create: function(req, res) {
            var gen = emailConfGen();
            console.log(gen);
            res.send(gen)
        },
        confirmEmail: function(req, res) {
            var contains = false;
            for (var hay of emailConfLinks) {
                console.log('Hay  :',hay);
                console.log('Link :',req.params.link);
                if (hay == req.params.link) {
                    contains = true;
                }
            }
            console.log(contains);
            if (contains) {
                console.log(emailConfLinks);
                console.log('Reached:',emailConfLinks.indexOf(req.params.link));
                console.log('trying to delet: ', emailConfLinks[emailConfLinks.indexOf(req.params.link)]);
                emailConfLinks.splice(emailConfLinks.indexOf(req.params.link),1);
                console.log(emailConfLinks);
            }
            res.send(emailConfLinks);
        }
    // create: function(req, res){
    //   console.log("Posted", req.body);
    //   var newuser = {
    //     first_name: req.body.firstname,
    //     last_name: req.body.lastname,
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    //     salt: req.body.salt,
    //     phone: req.body.phone,
    //     home_lat: req.body.home_lat,
    //     home_long: req.body.home_long,
    //     image_path: req.body.image_path,
    //     visiting_lat: req.body.visiting_lat,
    //     visiting_long: req.body.visiting_long,
    //     created_at: new Date(),
    //     updated_at: new Date()
    //   };
    //   con.query('INSERT INTO users SET ?', newuser, function(err, result){
    //     if(err){
    //       res.json(err);
    //     }
    //     else {
    //       res.json(result);
    //     }
    //   })
    // },
    //
    //
    // index: function(req, res){
    //
    //   con.query('SELECT * FROM users', function(err, rows){
    //     if(err){
    //       res.json(err);
    //     }
    //     else {
    //     res.json(rows);
    //     }
    //   })
    // },
    //
    // finduser: function(req, res){
    //   console.log("In the controller", req.body)
    //   con.query('SELECT * FROM users where username = ? and password = ?', [req.body.username, req.body.password], function(err, result){
    //     if(err){
    //
    //       res.json({err: nil})
    //
    //     }
    //     else {
    //       if(result.length == 0){
    //         res.json({user: nil})
    //       }
    //       else {
    //
    //       res.json({user:result});
    //       }
    //     }
    //   })
    // },
    //
    // update_region: function(req,res){
    //   console.log("IN the update_region controller", req.body);
    //   con.query('UPDATE users SET home_lat = ?, home_long = ?, home_radius = ?, home_region = ? WHERE id = ?', [req.body.home_lat, req.body.home_long, req.body.home_radius, req.body.home_region, req.body.user_id], function(err, result){
    //     if(err){
    //       res.json(err);
    //     }
    //     else {
    //       console.log("giving back", result);
    //       if(result.length == 0){
    //         console.log("Nothing");
    //         res.json({})
    //       }
    //       else {
    //       res.json({user:result});
    //       }
    //     }
    //   })
    // },
    //
    // getusersettings: function(req,res){
    //   con.query('SELECT * FROM users WHERE id = ?', [req.body.user_id], function(err, result){
    //     if(err){
    //       res.json(err);
    //     }
    //
    //     else {
    //       console.log("giving back user settings", result);
    //       if(result.length == 0){
    //         console.log("Nothing");
    //         res.json({})
    //       }
    //       else {
    //       res.json({user:result});
    //       }
    //     }
    //   })
    // },
    //
    // hideuser: function(req,res){
    //   con.query('UPDATE users SET visibility = ? WHERE id = ?', [req.body.visibility, req.body.user_id], function(err, result){
    //     if(err){
    //       res.json(err);
    //     }
    //     else {
    //       console.log("giving back", result);
    //       if(result.length == 0){
    //         console.log("Nothing");
    //         res.json({})
    //       }
    //       else {
    //       res.json({user:result});
    //       }
    //     }
    //   })
    // }

  }//closes return
})();
