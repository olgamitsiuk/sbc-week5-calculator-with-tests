// подключение  express
const express = require("express");
// создаем обьект приложения
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// разрешение забирать статические файлы из папки
app.use (express.static("public"));

const api = require("./api");
app.use("/api", api);

// начинаем прослушивать подключение на 3000 порту

app.listen(3000, function () {
    console.log("http://localhost:3000");
});