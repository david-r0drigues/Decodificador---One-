document.addEventListener('DOMContentLoaded', function() {
    const cxTexto = document.getElementById('cxTexto');
    const imagemResultado = document.getElementById('imagemResultado');
    const textoExibido = document.getElementById('textoExibido');
    const mensagemAguardando = document.getElementById('mensagemAguardando');
    const btnCriptografar = document.getElementById('btnCriptografar');
    const btnDescriptografar = document.getElementById('btnDescriptografar');
    const btnCopiar = document.getElementById('btnCopiar');
    const btnLimpar = document.getElementById('btnLimpar');
    const iconeTema = document.getElementById('iconeTema');

    function atualizarResultado() {
        const texto = cxTexto.value;
        const textoLimpo = texto.toLowerCase().replace(/[^a-z\s]/g, '');
        if (textoLimpo.trim() === '') {
            imagemResultado.style.display = 'block';
            textoExibido.textContent = 'Nenhuma mensagem encontrada';
            mensagemAguardando.style.display = 'none';
        } else {
            imagemResultado.style.display = 'none';
            mensagemAguardando.style.display = 'block';
            if (btnCriptografar.classList.contains('ativo')) {
                const textoCriptografado = criptografar(textoLimpo);
                textoExibido.textContent = textoCriptografado;
            } else {
                const textoDescriptografado = descriptografar(textoLimpo);
                textoExibido.textContent = textoDescriptografado;
            }
        }
    }

    function alternarTema() {
        const body = document.body;
        if (body.classList.contains('claro')) {
            body.classList.remove('claro');
            body.classList.add('escuro');
            iconeTema.src = "./assets/imagem/Lua.png";
            iconeTema.alt = "Ícone do tema escuro";
        } else {
            body.classList.remove('escuro');
            body.classList.add('claro');
            iconeTema.src = "./assets/imagem/sol1.png";
            iconeTema.alt = "Ícone do tema claro";
            body.style.background = 'linear-gradient(135deg, #ffffcc, transparent 70%)';
        }
    }

    iconeTema.addEventListener('click', alternarTema);

    cxTexto.addEventListener('input', function() {
        atualizarResultado();
        if (cxTexto.value.trim() !== '') {
            mensagemAguardando.style.display = 'block';
        }
    });

    btnCriptografar.addEventListener('click', function() {
        btnCriptografar.classList.add('ativo');
        btnDescriptografar.classList.remove('ativo');
        atualizarResultado();
    });

    btnDescriptografar.addEventListener('click', function() {
        btnDescriptografar.classList.add('ativo');
        btnCriptografar.classList.remove('ativo');
        atualizarResultado();
    });

    btnCopiar.addEventListener('click', function() {
        const textoCopiar = textoExibido.textContent;
        navigator.clipboard.writeText(textoCopiar)
            .then(() => {
                console.log('Texto copiado para a área de transferência');
            })
            .catch(err => {
                console.error('Erro ao copiar o texto: ', err);
            });
    });

    btnLimpar.addEventListener('click', function() {
        cxTexto.value = '';
        textoExibido.textContent = 'Nenhuma mensagem encontrada';
        imagemResultado.style.display = 'block';
        mensagemAguardando.style.display = 'none';
    });

    function criptografar(texto) {
        return texto.replace(/e/g, 'enter')
                    .replace(/i/g, 'imes')
                    .replace(/a/g, 'ai')
                    .replace(/o/g, 'ober')
                    .replace(/u/g, 'ufat');
    }

    function descriptografar(texto) {
        return texto.replace(/enter/g, 'e')
                    .replace(/imes/g, 'i')
                    .replace(/ai/g, 'a')
                    .replace(/ober/g, 'o')
                    .replace(/ufat/g, 'u');
    }
});
