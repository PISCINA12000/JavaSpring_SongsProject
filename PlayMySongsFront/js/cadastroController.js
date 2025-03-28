function exibirErro(inputId, mensagem) {
    let input = document.getElementById(inputId);
    let errorMessage = document.getElementById(inputId + "-erro");

    // Adiciona classe de erro ao input
    input.style.border = "2px solid red";

    // Se a mensagem de erro já existir, apenas atualiza o texto
    if (!errorMessage) {
        errorMessage = document.createElement("p");
        errorMessage.id = inputId + "-erro";
        errorMessage.style.color = "red";
        errorMessage.style.fontSize = "12px";
        errorMessage.style.marginTop = "5px";
        input.parentNode.appendChild(errorMessage);
    }
    errorMessage.innerText = mensagem;
}

function limparErro(inputId) {
    let input = document.getElementById(inputId);
    let errorMessage = document.getElementById(inputId + "-erro");

    // Remove a borda vermelha
    input.style.border = "";

    // Remove a mensagem de erro se existir
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Exemplo de uso ao validar um campo
function validarCampo(inputId) {
    let valor = document.getElementById(inputId).value;
    let regex = /^[a-zA-Z _]+$/; // Aceita apenas letras, espaços e underscore (_)

    if (!regex.test(valor)) {
        exibirErro(inputId, "Este campo contém caracteres inválidos!");
    } else {
        limparErro(inputId);
    }
}

function isNotEspecial(letra) {
    if (letra >= 65 && letra <= 90)
        return true;
    else if (letra >= 97 && letra <= 122)
        return true;
    else return letra == 32;
}

function EnviarArquivo(event) {
    event.preventDefault();

    const mensagem = document.getElementById("mensagem");
    const URL_TO_FETCH = "http://localhost:8080/apis/musicas/gravar";
    const formData = new FormData(document.getElementById("fform"));
    //formData.append('acao', 'confirmar'); opcional, caso queira inserir outra informação

    let estilo = document.getElementById("estilo").value;
    if (estilo.startsWith("Escolha o estilo")) {
        estilo = "Louvor";
    }
    let nome = document.getElementById("nome").value;
    let cantor = document.getElementById("cantor").value;

    //tratar aqui oque foi recebido pelo formulário
    //tratar nome
    let i = 0;
    while (i < nome.length && isNotEspecial(nome.charCodeAt(i))) {
        i++;
    }
    if (i === nome.length) {
        //deu certo
        limparErro("nome");

        //tratar cantor
        i = 0;
        while (i < cantor.length && isNotEspecial(cantor.charCodeAt(i))) {
            i++;
        }
        if (i === cantor.length) {
            //deu certo
            limparErro("cantor");

            // REQUISIÇÃO É ENVIADA AQUI!!!
            //então enviar uma requisição post para 'localhost' do spring
            fetch(URL_TO_FETCH, {
                method: 'POST',
                body: formData,
                redirect: "follow"
            })
                .then(response => {
                    return response.text();
                })
                .then(dados => {
                    mensagem.innerHTML = dados;
                    formData.reset();
                })
                .catch(error => mensagem.innerHTML = error);
        } else {
            //encontrado characteres especiais em cantor
            //tratar aqui
            exibirErro("cantor", "Este campo contém caracteres inválidos!")
        }
    } else {
        //encontrado characteres especiais no nome
        //tratar aqui
        exibirErro("nome", "Este campo contém caracteres inválidos!")
    }
}

// Chamar essa função no evento de input dos campos
document.getElementById("nome").addEventListener("input", function () {
    validarCampo("nome");
});
document.getElementById("cantor").addEventListener("input", function () {
    validarCampo("cantor");
});
