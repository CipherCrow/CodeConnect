const uploadBtn = document.getElementById("upload-btn")
const inputUpload = document.getElementById("imagem-upload")

uploadBtn.addEventListener("click", () =>
{
    inputUpload.click()
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve,reject) => {
        const leitor = new FileReader()
        leitor.onload = () => {
            resolve({url : leitor.result, nome: arquivo.name})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    } )
}

const imagemPrincipal = document.querySelector(".main-image")
const nomeDaImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0]
    
    if(arquivo){
        try{
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo) 
            imagemPrincipal.src = conteudoDoArquivo.url
            nomeDaImagem.textContent = conteudoDoArquivo.nome
        }catch(erro){
            console.error("Deu ruim")
        }
    }

})

const inputTags = document.querySelector("#categoria")
const listaTags = document.querySelector(".lista-tags")

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];


// Simulando busca no banco
async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}



inputTags.addEventListener("keypress", async (evento) =>{
    if(evento.key === "Enter"){
        evento.preventDefault()
        const tagParaAdicionar =  inputTags.value.trim();

        if(tagParaAdicionar !== ""){
            try{
                const tagExite = await verificaTagsDisponiveis(tagParaAdicionar)
                if(tagExite){
                    const tagNova = document.createElement("li")
                    tagNova.innerHTML = `<p>${tagParaAdicionar}</p> <img src="./img/close-black.svg" class="remove-tag">`

                    listaTags.append(tagNova)
                    inputTags.value = ""
                } else {
                    alert("Tag não encontrada dentre as disponiveis!")
                }
            }catch(error){
                console.error("deu ruim")
                alert("Deu ruim")
            }
        }
    }
})

listaTags.addEventListener("click",(evento) => {
    if(evento.target.classList.contains("remove-tag")){
        const tagParaRemover = evento.target.parentElement

        listaTags.remove(tagParaRemover)
    }
})

const btnPublicar = document.querySelector(".botao-publicar")

// Simulando envio para o banco
async function publicarProjeto(nomeDoProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;
            if (deuCerto) {
                resolve("Projeto publicado com sucesso.")
            } else {
                reject("Erro ao publicar o projeto.")
            }
        }, 2000)
    })
}

btnPublicar.addEventListener("click", async (evento) =>{
    evento.preventDefault()

    const nomeDoProjeto = document.getElementById("nome").value
    const descricaoDoProjeto = document.getElementById("descricao").value
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);
    
    try{
        const resultado = await publicarProjeto(nomeDoProjeto,descricaoDoProjeto,tagsProjeto)
        console.log(resultado)
        alert(resultado)
    }catch(error){
        console.error("Deu ruim :" + error)
        alert("Deu ruim: " + error)
    }
})

function limparFormulario(){
    const formulario = document.querySelector("form")
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png"
    nomeDaImagem.textContent = "imagem_projeto.png"
    listaTags.innerHTML = ""
}

const botaoDescartar = document.querySelector(".botao-descartar")

botaoDescartar.addEventListener("click",(evento)=>{
    evento.preventDefault()

    limparFormulario();
})
