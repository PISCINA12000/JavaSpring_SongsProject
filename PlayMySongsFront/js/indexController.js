function listarMusicas(busca = "") {
    let URL_TO_FETCH = "http://localhost:8080/apis/musicas/buscar";
    const mensagem = document.getElementById("mensagem");
    const lista = document.getElementById("lista");

    if (busca.trim() !== "") {
        URL_TO_FETCH += "/" + busca;
    }

    fetch(URL_TO_FETCH, {
        method: "GET",
        redirect: "follow"
    })
    .then(async response => {
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.mensagem);
        }
        return response.json();
    })
    .then((result) => {
        let html = "";

        result.forEach(musica => {
            html += `
                <div class='row'>
                    <div class='column'>
                        <h3 style="color:white">Nome: ${musica.nome}</h3>
                        <h3 style="color:white">Cantor: ${musica.cantor}</h3>
                        <h3 style="color:white">Estilo: ${musica.estilo}</h3>
                        <div class='container'>
                            <div class='plate'>
                                <div class='black'>
                                    <div class='border'>
                                        <div class='white'>
                                            <div class='center'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='player'>
                                <div class='rect'></div>
                                <div class='circ'></div>
                            </div>
                        </div>
                        <audio controls>
                            <source src='${musica.nomeArquivo}' type='audio/mpeg'>
                        </audio>
                    </div>
                </div>
                <br>`;
        });

        lista.innerHTML = html;
        mensagem.innerHTML = ""; // Limpa qualquer mensagem de erro anterior
        document.getElementById("busca").value = "";
    })
    .catch(error => {
        mensagem.innerHTML = `<p style="color: red;">${error.message}</p>`;
        lista.innerHTML = ""; // Limpa a lista caso haja erro
    });
}

function pesquisar(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const busca = document.getElementById("busca").value;
    listarMusicas(busca); // Chama a função para atualizar os resultados
}
