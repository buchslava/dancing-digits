var todosData = [];

function getTodos(res){
  res.json(todosData);
};

module.exports = function(app) {
  app.get('/api/todos', function(req, res) {
    getTodos(res);
  });

  app.post('/api/todos', function(req, res) {
    todosData.push({text : req.body.text});
    getTodos(res);
  });

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};
