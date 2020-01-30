const express = require('express');
const rotas = express();


const tarefas =[];

function existeProjeto(req,res,next){ //Middleware local
  const {id} = req.params;
  const existe = tarefas.find(A => A.id === id);

  if (!existe){
    return res.status(400).json({ error: 'Project does not exists'}); 
  }
  return next();
};

rotas.post('/project', (req,res) =>{
    const {id, title} = req.body;
    const tarefa ={ 
      id,
      title,
      task: []
    }
    tarefas.push(tarefa);

    res.json(tarefas);
});

rotas.get ('/project', (req, res)=>{
    res.json(tarefas);
});

rotas.post('/project/:id/task',existeProjeto,(req,res) =>{
    const {title} = req.body;
    const {id} = req.params;
    const novaTarefa = tarefas.find( r=> r.id === id);
    novaTarefa.task.push(title);

    return res.json(tarefas);

});


rotas.put('/project/:id', existeProjeto,(req, res) =>{ 
  const {id} = req.params;
  const {title} = req.body;
  const tarefa = tarefas.find(F=> F.id === id);

  tarefa.title=title;

  return res.json(tarefas);
});

rotas.delete('/project/:id',existeProjeto,(req, res) =>{ 
  const {id} = req.params;
  const idValue = tarefas.findIndex(A => A.id == id);
  tarefas.splice(idValue,1);
  
  return res.send();
});


module.exports = rotas;