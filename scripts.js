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

inputTags.addEventListener("keypress", (evento) =>{
    if(evento.key === "Enter"){
        evento.preventDefault()
        const tagParaAdicionar =  inputTags.value.trim();

        if(tagParaAdicionar !== ""){
            const tagNova = document.createElement("li")
            tagNova.innerHTML = `<p>${tagParaAdicionar}</p> <img src="./img/close-black.svg" class="remove-tag">`

            listaTags.append(tagNova)
            inputTags.value = ""
        }
    }
})

listaTags.addEventListener("click",(evento) => {
    if(evento.target.classList.contains("remove-tag")){
        const tagParaRemover = evento.target.parentElement

        listaTags.remove(tagParaRemover)
    }
})