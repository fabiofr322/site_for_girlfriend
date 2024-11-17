let currentPage = 1;
let pagtotal = currentPage;
let pageContents = [""]; // Armazena o conteúdo das páginas, começa com uma página vazia
const maxLines = 15; // Define o número máximo de linhas
const maxChars = 380; // Define o número máximo de caracteres

// Função para limitar o número máximo de caracteres
function limitTextAreaHeight() {
  const pageContent = document.querySelector(".page-content");
  const lines = pageContent.value.split('\n'); // Divide o texto em linhas

  // Se o número de linhas for maior que o limite, corta o texto
  if (lines.length > maxLines) {
    // Limita as linhas para o número máximo
    pageContent.value = lines.slice(0, maxLines).join('\n');
  }

  // Se o número de caracteres for maior que o limite, corta o texto
  if (pageContent.value.length > maxChars) {
    pageContent.value = pageContent.value.slice(0, maxChars);
  }
}

// Função que impede a digitação além do limite de caracteres ou linhas
function restrictInput(event) {
  const pageContent = document.querySelector(".page-content");
  const lines = pageContent.value.split('\n'); // Divide o texto em linhas

  if (lines.length >= maxLines && event.key !== 'Backspace') {
    // Se o número de linhas for maior ou igual ao limite e a tecla pressionada não for Backspace, impede a digitação
    event.preventDefault();
  }

  // Impede a digitação se o número de caracteres for maior ou igual ao limite
  if (pageContent.value.length >= maxChars && event.key !== 'Backspace') {
    event.preventDefault();
  }
}

// Atualiza a exibição da página e dos controles
function updatePage() {
  document.querySelector(".page-number").textContent = `Página ${currentPage} de ${pagtotal}`;
  document.querySelector(".page-content").value = pageContents[currentPage - 1];
  
  // Habilita ou desabilita os botões de navegação
  document.querySelector(".prev-button").disabled = currentPage === 1;
  document.querySelector(".next-button").disabled = false; // Nunca desabilita, pois o total é "infinito"

  // Limita as linhas e caracteres da página atual
  limitTextAreaHeight();
}

// Avança para a próxima página
function nextPage() {
  const pageContent = document.querySelector(".page-content");
  pageContents[currentPage - 1] = pageContent.value; // Salva o conteúdo da página atual
  
  // Cria uma nova página em branco se não houver conteúdo
  pageContents.push(""); 

  currentPage++;
  pagtotal = currentPage;
  updatePage();
}

// Volta para a página anterior
function prevPage() {
  if (currentPage > 1) {
    const pageContent = document.querySelector(".page-content");
    pageContents[currentPage - 1] = pageContent.value; // Salva o conteúdo atual
    currentPage--;
    updatePage();
  }
}

// Inicializa a página
updatePage();

// Adiciona o evento de restrição de input
document.querySelector(".page-content").addEventListener('keydown', restrictInput);
