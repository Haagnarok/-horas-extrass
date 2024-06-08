document.getElementById('calculoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let horasNormais = parseFloat(document.getElementById('horasNormais').value);
    let horasExtras = parseFloat(document.getElementById('horasExtras').value);
    let valorHora = parseFloat(document.getElementById('valorHora').value);
    let horasPlantao = parseFloat(document.getElementById('horasPlantao').value);
    let ValSemana = parseFloat(document.getElementById('ValSemana').value);

    if (isNaN(horasNormais) || isNaN(horasExtras) || isNaN(valorHora) || isNaN(horasPlantao)) {
        document.getElementById('resultado').innerText = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    let pagamentoHorasNormais = horasNormais * valorHora;
    let pagamentoValorHoraExtra = valorHora * 1.55; // Valor da hora + 55%
    let pagamentoHorasExtras = pagamentoValorHoraExtra * horasExtras;
    let pagamentoPlantao = pagamentoValorHoraExtra * horasPlantao;
    let valSemana = 56 ;  // horas sobre aviso semana
    let semana = '' * (valorHora * 0,33);
    let valFimSemana = 63 ;  // horas sobre aviso semana
    let FimSemana = '' * (valorHora * 0,33);
   

    let total = pagamentoHorasNormais + pagamentoHorasExtras + pagamentoPlantao + ((valFimSemana - horasPlantao)* FimSemana);

    document.getElementById('resultado').innerText = `Total bruto a receber: R$ ${total.toFixed(2)}`;
});

document.getElementById('downloadPdf').addEventListener('click', function() {
    let horasNormais = document.getElementById('horasNormais').value;
    let horasExtras = document.getElementById('horasExtras').value;
    let valorHora = document.getElementById('valorHora').value;
    let horasPlantao = document.getElementById('horasPlantao').value;
    let resultado = document.getElementById('resultado').innerText;
    let mês = document.getElementById('mês').value;


    if (resultado === "") {
        alert("Por favor, preencha o formulário e clique em Calcular primeiro.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(20, 20, 'Cálculo de Horas Extras e Plantão');

    // Subtítulo
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(20, 30, 'Resumo dos Valores Calculados');

    // Conteúdo
    doc.setFontSize(12);
    doc.text(140, 30, `Mês Vigente: ${mês}`);
    doc.text(20, 40, `Horas Normais Trabalhadas: ${horasNormais}`);
    doc.text(20, 50, `Horas Extras: ${horasExtras}`);
    doc.text(20, 60, `Valor da Hora (R$): ${valorHora}`);
    doc.text(20, 70, `Horas de Plantão: ${horasPlantao}`);
    doc.text(20, 80, resultado);


    // Linha divisória
    doc.setLineWidth(0.5);
    doc.line(20, 85, 200, 85);

    // Tabela de detalhes
    doc.setFont("helvetica", "bold");
    doc.text(20, 95, 'Detalhes dos Pagamentos:');

    doc.setFont("helvetica", "normal");
    doc.text(20, 105, 'Horas Normais');
    doc.text(90, 105, `R$ ${(horasNormais * valorHora).toFixed(2)}`);
    
    doc.text(20, 115, 'Horas Extras');
    doc.text(90, 115, `R$ ${(horasExtras * valorHora * 1.55).toFixed(2)}`);

    doc.text(20, 125, 'Horas de Plantão');
    doc.text(90, 125, `R$ ${(horasPlantao * valorHora * 1.55).toFixed(2)}`);

    doc.setFont("helvetica", "bold");
    doc.text(20, 135, 'Total Bruto');
    doc.text(90, 135, resultado.split(': ')[1]);

    // Salvar PDF
    doc.save('Cálculo de Horas Extras e Plantão.pdf');
});
