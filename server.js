// подключение  express
const express = require("express");
// создаем обьект приложения
const app = express();
const path = require("path");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const api = require("./api");
app.use("/api", api);

// разрешение забирать статические файлы из папки
// app.use (express.static("public"));
if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));

    });

}

// начинаем прослушивать подключение на 3000 порту
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
});
