function somenteNumeros(event) {
  const input = event.target;
  input.value = input.value.replace(/\D/g, '');
}

function handlePaste(event) {
  event.preventDefault();
  const clipboardData = event.clipboardData || window.clipboardData;
  let pastedData = clipboardData.getData('text').replace(/\D/g, '');

  const input = event.target;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const newValue = input.value.slice(0, start) + pastedData + input.value.slice(end);

  input.value = newValue.slice(0, 44);
  const newCursorPos = Math.min(start + pastedData.length, 44);
  input.setSelectionRange(newCursorPos, newCursorPos);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

const camposChave = [
  document.getElementById('chave-mdfe'),
  document.getElementById('chave-cte')
];

camposChave.forEach((input) => {
  if (input) {
    input.addEventListener('input', somenteNumeros);
    input.addEventListener('paste', handlePaste);
  }
});

// Lógica do Modal de Info/Erro (Existente)
const infoModal = document.getElementById('infoModal');
const infoModalTitleElement = document.getElementById('infoModalTitleText'); 
const infoModalMessage = document.getElementById('infoModalMessage');
const confirmModalActionBtn = document.getElementById('confirmModalActionBtn');
const cancelModalActionBtn = document.getElementById('cancelModalActionBtn');
let specificModalConfirmAction = null; 

function showInfoModal(title, message, confirmAction = null, showCancelBtn = false, isErrorType = true) {
    if (infoModalTitleElement) {
        infoModalTitleElement.textContent = title;
        if (isErrorType) {
            infoModalTitleElement.style.color = '#dc3545'; 
        } else {
            infoModalTitleElement.style.color = '#004d38'; 
        }
    }
    if (infoModalMessage) infoModalMessage.innerHTML = message.replace(/\n/g, '<br>');
    specificModalConfirmAction = confirmAction;

    if (confirmModalActionBtn) {
        confirmModalActionBtn.className = 'button'; 
        if (showCancelBtn) { 
            confirmModalActionBtn.textContent = 'Continuar';
            confirmModalActionBtn.classList.add('confirm-action-btn'); 
            if (cancelModalActionBtn) cancelModalActionBtn.style.display = 'inline-flex';
        } else { 
            confirmModalActionBtn.textContent = 'OK';
            confirmModalActionBtn.classList.add('secondary-ok-btn'); 
            if (cancelModalActionBtn) cancelModalActionBtn.style.display = 'none';
        }
    }
    if (infoModal) infoModal.style.display = 'flex';
}

function handleModalConfirmAndHide() {
    if (infoModal) infoModal.style.display = 'none';
    if (typeof specificModalConfirmAction === 'function') {
        specificModalConfirmAction(); 
    }
    cleanupModalState();
}

function handleModalCancelAndHide() {
    if (infoModal) infoModal.style.display = 'none';
    cleanupModalState();
}

function cleanupModalState() {
    specificModalConfirmAction = null; 
    if (cancelModalActionBtn) cancelModalActionBtn.style.display = 'none';
    if (confirmModalActionBtn) {
        confirmModalActionBtn.textContent = 'OK'; 
        confirmModalActionBtn.className = 'button'; 
        confirmModalActionBtn.classList.add('secondary-ok-btn'); // Reset para cinza por padrão para OK sozinho
    }
    if (infoModalTitleElement) infoModalTitleElement.style.color = '#004d38'; 
}

if (confirmModalActionBtn) {
    confirmModalActionBtn.addEventListener('click', handleModalConfirmAndHide);
}
if (cancelModalActionBtn) {
    cancelModalActionBtn.addEventListener('click', handleModalCancelAndHide);
}

// Lógica para o novo Social Modal
const socialModal = document.getElementById('socialModal');
const openSocialModalLink = document.getElementById('openSocialModalLink');
const closeSocialModalBtn = document.getElementById('closeSocialModalBtn');

function showSocialModal() {
    if (socialModal) socialModal.style.display = 'flex';
}
function hideSocialModal() {
    if (socialModal) socialModal.style.display = 'none';
}

if (openSocialModalLink) {
    openSocialModalLink.addEventListener('click', (event) => {
        event.preventDefault(); 
        showSocialModal();
    });
}
if (closeSocialModalBtn) {
    closeSocialModalBtn.addEventListener('click', hideSocialModal);
}

// Event listener combinado para fechar modais ao clicar fora
window.addEventListener('click', (event) => {
    if (event.target == infoModal) { 
        handleModalCancelAndHide(); // Usa a lógica de cancelamento do infoModal
    }
    if (event.target == socialModal) {
        hideSocialModal();
    }
});

// Lógica dos botões de consulta
const btnConsultarMdfe = document.getElementById('consultar-mdfe');
if (btnConsultarMdfe) {
  btnConsultarMdfe.addEventListener('click', () => {
    const input = document.getElementById('chave-mdfe');
    const chave = input.value.trim();
    if (chave.length === 44) {
      const modeloDocumento = chave.substring(20, 22); 
      if (modeloDocumento === '58') { 
        const url = `https://dfe-portal.svrs.rs.gov.br/mdfe/qrCode?chMDFe=${chave}&tpAmb=1`;
        window.open(url, '_blank');
        input.value = ''; 
      } else if (modeloDocumento === '57') { 
        showInfoModal('Tipo de Documento Incorreto', 'A chave inserida no campo MDF-e é de um CT-e (modelo 57).\n\nPor favor, utilize o campo "Chave do CT-e" ou insira uma chave de MDF-e válida.', null, false, true);
        input.value = ''; 
      } else if (modeloDocumento === '55') { 
        showInfoModal('Tipo de Documento Incorreto', 'A chave inserida no campo MDF-e é de uma NF-e (modelo 55).\n\nPor favor, utilize o "Portal Oficial NF-e" ou insira uma chave de MDF-e válida.', null, false, true);
        input.value = ''; 
      } else {
        showInfoModal('Chave de MDF-e Inválida', `A chave inserida (modelo ${modeloDocumento || 'desconhecido'}) não parece ser de um MDF-e (modelo 58).\n\nVerifique a chave.`, null, false, true);
        input.value = ''; 
      }
    } else {
      showInfoModal('Chave de MDF-e Inválida', 'Por favor, insira uma chave do MDF-e válida com 44 números.', null, false, true);
      input.value = ''; 
    }
  });
}

const btnConsultarNfe = document.getElementById('consultar-nfe');
if (btnConsultarNfe) {
  btnConsultarNfe.addEventListener('click', () => {
    window.open(
      'https://www.nfe.fazenda.gov.br/portal/consultaRecaptcha.aspx?tipoConsulta=resumo&tipoConteudo=7PhJ+gAVw2g=',
      '_blank'
    );
  });
}

const btnConsultarCte = document.getElementById('consultar-cte');
if (btnConsultarCte) {
  btnConsultarCte.addEventListener('click', () => {
    const input = document.getElementById('chave-cte');
    const chave = input.value.trim();
    if (chave.length === 44) {
      const modeloDocumento = chave.substring(20, 22); 
      if (modeloDocumento === '57') { 
        const url = `https://dfe-portal.svrs.rs.gov.br/cte/qrCode?chCTe=${chave}&tpAmb=1`;
        window.open(url, '_blank');
        input.value = ''; 
      } else if (modeloDocumento === '58') { 
        showInfoModal('Tipo de Documento Incorreto', 'A chave inserida no campo CT-e é de um MDF-e (modelo 58).\n\nPor favor, utilize o campo "Chave do MDF-e" ou insira uma chave de CT-e válida.', null, false, true);
        input.value = ''; 
      } else if (modeloDocumento === '55') { 
         showInfoModal('Tipo de Documento Incorreto', 'A chave inserida no campo CT-e é de uma NF-e (modelo 55).\n\nPor favor, utilize o "Portal Oficial NF-e" ou insira uma chave de CT-e válida.', null, false, true);
         input.value = ''; 
      } else {
        showInfoModal('Chave de CT-e Inválida', `A chave inserida (modelo ${modeloDocumento || 'desconhecido'}) não parece ser de um CT-e (modelo 57).\n\nVerifique a chave.`, null, false, true);
        input.value = ''; 
      }
    } else {
      showInfoModal('Chave de CT-e Inválida', 'Por favor, insira uma chave do CT-e válida com 44 números.', null, false, true);
      input.value = ''; 
    }
  });
}