/* Portafolio terminal — Alexander Watson
   Todo el contenido editable vive en el objeto DATA de más abajo. */

(function () {
    'use strict';

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var USER = 'alexander';
    var HOST = 'awportfolio';

    /* ============================================================
       Contenido — edita aquí, no en el HTML
       ============================================================ */
    var DATA = {
        about: [
            'Alexander Watson — Lima, Peru.',
            '',
            'Estudiando Ciberseguridad en ISIL. Antes: Computacion e Informatica',
            '(Cibertec) y Diseno y Desarrollo de Videojuegos (Toulouse Lautrec).',
            '',
            '4+ anos trabajando con datos en entornos corporativos: depuracion de',
            'bases, reportes, control de calidad y automatizacion de procesos.',
            '',
            'Ahora apunto a mesa de ayuda, operaciones TI y analisis junior de',
            'seguridad. Me gusta dejar los sistemas funcionando y documentados.'
        ],
        skills: [
            'Sistemas    : Linux (uso diario), Windows Server basico',
            'Redes       : cableado estructurado, Cisco Packet Tracer, Huawei/ZTE',
            'Seguridad   : analisis de amenazas, respuesta a incidentes basica',
            'Hardware    : ensamblaje y diagnostico de PCs, Raspberry Pi',
            'Dev         : HTML, CSS, JavaScript, Python y SQL basicos',
            'Herramientas: Git, VS Code, Cisco Packet Tracer'
        ],
        certifications: [
            { year: 2026, name: 'Cisco IT Essentials',              org: 'Cisco Networking Academy', pdf: 'certs/Cert_IT_Essentials8.pdf' },
            { year: 2026, name: 'Cyber Threat Management',           org: 'Cisco Networking Academy', pdf: 'certs/Cert_Amenazas_Ciberneticas.pdf' },
            { year: 2025, name: 'Linux basico',                      org: 'Sistemas UNI',              pdf: '' },
            { year: 2026, name: 'Ensamblaje y mantenimiento de PCs',  org: 'SISE',                      pdf: 'certs/Cert_Sise.pdf' },
            { year: 2021, name: 'Diseno web',                        org: 'Area 51 Training Center',   pdf: '' }
        ],
        projects: [
            {
                name: 'raspberry-monitor',
                desc: 'Servidor casero en Raspberry Pi con Linux para monitoreo de',
                desc2: 'red y automatizacion de tareas.'
            },
            {
                name: 'lab-redes',
                desc: 'Cableado estructurado, ponchado RJ45 y configuracion de',
                desc2: 'equipos en laboratorio con Cisco Packet Tracer.'
            },
            {
                name: 'analisis-amenazas',
                desc: 'Practicas de analisis de malware y phishing, con respuesta',
                desc2: 'basica a incidentes.'
            },
            {
                name: 'etl-datos',
                desc: 'Depuracion y segmentacion de bases de datos, reportes de KPI',
                desc2: 'y automatizacion de flujos operativos.'
            },
            {
                name: 'este-portafolio',
                desc: 'Esta terminal: HTML, CSS y JavaScript a mano, sin frameworks.',
                desc2: 'Repo: github.com/alexanderwatson-code'
            }
        ],
        contact: [
            'email    alexanderwh1703@gmail.com',
            'linkedin linkedin.com/in/Alexander-Watson-H',
            'github   github.com/alexanderwatson-code',
            'ubicacion Lima, Peru'
        ],
        /* Pon aqui el nombre real de tu PDF cuando lo subas al repo,
           por ejemplo "cv/Alexander_Watson.pdf". Vacio = deshabilitado. */
        resumePath: ''
    };

    var FILES = {
        'about.txt':          DATA.about.join('\n'),
        'skills.txt':         DATA.skills.join('\n'),
        'certifications.txt': DATA.certifications.map(function (c) {
            return '[' + c.year + '] ' + c.name + ' — ' + c.org + (c.pdf ? ' (PDF disponible)' : '');
        }).join('\n'),
        'contact.txt':        DATA.contact.join('\n')
    };

    /* ============================================================
       Utilidades de sonido (mismos ganchos que en el otro portafolio) 
       ============================================================ */
    function playSfx(name) {
        var el = document.querySelector('audio[data-sfx="' + name + '"]');
        if (el && el.currentSrc) {
            el.currentTime = 0;
            el.play().catch(function () {});
        }
    }

    /* ============================================================
       Secuencia de arranque
       ============================================================ */
    var bootEl = document.getElementById('boot');
    var loginForm = document.getElementById('login-form');
    var loginUser = document.getElementById('login-user');
    var loginPass = document.getElementById('login-pass');
    var termWindow = document.querySelector('.term-window');
    var termBody = document.getElementById('term-body');
    var quickBar = document.getElementById('quick-bar');

    var BOOT_LINES = [
        ['[    0.000000] ', 'k-dim', 'Booting AlexanderOS 6.6.0-portfolio'],
        ['[    0.041823] ', 'k-dim', 'Loading modules: red, ciberseguridad, raspberrypi ... ', 'k-ok', 'OK'],
        ['[    0.183021] ', 'k-dim', 'Mounting /home/' + USER + ' ... ', 'k-ok', 'OK'],
        ['[    0.512077] ', 'k-dim', 'Starting network manager ... ', 'k-ok', 'OK'],
        ['[    0.734410] ', 'k-dim', 'Starting sshd ... ', 'k-ok', 'OK'],
        ['[    0.921003] ', 'k-dim', 'Starting portfolio.service ... ', 'k-ok', 'OK'],
        ['[    1.055120] ', 'k-dim', HOST + ' login']
    ];

    function renderBootLine(parts) {
        var p = document.createElement('p');
        p.className = 'line';
        for (var i = 0; i < parts.length; i += 2) {
            var span = document.createElement('span');
            span.className = parts[i + 1] || '';
            span.textContent = parts[i];
            p.appendChild(span);
        }
        bootEl.appendChild(p);
    }

    function runBoot() {
        if (reduced) {
            BOOT_LINES.forEach(renderBootLine);
            showLogin();
            return;
        }
        var i = 0;
        (function step() {
            if (i >= BOOT_LINES.length) { showLogin(); return; }
            renderBootLine(BOOT_LINES[i]);
            i++;
            setTimeout(step, 90 + Math.random() * 120);
        })();
    }

    function showLogin() {
        loginForm.style.display = 'block';
        loginUser.focus();
    }

    document.addEventListener('keydown', function (e) {
        if (loginForm.style.display !== 'block') return;
        if (e.key !== 'Enter') return;

        if (document.activeElement === loginUser) {
            e.preventDefault();
            loginPass.focus();
        } else if (document.activeElement === loginPass) {
            e.preventDefault();
            finishLogin();
        }
    });

    /* Red de seguridad para móvil: si el teclado no dispara un "Enter"
       normal, el submit del <form> sí se dispara siempre. */
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (document.activeElement === loginUser) {
            loginPass.focus();
        } else {
            finishLogin();
        }
    });

    function finishLogin() {
        loginForm.style.display = 'none';
        var p1 = document.createElement('p');
        p1.className = 'line dim';
        var now = new Date();
        p1.textContent = 'Last login: ' + now.toDateString() + ' ' +
            now.toTimeString().slice(0, 8) + ' from 190.24.x.x';
        bootEl.appendChild(p1);

        playSfx('login');
        startTerminal();
    }

    /* ============================================================
       Terminal interactiva
       ============================================================ */
    var cwd = '~';
    var history = [];
    var histIndex = -1;
    var inputLineTpl = document.getElementById('input-line-tpl');
    var currentInput = null;

    function promptHtml() {
        return '<span class="prompt">' + USER + '@' + HOST +
            '<span class="sep">:</span><span class="path">' + cwd +
            '</span><span class="sep">$</span> </span>';
    }

    function print(text, cls) {
        var p = document.createElement('p');
        p.className = 'line ' + (cls || 'out');
        p.textContent = text;
        termBody.insertBefore(p, document.querySelector('.term-inputline'));
    }

    function printHTML(html, cls) {
        var p = document.createElement('p');
        p.className = 'line ' + (cls || 'out');
        p.innerHTML = html;
        termBody.insertBefore(p, document.querySelector('.term-inputline'));
    }

    function printBlock(lines, cls) {
        lines.forEach(function (l) { print(l, cls); });
    }

    function scrollToBottom() {
        termBody.scrollTop = termBody.scrollHeight;
    }

    function startTerminal() {
        termWindow.querySelector('.term-inputline').classList.remove('hidden');
        quickBar.classList.remove('hidden');

        /* Lo primero que ve la visita es el panel visual, sin tener que
           escribir nada — resuelve el caso de alguien que no sabe qué
           comandos existen. */
        cmdNeofetch();
        print('Escribe un comando o toca uno de los botones de abajo.', 'dim');

        spawnInput();
    }

    function spawnInput() {
        var line = document.querySelector('.term-inputline');
        /* El <form> es lo que hace confiable la tecla Enter/Ir del teclado
           virtual en Android e iOS: algunos teclados no disparan un evento
           de tecla normal en un <input> suelto, pero SIEMPRE disparan
           "submit" si está dentro de un form. */
        line.innerHTML =
            '<form class="input-form">' + promptHtml() +
            '<input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" ' +
            'enterkeyhint="go" aria-label="Comando">' +
            '<span class="fake-caret"></span></form>';

        var form = line.querySelector('form');
        currentInput = line.querySelector('input');
        currentInput.focus();

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            commit(currentInput.value);
        });

        currentInput.addEventListener('keydown', onKeydown);
        currentInput.addEventListener('input', function () { playSfx('key'); });

        /* En celular, cuando aparece el teclado, aseguramos que la línea
           de entrada quede visible en vez de tapada. */
        currentInput.addEventListener('focus', function () {
            setTimeout(scrollToBottom, 250);
        });
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', scrollToBottom);
        }

        termBody.addEventListener('click', function () { currentInput.focus(); });
    }

    function onKeydown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            var val = currentInput.value;
            commit(val);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (histIndex > 0) { histIndex--; currentInput.value = history[histIndex]; }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (histIndex < history.length - 1) {
                histIndex++;
                currentInput.value = history[histIndex];
            } else {
                histIndex = history.length;
                currentInput.value = '';
            }
        }
    }

    quickBar.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-cmd]');
        if (!btn || !currentInput) return;
        commit(btn.getAttribute('data-cmd'));
        currentInput.focus();
    });

    function commit(raw) {
        var val = raw.trim();

        var line = document.querySelector('.term-inputline');
        var frozen = document.createElement('p');
        frozen.className = 'line cmd';
        frozen.innerHTML = promptHtml() + escapeHtml(raw);
        termBody.insertBefore(frozen, line);

        if (val) { history.push(val); }
        histIndex = history.length;

        playSfx('enter');
        runCommand(val);
        currentInput.value = '';
        scrollToBottom();
    }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    /* ---------- comandos ---------- */

    function runCommand(raw) {
        if (!raw) return;
        var parts = raw.split(/\s+/);
        var cmd = parts[0].toLowerCase();
        var args = parts.slice(1);

        switch (cmd) {
            case 'help':        return cmdHelp();
            case 'whoami':      return print(USER);
            case 'about':       return printBlock(DATA.about);
            case 'skills':      return printBlock(DATA.skills);
            case 'certifications':
            case 'certs':       return cmdCertifications();
            case 'projects':    return cmdProjects();
            case 'contact':     return cmdContact();
            case 'neofetch':    return cmdNeofetch();
            case 'ls':          return cmdLs(args[0]);
            case 'cat':         return cmdCat(args[0]);
            case 'resume':
            case 'cv':          return cmdResume();
            case 'clear':       return cmdClear();
            case 'history':     return printBlock(history.map(function (h, i) { return (i + 1) + '  ' + h; }));
            case 'echo':        return print(args.join(' '));
            case 'date':        return print(new Date().toString());
            case 'pwd':         return print('/home/' + USER);
            case 'sudo':        return cmdSudo(args);
            case 'exit':
            case 'logout':      return cmdExit();
            default:
                print(cmd + ': comando no encontrado. Escribe "help" para ver la lista.', 'err');
        }
    }

    function cmdHelp() {
        printBlock([
            'Comandos disponibles:',
            '',
            '  help              esta ayuda',
            '  whoami            usuario actual',
            '  neofetch          panel de specs',
            '  about             quien soy',
            '  skills            tecnologias',
            '  projects          detalle de proyectos',
            '  certifications    certificados',
            '  contact           datos de contacto',
            '  ls [carpeta]      listar archivos',
            '  cat <archivo>     ver contenido de un archivo',
            '  resume            descargar CV',
            '  history           comandos anteriores',
            '  clear             limpiar pantalla',
            '  exit              cerrar sesion'
        ]);
    }

    function cmdCertifications() {
        DATA.certifications.forEach(function (c) {
            var line = '[' + c.year + '] ' + c.name + ' — ' + c.org;
            if (c.pdf) {
                printHTML(
                    escapeHtml(line) + '  <a href="' + c.pdf + '" target="_blank" rel="noopener">[ver PDF]</a>',
                    'link'
                );
            } else {
                print(line);
            }
        });
    }

    function cmdProjects() {
        DATA.projects.forEach(function (p) {
            printHTML('<span style="color:var(--accent-2)">' + p.name + '/</span>');
            print('  ' + p.desc);
            print('  ' + p.desc2);
            print('');
        });
    }

    function cmdContact() {
        printBlock(DATA.contact);
        printHTML(
            '<a href="mailto:alexanderwh1703@gmail.com">escribir un correo</a>',
            'link'
        );
    }

    function cmdLs(dir) {
        if (dir === 'projects' || dir === 'projects/') {
            printBlock(DATA.projects.map(function (p) { return p.name + '/'; }));
            return;
        }
        var items = ['about.txt', 'skills.txt', 'certifications.txt', 'contact.txt', 'projects/'];
        if (DATA.resumePath) items.push('resume.pdf');
        printBlock(items);
    }

    function cmdCat(file) {
        if (!file) { print('cat: falta el nombre del archivo', 'err'); return; }
        if (FILES[file]) {
            printBlock(FILES[file].split('\n'));
        } else {
            print('cat: ' + file + ': archivo no encontrado', 'err');
        }
    }

    function cmdResume() {
        if (!DATA.resumePath) {
            print('resume: todavia no hay un PDF conectado a este comando.', 'warn');
            print('(Alexander: pon la ruta en DATA.resumePath dentro de main.js)', 'dim');
            return;
        }
        print('Descargando resume.pdf ...', 'accent');
        var a = document.createElement('a');
        a.href = DATA.resumePath;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    function cmdClear() {
        var lines = termBody.querySelectorAll('.line');
        lines.forEach(function (l) { l.remove(); });
    }

    function cmdSudo(args) {
        playSfx('error');
        print('[sudo] password for ' + USER + ':', 'dim');
        print(USER + ' is not in the sudoers file. This incident will be reported.', 'err');
    }

    function cmdExit() {
        print('logout', 'dim');
        setTimeout(function () {
            termWindow.querySelector('.term-inputline').classList.add('hidden');
            quickBar.classList.add('hidden');
            var lines = termBody.querySelectorAll('.line');
            lines.forEach(function (l) { l.remove(); });
            bootEl.innerHTML = '';
            runBoot();
        }, 500);
    }

    function cmdNeofetch() {
        var logo = [
            '      .--.      ',
            '     |o_o |     ',
            '     |:_/ |     ',
            '    //   \\ \\    ',
            '   (|     | )   ',
            '  /\'\\_   _/`\\   ',
            '  \\___)=(___/   '
        ].join('\n');

        var uptimeYears = '4+ anos';
        var html =
            '<div class="neofetch">' +
                '<pre class="logo">' + escapeHtml(logo) + '</pre>' +
                '<div class="specs">' +
                    row('OS', 'AlexanderOS 6.6.0-portfolio') +
                    row('Host', HOST) +
                    row('Uptime', uptimeYears + ' en TI y datos') +
                    row('Shell', 'bash 5.2') +
                    row('Estudios', 'Ciberseguridad, ISIL') +
                    row('Certs', DATA.certifications.length + ' instaladas') +
                    row('Skills', 'Linux, Redes, Seguridad, Raspberry Pi') +
                    row('Contact', 'alexanderwh1703@gmail.com') +
                    '<div class="swatches">' + swatches() + '</div>' +
                '</div>' +
            '</div>';
        printHTML(html);

        function row(k, v) {
            return '<p class="row"><span class="k">' + k + '</span>: ' + v + '</p>';
        }
        function swatches() {
            var colors = ['#ff5f56', '#ffbd2e', '#27c93f', '#58a6ff', '#7ee787', '#c9d1d9'];
            return colors.map(function (c) {
                return '<span style="background:' + c + '"></span>';
            }).join('');
        }
    }

    /* ============================================================
       Arranque
       ============================================================ */
    runBoot();
})();
