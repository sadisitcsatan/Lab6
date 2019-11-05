var express = require('express');
var router = express.Router();

router.get('/lab8', function (req,res,next) {
    res.render('lab8/index.html');
});
router.post('/lab8', function (req,res,next) {
   console.log(req.body);
   let questions = {
       "1": "sacramento",
       "2": "mo",
       "3": ["Jefferson", "Roosevelt"],
       "4": "Rhode Island",
       "5": "seal2",
       "6": "50",
       "7": "13",
       "8": ["Red", "White", "Blue"]
   };
   const resu = grade(req.body,questions)
   res.json({
       original: req.body,
       questions,
       resu

   });
});
let grade = function(body,ans){
    var results = {};
    let cor3 = 0;
    let cor8 = 0;
    //console.log(body.questions["3"][0]);
    //console.log(ans["3"][0], ans["3"]);
    if (body.questions["1"] == ans["1"]){
        results["1"] = "Correct";
    }else {
        results["1"] = "Incorrect";
    }
    if (body.questions["2"] == ans["2"]){
        results["2"] = "Correct";
    }else {
        results["2"] = "Incorrect";
    }
    if (body.questions["3"].length == ans["3"].length){
        if (body.questions["3"][0] == ans["3"][0]){
            cor3++;
            //console.log(cor3);
        }else if (body.questions["3"][0] == ans["3"][1]){
            cor3++;
            //console.log(cor3);
        }else {
            //console.log("first mismatch");
            results["3"] = "Incorrect";
        }
        if (cor3 == 1){
            if (body.questions["3"][1] == ans["3"[0]]){
                results["3"] = "Correct";
            }else if (body.questions["3"][1] == ans["3"][1]){
                results["3"] = "Correct";
            }else {
                //console.log("second mismatch");
                results["3"] = "Incorrect";
            }
        }
    }else {
        results["3"] = "Incorrect";
        //console.log("length");
    }
    if (body.questions["4"] == ans["4"]){
        results["4"] = "Correct";
    }else {
        results["4"] = "Incorrect";
    }
    if (body.questions["5"] == ans["5"]){
        results["5"] = "Correct";
    }else {
        results["5"] = "Incorrect";
    }
    if (body.questions["6"] == ans["6"]){
        results["6"] = "Correct";
    }else {
        results["6"] = "Incorrect";
    }
    if (body.questions["7"] == ans["7"]){
        results["7"] = "Correct";
    }else {
        results["7"] = "Incorrect";
    }
    if (body.questions["8"].length == ans["8"].length){
        if (body.questions["8"][0] == ans["8"][0]){
            cor8++;
            //console.log(cor3);
        }else if (body.questions["8"][0] == ans["8"][1]){
            cor8++;
            //console.log(cor3);
        }else if (body.questions["8"][0] == ans["8"][2]){
            cor8++;
        }else {
            //console.log("first mismatch");
            results["8"] = "Incorrect";
        }
        if (cor8 == 1){
            if (body.questions["8"][1] == ans["8"][0]){
                cor8++;
                //console.log(cor3);
            }else if (body.questions["8"][1] == ans["8"][1]){
                cor8++;
                //console.log(cor3);
            }else if (body.questions["8"][1] == ans["8"][2]){
                cor8++;
            }else {
                //console.log("first mismatch");
                results["8"] = "Incorrect";
            }
            if (cor8 == 2){
                if (body.questions["8"][2] == ans["8"][0]){
                    results["8"] = "Correct";
                    //console.log(cor3);
                }else if (body.questions["8"][2] == ans["8"][1]){
                    results["8"] = "Correct";
                    //console.log(cor3);
                }else if (body.questions["8"][2] == ans["8"][2]){
                    results["8"] = "Correct";
                }else {
                    //console.log("first mismatch");
                    results["8"] = "Incorrect";
                }
            }
        }
    }else {
        results["3"] = "Incorrect";
        //console.log("length");
    }
    return results;
};
module.exports = router;