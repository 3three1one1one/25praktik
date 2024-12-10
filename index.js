const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let tasks = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  let taskList = tasks
    .map(
      (task, index) =>
        `<li>${task} <form style="display:inline;" action="/delete-task" method="POST"><button name="index" value="${index}">Удалить</button></form></li>`
    )
    .join('');
  res.send(`
        <html>
        <head>
            <title>Список задач</title>
        </head>
        <body>
            <h1>Список задач</h1>
            <ul>${taskList}</ul>
            <form action="/add-task" method="POST">
                <input type="text" name="task" placeholder="Введите задачу" required>
                <button type="submit">Добавить</button>
            </form>
        </body>
        </html>
    `);
});

app.post('/add-task', (req, res) => {
  const task = req.body.task;
  if (task) tasks.push(task);
  res.redirect('/');
});

app.post('/delete-task', (req, res) => {
  const taskIndex = req.body.index;
  tasks.splice(taskIndex, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`);
});
