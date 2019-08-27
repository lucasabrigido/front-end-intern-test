/**
// Adicionamos nosso código dentro de uma função anônima para evitar
// variáveis globais.
(function() {
  // Elemento principal do formulário
  const contactForm = document.getElementById('contact');

  // Campos do formulário
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // "addEventListener" instrui o navegador a executar uma função sempre
  // que um evento específico acontece. Nesse caso, a função abaixo será
  // executada toda vez que o botão de envio for pressionado.
  contactForm.addEventListener('submit', function() {
    // A propriedade "value" contém o valor atual de um input ou textarea
    const nameValue = nameInput.value;

    // A propriedade "length" contém o tamanho (em caracteres) de uma
    // uma string. Toda string contém essa propriedade.
    const nameLength = nameValue.length;

    // "window" é um objeto global que representa a janela (ou aba) do
    // navegador que está executando o código do seu site. O método
    // "alert" simplesmente mostra um aviso para o usuário contendo a
    // mensagem provida.
    window.alert(`Botão enviar clicado! Conteúdo do campo nome: ${nameValue} (${nameLength} caracteres)`);

    // Altere e complete essa função para validar os campos do formulário
    // de acordo com as especificações do teste. Boa sorte!
  });
})();
**/

window.onload = function (){
document.userForm.onsubmit = async e => {
    
    var callForm = function(){
        var form;
        try{
            e.preventDefault()
            form = e.target
        }catch(err){
            form = e
        }finally { 
            return form 
        } 
    }
    const form = callForm()
    const data = new FormData(form)
    const options = {
        method: form.method,
        body: new URLSearchParams(data)
        }
    fetch('/validation', options)
        .then(resp => resp.json())
        .then(res => {
            if (res == true){
                window.alert("Dados enviados com sucesso, acesse a barra lateral, para acompanhar seu pedido, clicando no botão 'Pedidos' a sua esquerda!")
                addElement()
            }
            else{
                var text = "";
                res.forEach(e=>{
                    e = ", " + e;
                    text += e;
                })
                window.alert(`Mistakes${text}`)
            }
        })         
}

function addElement(){
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameValue = nameInput.value;
    const messageValue = messageInput.value;

    const side = document.getElementById('mySidenav')
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    //const li2 = document.createElement("li");
    ul.innerHTML = `<span style="font-weight: bold; color: #fff; font-size:30px;" >${nameValue}</span>`
    li.innerHTML = `<span style="color: black; font-size: 20px;" >${messageValue}</span><button style="color: red; background-color: #498356; border: none;float: right;" onclick="deleteElement(event)" >X</button>`
    ul.append(li)
    side.append(ul)
}

document.getElementById('message').addEventListener('keydown', function (event) {
    if (event.keyCode === 13){
        event.preventDefault()
        this.form.onsubmit(this.form)
        return false;
    }
})


}