export function initWhatsAppController() {
  window.sendWhatsApp = () => {
    const phoneInput = document.getElementById('phone-number');
    const messageInput = document.getElementById('whatsapp-message');
    const linkSelect = document.getElementById('catalog-select');

    const phone = phoneInput.value.trim().replace(/^\+/, '');
    const message = messageInput.value.trim();
    const link = linkSelect.value;

    if (!phone) {
      alert('Por favor ingresa un número de teléfono');
      phoneInput.focus();
      return;
    }
    if (!/^[0-9]+$/.test(phone)) {
      alert('El número de teléfono debe contener solo dígitos');
      return;
    }
    if (!link) {
      alert('Por favor selecciona un enlace de catálogo');
      linkSelect.focus();
      return;
    }

    const fullMessage = encodeURIComponent(`${message}\n${link}`);
    window.open(`https://wa.me/${phone}?text=${fullMessage}`, '_blank');
  };

  window.saveWhatsAppSettings = () => {
    const businessNumber = document.getElementById('business-number').value;
    const defaultMessage = document.getElementById('default-message').value;
    const autoMessage = document.getElementById('auto-message').checked;
    console.log('Configuración guardada:', { businessNumber, defaultMessage, autoMessage });
    alert('Configuración de WhatsApp guardada (simulado).');
  };
}
