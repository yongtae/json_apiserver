var express = require('express');
var router = express.Router();

// json 리턴
router.post('/json', function(req, res, next) {
  var reqBody = req.body;

  var resStatus=200;
  return res.status(resStatus).json(reqBody);

});


// 파일업로드 리턴
router.post('/fileupload', function(req, res, next) {

  let inputFiles;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }


  inputFiles = req.files.inputFiles;
  uploadPath = __dirname + "\\upfile\\";

  console.log('req.files',req.files)

  // 다중파일(동일 input name명) 업로드
  inputFiles.forEach(element => {
     //한글깨짐은 모르겄음
    element.mv(uploadPath+"\\"+element.name, function(err) {
      if (err)
        return res.status(500).send(err);
    });
  });

  // let file01 = req.files.file01;
  // 개별 input name
  // file01.mv(uploadPath+"\\"+file01.name, function(err) {
  //   if (err)
  //     return res.status(500).send(err);

  //   res.send('File uploaded!');
  // });

  // let file02 = req.files.file02;

  res.send('File uploaded!');
});

module.exports = router;
