const express = require('express');
const rotas = express();


const tarefas =[];

function existeProjeto(req,res,next){ //Middleware local
  const {id} = req.params;
  var count=0;
  for (i =0; i<tarefas.length;i++){
    if (tarefas.id != id){
      count++
    }
  }
  

  if(count == tarefas.length+1){
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


    for(i=0; i< tarefas.length;i++){
      if(tarefas[i].id === id){
        tarefas[i].task.push(title);
        break;
      }
    }
    return res.json(tarefas);

});


rotas.put('/project/:id', existeProjeto,(req, res) =>{ //Alterar o titulo que contém o ID 
  const {id} = req.params;
  const {title} = req.body;
  //  index = tarefas.find(find => find.id == id)
    for (i=0 ; i<tarefas.length; i++){
    if(tarefas[i].id === id){
      tarefas[i].title = title;
      break;
    }  
  }
  return res.json(tarefas);
});

rotas.delete('/project/:id',existeProjeto,(req, res) =>{ 
  const {id} = req.params;
 
  for (i=0 ; i<tarefas.length; i++){
    if(tarefas[i].id === id){
      tarefas.splice(i,1);
      break;
    }  
  }
  
  return res.send();// Não envia nenhum feedabck para o usuário
});


module.exports = rotas;