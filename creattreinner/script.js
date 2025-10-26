// script.js

// ==========================
// Atualiza o ano no rodapé
// ==========================
document.getElementById("ano").textContent = new Date().getFullYear();
// → Pega o elemento com id "ano" e insere o ano atual (ex: 2025)

// ==========================
// Banco de dados de exercícios
// ==========================
// Objeto contendo listas de exercícios por objetivo e grupo muscular
const exercicios = {
  Emagrecimento: { // → Objetivo: Emagrecimento
    Peito: ["Flexão", "Supino Inclinado leve", "Crucifixo com halteres leves", "Supino reto leve"],
    Costas: ["Remada baixa leve", "Puxada frente leve", "Barra fixa assistida", "Superman"],
    Quadriceps: ["Agachamento leve", "Afundo"],
    Posteriores: ["Saltos step", "Polichinelo"],
    Gluteos: ["Elevação quadril leve", "Ponte glútea"],
    Ombros: ["Elevação Lateral leve", "Desenvolvimento Militar leve", "Elevação Frontal leve", "Prancha com ombro"],
    Biceps: ["Rosca Direta leve", "Rosca Martelo leve"],
    Triceps: ["Tríceps Testa leve", "Flexão diamante leve"],
    Abdomen: ["Prancha", "Abdominal Supra", "Abdominal Infra", "Mountain Climber"]
  },

  Hipertrofia: { // → Objetivo: Ganho de massa muscular
    Peito: ["Supino Reto pesado 3x12", "Supino Inclinado com barra 3x12", "Crucifixo com halteres 3x12", "Flexão com peso 3x12"],
    Costas: ["Remada curvada 3x12", "Puxada frente com carga 3x12", "Barra fixa 3x12", "Pullover com halteres 3x12"],
    Quadriceps: ["Agachamento com barra 3x12", "Leg Press 3x12", "Avanço com barra 3x12"],
    Posteriores: ["Stiff 3x12" , "Mesa flexora 3x12", "Peso morto romeno 3x12"],
    Gluteos: ["Hip Thrust 3x12", "Elevação quadril com barra 3x12", "Glute Kickback com carga 3x12"],
    Ombros: ["Desenvolvimento Militar com barra 3x12", "Elevação lateral com halteres 3x12", "Arnold Press 3x12"],
    Biceps: ["Rosca Direta com barra 3x12", "Rosca Alternada com halteres 3x12", "Rosca Scott 3x12"],
    Triceps: ["Tríceps Testa 3x12", "Mergulho em paralelas 3x12", "Tríceps Corda 3x12"],
    Abdomen: ["Abdominal Supra com peso 3x12", "Prancha com carga 3x12", "Abdominal Oblíquo com halteres 3x12"]
  },

  Força: { // → Objetivo: Aumentar força
    Peito: ["Supino Reto pesado", "Supino Inclinado pesado", "Flexão com colete de peso"],
    Costas: ["Barra fixa pesada", "Remada curvada com barra", "Peso morto"],
    Quadriceps: ["Agachamento livre pesado", "Leg Press pesado", "Avanço com barra"],
    Posteriores: ["Stiff pesado", "Peso morto romeno", "Mesa flexora com carga"],
    Gluteos: ["Hip Thrust com barra", "Elevação quadril com peso", "Glute Kickback com carga"],
    Ombros: ["Desenvolvimento Militar com barra pesada", "Elevação lateral com halteres pesados", "Push Press"],
    Biceps: ["Rosca Direta pesada", "Rosca Alternada com carga", "Rosca Scott com barra"],
    Triceps: ["Tríceps Testa pesado", "Mergulho em paralelas com peso", "Tríceps Corda pesada"],
    Abdomen: ["Prancha com colete", "Abdominal Supra com peso", "Abdominal com roda"]
  },

  Resistência: { // → Objetivo: Resistência muscular
    Peito: ["Flexão contínua", "Supino com baixa carga e altas repetições", "Crucifixo com halteres leves e altas repetições"],
    Costas: ["Remada baixa leve com altas repetições", "Puxada frente leve e contínua", "Superman por tempo prolongado"],
    Quadriceps: ["Agachamento leve contínuo", "Afundo alternado contínuo", "Step-ups com repetições altas"],
    Posteriores: ["Saltos step contínuos", "Polichinelo prolongado", "Good mornings leves e repetitivos"],
    Gluteos: ["Ponte glútea com repetições altas", "Elevação quadril contínua", "Kickbacks leves"],
    Ombros: ["Elevação lateral leve e contínua", "Desenvolvimento militar leve e repetitivo", "Elevação frontal leve por tempo"],
    Biceps: ["Rosca Direta leve e repetitiva", "Rosca Martelo leve contínua"],
    Triceps: ["Tríceps Testa leve e contínuo", "Flexão diamante leve e repetitiva"],
    Abdomen: ["Prancha longa duração", "Abdominal Supra e Infra contínuo", "Mountain Climber por tempo prolongado"]
  },

  Calistenia: { // → Objetivo: Treino com peso corporal
    Peito: ["Flexão normal", "Flexão inclinada", "Flexão declinada", "Flexão arqueada", "Flexão explosiva", "Flexão diamante"],
    Costas: ["Pull-up", "Chin-up", "Remada invertida", "Front Lever tuck", "Superman"],
    Quadriceps: ["Agachamento livre", "Agachamento com salto", "Pistol squat", "Avanço explosivo", "Step-up"],
    Posteriores: ["Bridge", "Hip hinge unilateral", "Good morning com peso corporal"],
    Gluteos: ["Ponte glútea", "Hip Thrust unilateral", "Kickback elevado", "Elevação quadril"],
    Ombros: ["Handstand push-up", "Flexão pike", "Archer push-up", "Prancha com toque de ombro"],
    Biceps: ["Pull-up supinado", "Chin-up pesado", "Australian pull-up", "Rosca com toalha"],
    Triceps: ["Dips em paralelas", "Flexão diamante", "Pseudo planche push-up", "Flexão tríceps"],
    Abdomen: ["Dragon flag", "L-sit", "Hanging leg raise", "Prancha", "Mountain Climber", "Abdominal Supra e Infra"]
  }
};

// ===================================
// Função para escolher 4 exercícios aleatórios
// ===================================
function escolher4(arr) {
  const copia = arr.slice(); // Cria cópia do array original
  const selecionados = []; // Armazena os escolhidos

  // Enquanto não tiver 4 exercícios, sorteia um e remove da cópia
  while (selecionados.length < 4 && copia.length > 0) {
    const idx = Math.floor(Math.random() * copia.length); // Índice aleatório
    selecionados.push(copia.splice(idx, 1)[0]); // Remove e adiciona à lista
  }
  return selecionados;
}

// ===================================
// Função principal: gerar plano de treino
// ===================================
function gerarPlano(objetivo, dias) {
  const plano = [];
  // Define os grupos musculares de cada dia (A/B/C)
  const gruposPorDia = [
    ["Peito", "Biceps"], // Dia A
    ["Costas", "Triceps"], // Dia B
    ["Quadriceps", "Posteriores", "Gluteos", "Ombros", "Abdomen"] // Dia C
  ];

  // Gera treino para o número de dias escolhido
  for (let d = 0; d < dias; d++) {
    const dia = {};
    const grupos = gruposPorDia[d % gruposPorDia.length]; // Cicla A/B/C
    grupos.forEach(g => {
      if (exercicios[objetivo][g]) {
        dia[g] = escolher4(exercicios[objetivo][g]); // Escolhe 4 exercícios
      }
    });
    plano.push(dia);
  }
  return plano;
}

// ===================================
// Seleciona elementos do DOM
// ===================================
const form = document.getElementById("form-treino");
const ficha = document.getElementById("ficha");
const resultado = document.getElementById("resultado");
const imprimirBtn = document.getElementById("imprimir");
const pdfBtn = document.getElementById("baixar-pdf");

// ===================================
// Define cores para cada grupo muscular (usado no PDF)
// ===================================
const coresGrupo = {
  Peito: [255,106,0],
  Costas: [0,150,255],
  Quadriceps: [0,200,0],
  Posteriores: [150,0,150],
  Gluteos: [255,0,150],
  Ombros: [255,200,0],
  Biceps: [0,255,255],
  Triceps: [255,50,50],
  Abdomen: [200,200,200]
};

// ===================================
// Ao enviar o formulário, gera o plano
// ===================================
form.addEventListener("submit", e => {
  e.preventDefault(); // Impede o reload da página

  // Pega os valores do formulário
  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value;
  const peso = document.getElementById("peso").value;
  const altura = document.getElementById("altura").value;
  const sexo = document.getElementById("sexo").value;
  const objetivo = document.getElementById("objetivo").value;
  const dias = parseInt(document.getElementById("dias").value);

  // Gera plano com base nos dados
  const plano = gerarPlano(objetivo, dias);

  // Limpa o resultado anterior
  resultado.innerHTML = "";

  // Exibe informações do aluno
  const info = document.createElement("p");
  info.innerHTML = `<strong>${nome}</strong> (${sexo}), ${idade} anos, ${peso}kg, ${altura}cm - <strong>${objetivo}</strong>`;
  resultado.appendChild(info);

  // Exibe treino por dia
  plano.forEach((dia, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h4>Dia ${index + 1}</h4>`;
    for (const grupo in dia) {
      const grupoTitulo = document.createElement("h5");
      grupoTitulo.textContent = grupo;
      card.appendChild(grupoTitulo);

      const ul = document.createElement("ul");
      dia[grupo].forEach(ex => {
        const li = document.createElement("li");
        li.textContent = ex;
        ul.appendChild(li);
      });
      card.appendChild(ul);
    }
    resultado.appendChild(card);
  });

  // Mostra a ficha gerada e rola até ela
  ficha.classList.remove("hidden");
  ficha.scrollIntoView({ behavior: "smooth" });
});

// ===================================
// Botão de imprimir (usa o print do navegador)
// ===================================
imprimirBtn.addEventListener("click", () => window.print());

// ===================================
// Botão de gerar PDF moderno e organizado
// ===================================
pdfBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt" }); // unidade em pontos
  let y = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Informações do aluno
  const nomeAluno = document.getElementById("nome").value.trim() || "Aluno";
  const infoAluno = `${nomeAluno} - ${document.getElementById("sexo").value}, ${document.getElementById("idade").value} anos, ${document.getElementById("peso").value}kg, ${document.getElementById("altura").value}cm`;

  // Fundo escuro da página
  doc.setFillColor(18,18,18);
  doc.rect(0,0,pageWidth,pageHeight,"F");

  // Título principal
  doc.setFont("helvetica","bold");
  doc.setFontSize(26);
  doc.setTextColor(255,106,0);
  doc.text("Ficha de Treino - Create Training",40,y);
  y += 35;

  // Info do aluno
  doc.setFont("helvetica","normal");
  doc.setFontSize(14);
  doc.setTextColor(255,255,255);
  doc.text(infoAluno,40,y);
  y += 30;

  // Pega todos os cards (dias)
  const cards = resultado.querySelectorAll(".card");
  cards.forEach(card => {
    const diaTitle = card.querySelector("h4").innerText;
    const grupos = card.querySelectorAll("h5");

    // Calcula altura necessária para o card (para evitar corte de página)
    let cardHeight = 25;
    grupos.forEach(g => {
      const exs = g.nextElementSibling.querySelectorAll("li");
      cardHeight += 20; // espaço para o título
      cardHeight += exs.length * 16; // espaço para cada exercício
      cardHeight += 8;
    });
    cardHeight += 12;

    // Quebra de página automática
    if (y + cardHeight > pageHeight - 40) {
      doc.addPage();
      y = 40;
      doc.setFillColor(18,18,18);
      doc.rect(0,0,pageWidth,pageHeight,"F");
    }

    // Fundo do card
    doc.setFillColor(40,40,40);
    doc.roundedRect(35,y-15,520,cardHeight,10,10,"F");

    // Título do dia
    doc.setFont("helvetica","bold");
    doc.setFontSize(16);
    doc.setTextColor(255,106,0);
    doc.text(diaTitle,45,y);
    y += 25;

    // Grupos musculares e exercícios
    grupos.forEach(g => {
      const cor = coresGrupo[g.innerText] || [255,255,255]; // Cor específica
      doc.setFont("helvetica","bold");
      doc.setFontSize(14);
      doc.setTextColor(...cor);
      doc.text(g.innerText,45,y);
      y += 20;

      const exs = g.nextElementSibling.querySelectorAll("li");
      doc.setFont("helvetica","normal");
      doc.setFontSize(12);
      doc.setTextColor(255,255,255);
      exs.forEach(ex => {
        doc.text("- " + ex.innerText,50,y);
        y += 16;
      });
      y += 8;
    });
    y += 12;
  });

  // Salva o PDF com nome personalizado
  const nomeArq = nomeAluno.replace(/\s+/g,"_");
  doc.save(`Ficha_${nomeArq}.pdf`);
});
