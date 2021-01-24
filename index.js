const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })


//express use o ejs como view engie
app.set('view engie','ejs');
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


//rotas
app.get("/",(req,res) =>{
    Pergunta.findAll({raw:true, order:[['id','DESC']]}).then(perguntas =>{
        res.render("index.ejs",{
            perguntas: perguntas
        });
        // console.log(perguntas)
    })
    // res.render("index.ejs");
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar.ejs");
})

app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //res.send("Formulário recebido!" + titulo + " " + "descricao"+ descricao);
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
});



app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta => {
        
        if(pergunta != undefined){
            res.render("pergunta.ejs",{
               pergunta: pergunta 
            });
        }else{
            res.redirect("/");
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro: " + err
        });
    });
})



app.listen(4321,(function(err){
    if(!err){
        console.log("App rodando na porta 4321!")
    }else{
        console.log("Erro "+ err);
    }
}));