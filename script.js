// ===== SLIDER AUTOMÁTICO =====
// Seleciona todos os elementos com a classe "slide" e guarda em uma NodeList.
// querySelectorAll retorna uma lista (parecida com array) de elementos.
let slides = document.querySelectorAll('.slide');

// Índice atual do slide que está visível (começa em 0 -> primeiro slide).
let slideIndex = 0;

// Função que avança para o próximo slide
function nextSlide() {
    // Remove a classe 'active' do slide atual (esconde / desativa visualmente).
    slides[slideIndex].classList.remove('active');

    // Atualiza o índice do slide:
    // (slideIndex + 1) % slides.length
    // - soma 1 ao índice atual para ir ao próximo;
    // - o operador % (módulo) faz o loop: quando chegar ao último elemento,
    //   o resultado volta para 0 (evita erro de índice fora do limite).
    slideIndex = (slideIndex + 1) % slides.length;

    // Adiciona a classe 'active' ao novo slide (mostra / ativa visualmente).
    slides[slideIndex].classList.add('active');
}

// Chama nextSlide automaticamente a cada 4000ms (4 segundos).
// setInterval executa a função várias vezes em intervalos regulares.
setInterval(nextSlide, 4000); // troca a cada 4s


// ===== MENU HAMBÚRGUER =====
// Pega o botão do menu (hambúrguer) pelo ID 'menu-toggle'.
const menuToggle = document.getElementById('menu-toggle');

// Pega o elemento de navegação (normalmente <nav>) pelo ID 'nav'.
const nav = document.getElementById('nav');

// Adiciona um ouvinte de evento que escuta cliques no botão do menu.
menuToggle.addEventListener('click', () => {
    // toggle alterna a presença de uma classe:
    // se 'active' já existe -> remove; se não existe -> adiciona.
    // Usado para abrir/fechar o menu mudando estilos via CSS.
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Seleciona todos os links dentro do nav (nav ul li a) e
// percorre cada um adicionando um evento de clique.
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        // Quando um link do menu é clicado, removemos a classe 'active'
        // do botão e do nav para fechar o menu (útil em telas pequenas).
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});


// ===== FORMULÁRIO =====
// Seleciona o formulário pela classe '.formulario'.
const form = document.querySelector('.formulario');

// Adiciona um ouvinte para o evento 'submit' (envio do formulário).
form.addEventListener('submit', function(event) {
    // event.preventDefault() impede o comportamento padrão do formulário,
    // que é recarregar a página / enviar os dados automaticamente.
    event.preventDefault();

    // Exibe um alerta simples para o usuário.
    alert('Mensagem enviada com sucesso!');

    // Em seguida chama form.submit() para enviar o formulário programaticamente.
    // Observação: chamar preventDefault() e logo depois form.submit() é
    // uma técnica usada quando você quer executar algo (ex.: validação, alert)
    // antes de realmente submeter. Aqui, o resultado final é que o formulário
    // será enviado após o alerta.
    form.submit();
});


// ===== WHATSAPP FLUTUANTE =====
// Cria dinamicamente um elemento <a> (link) para o botão do WhatsApp.
const whatsappBtn = document.createElement('a');

// Define o link para o WhatsApp Web / API. O texto na URL está codificado (URL encoding)
// Ex.: espaços viraram %20; caracteres especiais foram convertidos.
// Substitua o número e a mensagem se quiser personalizar.
whatsappBtn.href = "https://wa.me/5511967091290?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20treinos%20personalizados";

// Faz com que ao clicar o link abra em nova aba (target "_blank").
whatsappBtn.target = "_blank";

// Adiciona uma classe para que o CSS possa posicionar/estilizar o botão.
whatsappBtn.classList.add('whatsapp-float');

// Define o conteúdo HTML interno do link — aqui uma imagem do WhatsApp.
// Note que o caminho "img/whatsaap.png" deve existir no seu projeto.
whatsappBtn.innerHTML = `<img src="img/whatsaap.png" alt="WhatsApp" />`;

// Finalmente adiciona o botão criado ao final do body da página,
// tornando-o visível no DOM.
document.body.appendChild(whatsappBtn);


// ===== DEPOIMENTOS ROTATIVOS =====
// Seleciona todos os elementos com a classe '.depoimento'.
let depoimentos = document.querySelectorAll('.depoimento');

// Índice atual do depoimento visível.
let depoIndex = 0;

// Função para ir ao próximo depoimento (igual à lógica do slider).
function nextDepoimento() {
    depoimentos[depoIndex].classList.remove('active');
    depoIndex = (depoIndex + 1) % depoimentos.length;
    depoimentos[depoIndex].classList.add('active');
}

// Troca de depoimento a cada 5000ms (5 segundos).
setInterval(nextDepoimento, 5000); // troca a cada 5s


// ===== ATUALIZAÇÃO AUTOMÁTICA DO ANO =====
// Pega o elemento com id 'ano' e coloca o ano atual (ex.: 2025).
// new Date().getFullYear() retorna o ano atual como número.
document.getElementById('ano').textContent = new Date().getFullYear();


// ===== CARRINHO DE COMPRAS =====
// Seleciona todos os botões que adicionam ao carrinho (classe '.add-cart').
const addCartButtons = document.querySelectorAll('.add-cart');

// Elemento onde serão listados os itens do carrinho.
const itensCarrinho = document.getElementById('itens-carrinho');

// Elemento que mostrará o total.
const totalSpan = document.getElementById('total');

// Variável que guarda o total (valor numérico).
let total = 0;

// Array que armazena os itens do carrinho (cada item é um objeto { nome, preco }).
let carrinhoItens = [];

// Função para redesenhar/atualizar a lista do carrinho na tela.
function atualizarCarrinho() {
    // Limpa tudo que estava listado (evita duplicação).
    itensCarrinho.innerHTML = '';

    // Percorre o array de itens e cria um <li> para cada um.
    carrinhoItens.forEach((item, index) => {
        const li = document.createElement('li');

        // Conteúdo do li: nome do produto e preço formatado com duas casas decimais.
        // item.preco.toFixed(2) transforma o número em string com 2 casas decimais.
        li.textContent = `${item.nome} - R$${item.preco.toFixed(2)} `;

        // Cria um botão "Remover" para cada item.
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';

        // Ajuste visual simples via JS (poderia ser feito via CSS).
        removeBtn.style.marginLeft = '10px';

        // Ao clicar em 'Remover', remove o item do array e atualiza o total e a lista.
        removeBtn.addEventListener('click', () => {
            // splice remove 1 elemento a partir da posição index.
            carrinhoItens.splice(index, 1);

            // Subtrai o preço do item do total.
            total -= item.preco;

            // Redesenha a lista (chamada recursiva prática: atualiza a UI).
            atualizarCarrinho();
        });

        // Anexa o botão ao <li> e o <li> à lista no DOM.
        li.appendChild(removeBtn);
        itensCarrinho.appendChild(li);
    });

    // Atualiza o elemento que exibe o total, formatado com 2 casas decimais.
    totalSpan.textContent = total.toFixed(2);
}

// Para cada botão "add-cart", adiciona um evento de clique.
addCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Evita comportamento padrão (se o botão estiver dentro de um <a> ou <form>).
        e.preventDefault();

        // Encontra o cartão (.card1) mais próximo do botão clicado — assume estrutura HTML específica.
        const card = btn.closest('.card1');

        // Pega o nome do produto assumindo que existe um <h3> dentro do card.
        const nome = card.querySelector('h3').textContent;

        // Lê o preço a partir de um atributo data-preco no elemento card.
        // Ex.: <div class="card1" data-preco="99.9"> ...
        // parseFloat converte a string para número decimal.
        const preco = parseFloat(card.dataset.preco);

        // Adiciona um objeto com nome e preço no array do carrinho.
        carrinhoItens.push({ nome, preco });

        // Soma o preço ao total.
        total += preco;

        // Atualiza a lista exibida.
        atualizarCarrinho();
    });
});


// ===== FINALIZAR COMPRA COM PAYPAL =====
// Quando o botão 'finalizar' for clicado, inicia o processo de pagamento.
document.getElementById('finalizar').addEventListener('click', () => {
    // Se o carrinho estiver vazio, avisa e sai da função (return).
    if(carrinhoItens.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    // Cria dinamicamente um formulário que fará o redirecionamento para o PayPal.
    const form = document.createElement('form');
    form.action = "https://www.paypal.com/cgi-bin/webscr"; // endpoint do PayPal
    form.method = "post";
    form.target = "_blank"; // abre o PayPal em nova aba

    // Campo oculto: tipo de transação (carrinho)
    const cmd = document.createElement('input');
    cmd.type = "hidden";
    cmd.name = "cmd";
    cmd.value = "_cart";
    form.appendChild(cmd);

    // Campo oculto: conta PayPal que receberá o pagamento.
    const business = document.createElement('input');
    business.type = "hidden";
    business.name = "business";
    business.value = "SEU_EMAIL_PAYPAL_AQUI"; // TODO: substituir pelo e-mail real do PayPal
    form.appendChild(business);

    // Define a moeda (BRL = Real brasileiro).
    const currency = document.createElement('input');
    currency.type = "hidden";
    currency.name = "currency_code";
    currency.value = "BRL";
    form.appendChild(currency);

    // Indica que estamos enviando múltiplos itens (upload = 1).
    const upload = document.createElement('input');
    upload.type = "hidden";
    upload.name = "upload";
    upload.value = "1";
    form.appendChild(upload);

    // Para cada item do carrinho, criamos inputs hidden seguindo a
    // convenção do PayPal item_name_1, amount_1, quantity_1, etc.
    // Observação: PayPal espera índices começando em 1 (por isso index+1).
    carrinhoItens.forEach((item, index) => {
        const nome = document.createElement('input');
        nome.type = "hidden";
        nome.name = `item_name_${index+1}`; // exemplo: item_name_1
        nome.value = item.nome;
        form.appendChild(nome);

        const preco = document.createElement('input');
        preco.type = "hidden";
        preco.name = `amount_${index+1}`; // exemplo: amount_1
        preco.value = item.preco.toFixed(2); // string com 2 casas decimais
        form.appendChild(preco);

        const quantidade = document.createElement('input');
        quantidade.type = "hidden";
        quantidade.name = `quantity_${index+1}`; // exemplo: quantity_1
        quantidade.value = "1"; // aqui assumimos quantidade 1 por item
        form.appendChild(quantidade);
    });

    // Anexa o formulário ao body e o submete: o usuário será levado ao PayPal.
    document.body.appendChild(form);
    form.submit();
});
