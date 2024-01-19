var express = require("express");
var router = express.Router();

/* 공지사항 조회 */
router.get("/list", function (req, res, next) {
  const resObj = {
    resData: `notice list api 호출 `,
    result: [
      {
        title: "공지제목_1",
        cont: "공지내용_1",
      },
      {
        title: "공지제목_2",
        cont: "공지내용_2",
      },
    ],
  };

  res.send(resObj);
});

/* 공지사항 상세조회 */
router.get("/detail", function (req, res, next) {
  const resObj = {
    resData: `notice detail api 호출 `,
    result: {
      title: "apiserver에서 응답, 공지제목",
      cont: "apiserver에서 응답, 공지내용",
    },
  };

  res.send(resObj);
});

module.exports = router;
