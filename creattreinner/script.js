// script.js

// Atualiza ano no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Exercícios
const exercicios = {
  Hipertrofia: {
    Peito: ["Supino Reto", "Supino Inclinado", "Crucifixo", "Flexão", "Supino Declinado"],
    Costas: ["Puxada Frontal", "Remada Curvada", "Remada Unilateral", "Levantamento Terra", "Barra Fixa"],
    Quadriceps: ["Agachamento", "Leg Press", "Cadeira Extensora"],
    Posteriores: ["Stiff", "Avanço"],
    Gluteos: ["Ponte Glútea", "Elevação Quadril"],
    Ombros: ["Desenvolvimento Militar", "Elevação Lateral", "Elevação Frontal", "Remada Alta", "Arnold Press"],
    Biceps: ["Rosca Direta", "Rosca Martelo", "Rosca Concentrada"],
    Triceps: ["Tríceps Corda", "Tríceps Testa"],
    Abdomen: ["Prancha", "Abdominal Supra", "Abdominal Infra", "Abdominal Oblíquo", "Prancha Lateral"]
  },
  Emagrecimento: {
    Peito: ["Flexão", "Supino Inclinado leve", "Crucifixo com halteres leves", "Supino reto leve"],
    Costas: ["Remada baixa leve", "Puxada frente leve", "Barra fixa assistida", "Superman"],
    Quadriceps: ["Agachamento leve", "Afundo"],
    Posteriores: ["Saltos step", "Polichinelo"],
    Gluteos: ["Elevação quadril leve", "Ponte glútea"],
    Ombros: ["Elevação Lateral leve", "Desenvolvimento Militar leve", "Elevação Frontal leve", "Prancha com ombro"],
    Biceps: ["Rosca Direta leve", "Rosca Martelo leve"],
    Triceps: ["Tríceps Testa leve", "Flexão diamante leve"],
    Abdomen: ["Prancha", "Abdominal Supra", "Abdominal Infra", "Mountain Climber"]
  }
};

// Seleciona 4 exercícios aleatórios
function escolher4(arr){
  const copia = arr.slice();
  const selecionados = [];
  while(selecionados.length<4 && copia.length>0){
    const idx = Math.floor(Math.random()*copia.length);
    selecionados.push(copia.splice(idx,1)[0]);
  }
  return selecionados;
}

// Gera plano split A/B/C
function gerarPlano(objetivo,dias){
  const plano = [];
  const gruposPorDia = [
    ["Peito","Biceps"],
    ["Costas","Triceps"],
    ["Quadriceps","Posteriores","Gluteos","Ombros","Abdomen"]
  ];

  for(let d=0; d<dias; d++){
    const dia = {};
    const grupos = gruposPorDia[d % gruposPorDia.length];
    grupos.forEach(g=>{
      if(exercicios[objetivo][g]){
        dia[g] = escolher4(exercicios[objetivo][g]);
      }
    });
    plano.push(dia);
  }
  return plano;
}

// Seleciona elementos do DOM
const form = document.getElementById("form-treino");
const ficha = document.getElementById("ficha");
const resultado = document.getElementById("resultado");
const imprimirBtn = document.getElementById("imprimir");
const pdfBtn = document.getElementById("baixar-pdf");

// Cores por grupo para PDF
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

// Submeter formulário
form.addEventListener("submit", e=>{
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value;
  const peso = document.getElementById("peso").value;
  const altura = document.getElementById("altura").value;
  const sexo = document.getElementById("sexo").value;
  const objetivo = document.getElementById("objetivo").value;
  const dias = parseInt(document.getElementById("dias").value);

  const plano = gerarPlano(objetivo,dias);

  resultado.innerHTML = "";

  const info = document.createElement("p");
  info.innerHTML = `<strong>${nome}</strong> (${sexo}), ${idade} anos, ${peso}kg, ${altura}cm - <strong>${objetivo}</strong>`;
  resultado.appendChild(info);

  plano.forEach((dia,index)=>{
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h4>Dia ${index+1}</h4>`;
    for(const grupo in dia){
      const grupoTitulo = document.createElement("h5");
      grupoTitulo.textContent = grupo;
      card.appendChild(grupoTitulo);

      const ul = document.createElement("ul");
      dia[grupo].forEach(ex=>{
        const li = document.createElement("li");
        li.textContent = ex;
        ul.appendChild(li);
      });
      card.appendChild(ul);
    }
    resultado.appendChild(card);
  });

  ficha.classList.remove("hidden");
  ficha.scrollIntoView({behavior:"smooth"});
});

// Imprimir
imprimirBtn.addEventListener("click", ()=>window.print());

// PDF moderno e organizado
pdfBtn.addEventListener("click", ()=>{
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:"pt"});
  let y = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const nomeAluno = document.getElementById("nome").value.trim() || "Aluno";
  const infoAluno = `${nomeAluno} - ${document.getElementById("sexo").value}, ${document.getElementById("idade").value} anos, ${document.getElementById("peso").value}kg, ${document.getElementById("altura").value}cm`;

  // Fundo da página
  doc.setFillColor(18,18,18);
  doc.rect(0,0,pageWidth,pageHeight,"F");

  // Título
  doc.setFont("helvetica","bold");
  doc.setFontSize(26);
  doc.setTextColor(255,106,0);
  doc.text("Ficha de Treino - CreatTreinner",40,y);
  y += 35;

  // Info do aluno
  doc.setFont("helvetica","normal");
  doc.setFontSize(14);
  doc.setTextColor(255,255,255);
  doc.text(infoAluno,40,y);
  y += 30;

  const cards = resultado.querySelectorAll(".card");
  cards.forEach(card=>{
    const diaTitle = card.querySelector("h4").innerText;
    const grupos = card.querySelectorAll("h5");

    // Calcula altura dinâmica do card
    let cardHeight = 25;
    grupos.forEach(g=>{
      const exs = g.nextElementSibling.querySelectorAll("li");
      cardHeight += 20; // título grupo
      cardHeight += exs.length * 16; // exercícios
      cardHeight += 8;
    });
    cardHeight += 12;

    if(y + cardHeight > pageHeight - 40){
      doc.addPage();
      y = 40;
      doc.setFillColor(18,18,18);
      doc.rect(0,0,pageWidth,pageHeight,"F");
    }

    // Card de fundo
    doc.setFillColor(40,40,40);
    doc.roundedRect(35,y-15,520,cardHeight,10,10,"F");

    // Título do dia
    doc.setFont("helvetica","bold");
    doc.setFontSize(16);
    doc.setTextColor(255,106,0);
    doc.text(diaTitle,45,y);
    y += 25;

    grupos.forEach(g=>{
      // Cor do grupo
      const cor = coresGrupo[g.innerText] || [255,255,255];
      doc.setFont("helvetica","bold");
      doc.setFontSize(14);
      doc.setTextColor(...cor);
      doc.text(g.innerText,45,y);
      y += 20;

      const exs = g.nextElementSibling.querySelectorAll("li");
      doc.setFont("helvetica","normal");
      doc.setFontSize(12);
      doc.setTextColor(255,255,255);
      exs.forEach(ex=>{
        doc.text("- " + ex.innerText,50,y);
        y += 16;
      });
      y += 8;
    });
    y += 12;
  });

  const nomeArq = nomeAluno.replace(/\s+/g,"_");
  doc.save(`Ficha_${nomeArq}.pdf`);
});
