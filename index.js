const porta = 3003
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/validation',(req,res,next)=>{
	const username = req.body.username
    const email = req.body.email
    const message = req.body.message

    var err = new Array()
    var indice = 0;

    if (username == null || username == undefined || username.length <=3 || isNaN(username)===false) {
    	err[indice++] = "username incorrect pattern"
    }
    if (email == null || email == undefined || email.length <=3 || !email.includes('@')) {
        //não vou colocar email.includes('.com') pois existem emails que não colocam .com como exemplo '.edu.br'
    	err[indice++] = "email incorrect pattern"
    }
    if (message == null || message == undefined || message.length <=3) {
    	err[indice++] = "message incorrect pattern"
    }
    indice == 0 ? res.send(true) : res.send(err)
    
    if (!err.length) next() //possivel proximo passo para enviar para o banco ou afins
})



app.listen(porta,()=>{
    console.log(`Server is running on port ${porta}.`)
})