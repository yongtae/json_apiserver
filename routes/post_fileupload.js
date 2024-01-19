var express = require('express');
var router = express.Router();
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var request = require('request');


// json 전달
router.post('/json', function(req, res, next) {
    var reqBody = req.body;
    var targetUrl = req.url;
    // console.log(targetUrl);
    // console.log(reqBody);

//[없음]타켓서버전송
{
    if(targetUrl.indexOf('json') > -1){
        // console.log(targetUrl.indexOf('json'))
        // console.log(targetUrl.indexOf('json2'))

        var resStatus=200;
        var body={"code":"성공"}
        console.log('----------[없음]타켓서버전송')
        
        res.status(resStatus).json(body);
        return true;
    }
}


    var options = {
        method: "POST",
        url: "http://localhost:3000/post/target_java"+targetUrl,
        body:reqBody,
        json:true 
    };
    
    request(options, function (err, httpResponse, body) {
        if (err) {
            return console.error('failed:', err);
        }
        // console.log('Upload successful!  Server responded with:', body);

        var resStatus=200;
        res.status(resStatus).json(body);
    });

});


//파일업로드 테스트
router.post('/fileupload', function(req, res, next) {
    var req_body = req.body;
    console.log('req_body',req_body);

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No files were uploaded.');
        return res.status(400).send('No files were uploaded.');
    }

    // 전송할데이터
    var sendData = {};
    sendData=req.body;
    var uploadPath = __dirname + "\\tmpfile\\";
    var inputFiles = [];
    sendData['inputFiles'] = [];

    // 1개면
    if(req.files.inputFiles.length == undefined){
        inputFiles.push(req.files.inputFiles);
    }else{
        inputFiles = req.files.inputFiles;
    }
    
    var promiseFile = [];
    inputFiles.forEach(element => {
        promiseFile.push(
            new Promise((resolve, reject) => {
                // var element = inputFiles[0]
                element.mv(uploadPath+"\\"+element.name, function(err) {
                    sendData['inputFiles'].push(fs.createReadStream(uploadPath+"\\"+element.name));
                    resolve("성공")
                });
            })
        )
    });
    
    //비동기->동기화 적용
    //파일업로드 전체완료후 api전달
    Promise.all(promiseFile).then((values) => {
        // 추후 해당 비동기 결과 값들을 담은 배열을 then의 인자로 받을 수 있다.
        // console.log("3333333");
        // console.log('req.files.inputFiles.length',req.files.inputFiles.length);
        console.log('sendData',sendData);

        var options = {
            method: "POST",
            url: "http://localhost:3000/post/target_java/fileupload",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            formData : sendData
        };
        
        request(options, function (err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            // console.log('Upload successful!  Server responded with:', body);
            var resStatus=200;
            res.status(resStatus).json(body);
        });

    });
    
    
    // console.log('sendData',sendData);
    // res.send(sendData);

    // sendData['inputFiles'] = [];
    // sendData['inputFiles'][0] = fs.createReadStream(uploadPath+"\\111.txt");    
    // sendData['inputFiles'][1] = fs.createReadStream(uploadPath+"\\2222.txt");  
    
    
});


module.exports = router;
