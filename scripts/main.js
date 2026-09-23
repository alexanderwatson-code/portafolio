/* Portafolio terminal — Alexander Watson
   Todo el contenido editable vive en el objeto DATA de más abajo.
   Interacción: solo clics — no hay comandos ni claves que escribir. */

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
           por ejemplo "cv/Alexander_Watson.pdf". Vacio = boton deshabilitado. */
        resumePath: ''
    };

    /* ============================================================
       Utilidades
       ============================================================ */
    function playSfx(name) {
        var el = document.querySelector('audio[data-sfx="' + name + '"]');
        if (el && el.currentSrc) {
            el.currentTime = 0;
            el.play().catch(function () {});
        }
    }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    /* ============================================================
       Elementos
       ============================================================ */
    var bootEl = document.getElementById('boot');
    var dashboard = document.getElementById('dashboard');
    var heroCard = document.getElementById('hero-card');
    var cardGrid = document.getElementById('card-grid');
    var quickBar = document.getElementById('quick-bar');

    /* ============================================================
       Secuencia de arranque — solo mensajes de sistema, nada que
       requiera escribir ni ninguna clave.
       ============================================================ */
    var BOOT_LINES = [
        ['[    0.000000] ', 'k-dim', 'Booting AlexanderOS 6.6.0-portfolio'],
        ['[    0.041823] ', 'k-dim', 'Loading modules: red, ciberseguridad, raspberrypi ... ', 'k-ok', 'OK'],
        ['[    0.183021] ', 'k-dim', 'Mounting /home/' + USER + ' ... ', 'k-ok', 'OK'],
        ['[    0.512077] ', 'k-dim', 'Starting network manager ... ', 'k-ok', 'OK'],
        ['[    0.734410] ', 'k-dim', 'Starting portfolio.service ... ', 'k-ok', 'OK'],
        ['[    0.921003] ', 'k-dim', 'Acceso automatico como ' + USER + ' ... ', 'k-ok', 'OK']
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
            revealAll();
            return;
        }
        var i = 0;
        (function step() {
            if (i >= BOOT_LINES.length) {
                setTimeout(revealAll, 200);
                return;
            }
            renderBootLine(BOOT_LINES[i]);
            i++;
            setTimeout(step, 90 + Math.random() * 120);
        })();
    }

    /* ============================================================
       Panel de presentación: hero (neofetch) + tarjetas.
       Se revela solo, automáticamente, sin ninguna interacción.
       ============================================================ */

    function neofetchHTML() {
        var logo = [
            '      .--.      ',
            '     |o_o |     ',
            '     |:_/ |     ',
            '    //   \\ \\    ',
            '   (|     | )   ',
            '  /\'\\_   _/`\\   ',
            '  \\___)=(___/   '
        ].join('\n');

        function row(k, v) {
            return '<p class="row"><span class="k">' + k + '</span>: ' + v + '</p>';
        }
        function swatches() {
            var colors = ['#ff5f56', '#ffbd2e', '#27c93f', '#58a6ff', '#7ee787', '#c9d1d9'];
            return colors.map(function (c) {
                return '<span style="background:' + c + '"></span>';
            }).join('');
        }

        return '<div class="neofetch">' +
                '<pre class="logo">' + escapeHtml(logo) + '</pre>' +
                '<div class="specs">' +
                    row('OS', 'AlexanderOS 6.6.0-portfolio') +
                    row('Host', HOST) +
                    row('Uptime', '4+ anos en TI y datos') +
                    row('Estudios', 'Ciberseguridad, ISIL') +
                    row('Certs', DATA.certifications.length + ' instaladas') +
                    row('Skills', 'Linux, Redes, Seguridad, Raspberry Pi') +
                    row('Contact', 'alexanderwh1703@gmail.com') +
                    '<div class="swatches">' + swatches() + '</div>' +
                '</div>' +
            '</div>';
    }

    function certsCardHTML() {
        return DATA.certifications.map(function (c) {
            var line = '[' + c.year + '] ' + c.name + ' — ' + c.org;
            var link = c.pdf
                ? ' <a href="' + c.pdf + '" target="_blank" rel="noopener">[ver PDF]</a>'
                : '';
            return '<p class="row">' + escapeHtml(line) + link + '</p>';
        }).join('');
    }

    function projectsCardHTML() {
        return DATA.projects.map(function (p) {
            return '<p class="row"><span class="k">' + escapeHtml(p.name) + '/</span></p>' +
                '<p class="row dim-row">' + escapeHtml(p.desc) + '</p>' +
                '<p class="row dim-row" style="margin-bottom:10px">' + escapeHtml(p.desc2) + '</p>';
        }).join('');
    }

    function contactCardHTML() {
        var rows = DATA.contact.map(function (l) { return '<p class="row">' + escapeHtml(l) + '</p>'; }).join('');
        var links = '<p class="row"><a href="mailto:alexanderwh1703@gmail.com">escribir un correo</a></p>';
        if (DATA.resumePath) {
            links += '<p class="row"><a href="' + DATA.resumePath + '" download>descargar CV</a></p>';
        }
        return rows + links;
    }

    function revealAll() {
        heroCard.innerHTML = neofetchHTML();
        cardGrid.innerHTML =
            card('about', 'about', DATA.about.map(escapeHtml).join('<br>')) +
            card('skills', 'skills', DATA.skills.map(escapeHtml).join('<br>')) +
            card('certifications', 'certifications', certsCardHTML()) +
            card('projects', 'projects', projectsCardHTML(), 'wide') +
            card('contact', 'contact', contactCardHTML());

        dashboard.classList.remove('hidden');
        quickBar.classList.remove('hidden');
        playSfx('reveal');

        if (reduced) {
            heroCard.classList.add('revealed');
            cardGrid.querySelectorAll('.card').forEach(function (c) { c.classList.add('revealed'); });
            return;
        }

        requestAnimationFrame(function () {
            setTimeout(function () {
                heroCard.classList.add('revealed');
                cardGrid.querySelectorAll('.card').forEach(function (c) { c.classList.add('revealed'); });
            }, 30);
        });

        function card(id, label, bodyHtml, extraClass) {
            return '<section class="card ' + (extraClass || '') + '" id="card-' + id + '">' +
                '<div class="card-head">' + label + '</div>' +
                '<div class="card-body">' + bodyHtml + '</div>' +
                '</section>';
        }
    }

    /* ============================================================
       Barra de navegación: solo clics, salta a cada tarjeta o
       dispara una acción (descargar CV, reiniciar la animación).
       ============================================================ */
    quickBar.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-action]');
        if (!btn) return;
        var action = btn.getAttribute('data-action');
        playSfx('click');

        if (action === 'resume') {
            downloadResume();
        } else if (action === 'reboot') {
            rebootSequence();
        } else {
            var target = document.getElementById('card-' + action);
            if (target) target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        }
    });

    function downloadResume() {
        if (!DATA.resumePath) {
            var btn = quickBar.querySelector('[data-action="resume"]');
            if (btn) {
                var original = btn.textContent;
                btn.textContent = 'aun no hay CV';
                setTimeout(function () { btn.textContent = original; }, 1800);
            }
            return;
        }
        var a = document.createElement('a');
        a.href = DATA.resumePath;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    function rebootSequence() {
        dashboard.classList.add('hidden');
        quickBar.classList.add('hidden');
        heroCard.classList.remove('revealed');
        heroCard.innerHTML = '';
        cardGrid.innerHTML = '';
        bootEl.innerHTML = '';
        window.scrollTo({ top: 0, behavior: 'auto' });
        runBoot();
    }

    /* ============================================================
       Arranque
       ============================================================ */
    runBoot();
})();
