var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var post_target_java_fileupload_router = require("./routes/post_target_java_fileupload");
var post_fileupload_router = require("./routes/post_fileupload");

var app = express();
var fileUpload = require("express-fileupload"); //파일업로드

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// default options
app.use(
  fileUpload({
    createParentPath: true,
  })
); //파일업로드, 부모디렉토리 생성 셋팅

app.use("/", indexRouter);
app.use("/post/target_java/", post_target_java_fileupload_router);
app.use("/post/", post_fileupload_router);

// notice api 정보 셋팅
var notice_apiRouter = require("./routes/notice_api");
app.use("/api/notice", notice_apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
