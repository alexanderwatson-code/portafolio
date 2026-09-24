/* Portafolio terminal — Alexander Watson
   Todo el contenido editable vive en el objeto DATA de más abajo.
   Cada página (about/projects/certifications/contact) rellena su propia
   tarjeta a partir de estos mismos datos, así solo hay que editar aquí. */

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

    function card(label, bodyHtml, extraClass) {
        return '<section class="card ' + (extraClass || '') + '">' +
            '<div class="card-head">' + label + '</div>' +
            '<div class="card-body">' + bodyHtml + '</div>' +
            '</section>';
    }

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

    /* ============================================================
       Botón "resume": el único botón que no es un link normal,
       porque dispara una descarga en vez de navegar.
       ============================================================ */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-action="resume"]');
        if (!btn) return;
        playSfx('click');

        if (!DATA.resumePath) {
            var original = btn.textContent;
            btn.textContent = 'aun no hay CV';
            setTimeout(function () { btn.textContent = original; }, 1800);
            return;
        }
        var a = document.createElement('a');
        a.href = DATA.resumePath;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
    });

    document.querySelectorAll('.quick-bar a').forEach(function (a) {
        a.addEventListener('click', function () { playSfx('click'); });
    });

    function revealCards() {
        var grid = document.getElementById('card-grid');
        if (!grid) return;
        requestAnimationFrame(function () {
            setTimeout(function () {
                grid.querySelectorAll('.card').forEach(function (c) { c.classList.add('revealed'); });
            }, reduced ? 0 : 60);
        });
    }

    /* ============================================================
       Página de inicio: arranque + panel de specs.
       ============================================================ */
    var bootEl = document.getElementById('boot');

    if (bootEl) {
        var heroCard = document.getElementById('hero-card');
        var quickBar = document.getElementById('quick-bar');

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

        function revealHome() {
            heroCard.innerHTML = neofetchHTML();
            quickBar.classList.remove('hidden');
            playSfx('reveal');
            if (reduced) { heroCard.classList.add('revealed'); return; }
            requestAnimationFrame(function () {
                setTimeout(function () { heroCard.classList.add('revealed'); }, 30);
            });
        }

        if (reduced) {
            BOOT_LINES.forEach(renderBootLine);
            revealHome();
        } else {
            var i = 0;
            (function step() {
                if (i >= BOOT_LINES.length) { setTimeout(revealHome, 200); return; }
                renderBootLine(BOOT_LINES[i]);
                i++;
                setTimeout(step, 90 + Math.random() * 120);
            })();
        }
    }

    /* ============================================================
       Páginas internas: cada una rellena su propia tarjeta según
       el atributo data-page del <body>.
       ============================================================ */
    var page = document.body.getAttribute('data-page');
    var grid = document.getElementById('card-grid');

    if (grid && page) {
        if (page === 'about') {
            grid.innerHTML =
                card('about', DATA.about.map(escapeHtml).join('<br>')) +
                card('skills', DATA.skills.map(escapeHtml).join('<br>'));
        } else if (page === 'projects') {
            grid.innerHTML = card('projects', projectsCardHTML(), 'wide');
        } else if (page === 'certifications') {
            grid.innerHTML = card('certifications', certsCardHTML());
        } else if (page === 'contact') {
            grid.innerHTML = card('contact', contactCardHTML());
        }
        revealCards();
    }
})();
