// ============================================
// DATA — Cursos, Módulos e Controle de Acesso (Português-BR)
// ============================================

function vturbEmbed(videoId, padding) {
    padding = padding || '56.016597510373444%';
    return '<vturb-smartplayer id="vid-' + videoId + '" style="display: block; margin: 0 auto; width: 100%; "><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: ' + padding + ' 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer><script-vturb src="https://scripts.converteai.net/078ca594-053b-427b-a22f-58f182182f25/players/' + videoId + '/v4/player.js"></script-vturb>';
}

const CourseData = {
    // Links de checkout caso a aluna clique em algum produto bloqueado
    checkoutLinks: {
        'mapa-do-prazer': 'https://pay.kiwify.com.br/',
        'protocolo-reconexao-casal': 'https://pay.kiwify.com.br/'
    },

    courses: [
        {
            id: 'mapa-do-prazer',
            title: 'Mapa do Prazer Masculino',
            description: 'O método prático completo com técnicas passo a passo (Módulo Teórico White + Módulo Prático Black).',
            tag: 'Método Principal',
            type: 'main',
            contentType: 'video',
            emoji: '🔥',
            modules: [
                {
                    id: 'mod-white',
                    title: '🤍 Módulo White — Fundamentos & Teoria',
                    tag: 'Módulo White'
                },
                {
                    id: 'mod-black',
                    title: '🖤 Módulo Black — Técnicas Práticas Explícitas',
                    tag: 'Módulo Black'
                }
            ],
            lessons: [
                // ==========================================
                // MÓDULO WHITE — TEORIA & FUNDAMENTOS (12 AULAS)
                // ==========================================
                { 
                    id: 1, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '01', 
                    title: 'Aula 01 — Tradicional', 
                    vturbEmbed: vturbEmbed('69c672b03a29b825b3ae10f2') 
                },
                { 
                    id: 2, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '02', 
                    title: 'Aula 02 — Bombinha', 
                    vturbEmbed: vturbEmbed('69c672a5a78f10ae44d2563b') 
                },
                { 
                    id: 3, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '03', 
                    title: 'Aula 03 — Tradicional Giratória', 
                    vturbEmbed: vturbEmbed('69c672cec602028f65baaecb') 
                },
                { 
                    id: 4, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '04', 
                    title: 'Aula 04 — Anel', 
                    vturbEmbed: vturbEmbed('69c672b794d36cec1173be10') 
                },
                { 
                    id: 5, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '05', 
                    title: 'Aula 05 — Mão Dupla', 
                    vturbEmbed: vturbEmbed('69c672696983e3eba6d455a7') 
                },
                { 
                    id: 6, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '06', 
                    title: 'Aula 06 — Carnívora', 
                    vturbEmbed: vturbEmbed('69c672716983e3eba6d455c2') 
                },
                { 
                    id: 7, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '07', 
                    title: 'Aula 07 — Invertida', 
                    vturbEmbed: vturbEmbed('69c672795610b6167ac08b13') 
                },
                { 
                    id: 8, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '08', 
                    title: 'Aula 08 — Invertida com Sucção', 
                    vturbEmbed: vturbEmbed('69c6729cc602028f65baae44') 
                },
                { 
                    id: 9, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '09', 
                    title: 'Aula 09 — Chuveirinho', 
                    vturbEmbed: vturbEmbed('69c672945493e88bf0fef577') 
                },
                { 
                    id: 10, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '10', 
                    title: 'Aula 10 — Chuveirinho com Rotação', 
                    vturbEmbed: vturbEmbed('69c6728dc602028f65baadf6') 
                },
                { 
                    id: 11, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '11', 
                    title: 'Aula 11 — Ordenha', 
                    vturbEmbed: vturbEmbed('69c6728794d36cec1173bda8') 
                },
                { 
                    id: 12, 
                    moduleId: 'mod-white', 
                    moduleName: '🤍 Módulo White', 
                    number: '12', 
                    title: 'Aula 12 — Conchinha', 
                    vturbEmbed: vturbEmbed('69c6727f96fd2c2d9b24f45b') 
                },

                // ==========================================
                // MÓDULO BLACK — AULAS EXPLÍCITAS (13 AULAS)
                // ==========================================
                { 
                    id: 13, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.01', 
                    title: 'Aula 01 — Tradicional (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c670d33a29b825b3ae0bbd', '56.074766355140184%') 
                },
                { 
                    id: 14, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.02', 
                    title: 'Aula 02 — Invertida (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c670cf6d9878c16e72f4ee', '56.074766355140184%') 
                },
                { 
                    id: 15, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.03', 
                    title: 'Aula 03 — Invertida com Sucção (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c670b3c602028f65baaa10', '56.074766355140184%') 
                },
                { 
                    id: 16, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.04', 
                    title: 'Aula 04 — EGG (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c670aa5493e88bf0fef0f4', '56.074766355140184%') 
                },
                { 
                    id: 17, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.05', 
                    title: 'Aula 05 — Conchinha (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c670b95610b6167ac086a0', '56.074766355140184%') 
                },
                { 
                    id: 18, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.06', 
                    title: 'Aula 06 — Chuveirinho (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c670ca6d9878c16e72f4dc', '56.074766355140184%') 
                },
                { 
                    id: 19, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.07', 
                    title: 'Aula 07 — Chuveirinho com Rotação (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c670c06983e3eba6d45173', '56.074766355140184%') 
                },
                { 
                    id: 20, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.08', 
                    title: 'Aula 08 — Carnívora (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c670c6a78f10ae44d2514a', '56.074766355140184%') 
                },
                { 
                    id: 21, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.09', 
                    title: 'Aula 09 — Bombinha (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c670bd6d9878c16e72f4bd', '56.074766355140184%') 
                },
                { 
                    id: 22, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.10', 
                    title: 'Aula 10 — Anel Vibrador (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c66f5a94d36cec1173b5e2', '56.074766355140184%') 
                },
                { 
                    id: 23, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.11', 
                    title: 'Aula 11 — Anel (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c66f5296fd2c2d9b24ece7', '56.074766355140184%') 
                },
                { 
                    id: 24, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.12', 
                    title: 'Aula 12 — Ordenha (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c66f553a29b825b3ae08ab', '56.25%') 
                },
                { 
                    id: 25, 
                    moduleId: 'mod-black', 
                    moduleName: '🖤 Módulo Black', 
                    number: 'B.13', 
                    title: 'Aula 13 — Mão Dupla (Prática Explícita)', 
                    vturbEmbed: vturbEmbed('69c66f4e6983e3eba6d44dde', '56.074766355140184%') 
                }
            ]
        },
        {
            id: 'protocolo-reconexao-casal',
            title: 'Protocolo Reconexão em Casal: O Plano Guiado de 14 Dias',
            description: 'Plano prático e interativo de 14 dias para resgatar a cumplicidade, quebrar a rotina e reacender a intimidade no relacionamento.',
            tag: 'Plano Guiado 14 Dias',
            type: 'order-bump',
            contentType: 'ebook',
            image: 'assets/protocolo-reconexao-logo.jpg',
            pdfFile: 'assets/ebooks/protocolo-reconexao-em-casal.html',
            emoji: '🤍',
            lessons: [
                {
                    id: 1,
                    number: '01',
                    title: 'Protocolo Reconexão em Casal — O Plano Guiado de 14 Dias',
                    pdfUrl: 'assets/ebooks/protocolo-reconexao-em-casal.html',
                    downloadName: 'Protocolo-Reconexao-em-Casal-14-Dias.html'
                }
            ]
        },
        {
            id: 'o-boquete-inesquecivel',
            title: 'O Boquete Inesquecível: Manual Aplicado',
            description: 'O método completo com Ritmo, Pressão e Variação. 11 Capítulos, 12 Técnicas exclusivas e 5 Rotinas guiadas.',
            tag: 'Manual Aplicado',
            type: 'order-bump',
            contentType: 'ebook',
            image: 'assets/o-boquete-inesquecivel-logo.png',
            pdfFile: 'assets/ebooks/o-boquete-inesquecivel.html',
            emoji: '💋',
            lessons: [
                {
                    id: 1,
                    number: '01',
                    title: 'O Boquete Inesquecível — Manual Aplicado Completo',
                    pdfUrl: 'assets/ebooks/o-boquete-inesquecivel.html',
                    downloadName: 'O-Boquete-Inesquecivel-Manual.html'
                }
            ]
        }
    ],

    // --- Gestão de Acesso & Drip 7 Dias ---
    dripState: {
        checked: false,
        unlockedBonus: true, // Padrão seguro de fallback legado: 100% liberado para todas as compras passadas
        isLegacy: true,
        remainingSeconds: 0,
        daysRemaining: 0
    },

    isBonusUnlocked() {
        return this.dripState.unlockedBonus !== false;
    },

    isModuleLocked(moduleId) {
        // Módulo Black e Bônus sujeitos a Drip de 7 dias
        const bonusModuleIds = ['mod-black', 'mod-bonus'];
        if (!bonusModuleIds.includes(moduleId)) {
            return false; // Módulo White (Fundamentos) sempre liberado imediatamente!
        }
        return !this.isBonusUnlocked();
    },

    async initAccess() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('access');
        const emailParam = urlParams.get('email');

        let userEmail = emailParam || localStorage.getItem('user_email_br') || '';

        if (token) {
            try {
                const parts = token.split('.');
                const payloadStr = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
                const payload = JSON.parse(payloadStr);

                if (payload && Array.isArray(payload.products)) {
                    this.setUnlockedProducts(payload.products, payload.email);
                    if (payload.email) userEmail = payload.email;
                    console.log('Acesso liberado via token:', payload.email, payload.products);
                }
            } catch (e) {
                console.warn('Não foi possível ler o token de acesso, usando cache salvo.', e);
            }
        }

        if (userEmail) {
            localStorage.setItem('user_email_br', userEmail);
            try {
                const supabaseUrl = 'https://ahtvpfunglhhtfpefsyi.supabase.co';
                const supabaseAnonKey = 'sb_publishable_MuW-XY0uxvizJ3zqtJKy5A_YMdJNrln';
                const res = await fetch(`${supabaseUrl}/rest/v1/rpc/check_member_access`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': supabaseAnonKey,
                        'Authorization': `Bearer ${supabaseAnonKey}`
                    },
                    body: JSON.stringify({
                        p_email: userEmail,
                        p_funnel_id: 'mapa-prazer-masculino-br'
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data && typeof data.unlocked_bonus === 'boolean') {
                        this.dripState = {
                            checked: true,
                            unlockedBonus: data.unlocked_bonus,
                            isLegacy: data.is_legacy,
                            remainingSeconds: data.remaining_seconds || 0,
                            daysRemaining: data.days_remaining || 0
                        };
                        console.log('Status Drip Brasil verificado:', this.dripState);
                    }
                }
            } catch (err) {
                console.warn('Supabase Drip Check fallback to unlocked legacy:', err);
            }
        }
    },

    getUnlockedProducts() {
        return this.courses.map(c => c.id);
    },

    setUnlockedProducts(productIds, email) {
        localStorage.setItem('unlocked_products_br', JSON.stringify(productIds));
        if (email) localStorage.setItem('user_email_br', email);
    },

    isProductUnlocked(courseId) {
        // Modo Full Access Público
        return true;
    },

    // --- Helpers ---

    getCourseById(courseId) {
        return this.courses.find(c => c.id === courseId);
    },

    getOtherCourses(courseId) {
        return this.courses.filter(c => c.id !== courseId);
    },

    getLessonById(courseId, lessonId) {
        const course = this.getCourseById(courseId);
        return course ? course.lessons.find(l => l.id === lessonId) : null;
    },

    getNextLesson(courseId, currentId) {
        const course = this.getCourseById(courseId);
        if (!course) return null;
        const idx = course.lessons.findIndex(l => l.id === currentId);
        return idx < course.lessons.length - 1 ? course.lessons[idx + 1] : null;
    },

    getPrevLesson(courseId, currentId) {
        const course = this.getCourseById(courseId);
        if (!course) return null;
        const idx = course.lessons.findIndex(l => l.id === currentId);
        return idx > 0 ? course.lessons[idx - 1] : null;
    },

    // --- Progresso (por curso) ---

    _getProgressKey(courseId) {
        return 'progress_br_' + courseId;
    },

    getProgress(courseId) {
        const saved = localStorage.getItem(this._getProgressKey(courseId));
        return saved ? JSON.parse(saved) : {};
    },

    saveProgress(courseId, progress) {
        localStorage.setItem(this._getProgressKey(courseId), JSON.stringify(progress));
    },

    isLessonCompleted(courseId, lessonId) {
        const progress = this.getProgress(courseId);
        return progress[lessonId] === true;
    },

    toggleLessonComplete(courseId, lessonId) {
        const progress = this.getProgress(courseId);
        progress[lessonId] = !progress[lessonId];
        this.saveProgress(courseId, progress);
        return progress[lessonId];
    },

    getCompletedCount(courseId) {
        const progress = this.getProgress(courseId);
        return Object.values(progress).filter(v => v === true).length;
    },

    getProgressPercent(courseId) {
        const course = this.getCourseById(courseId);
        if (!course) return 0;
        const completed = this.getCompletedCount(courseId);
        return Math.round((completed / course.lessons.length) * 100);
    },

    getTotalProgress() {
        let totalLessons = 0;
        let totalCompleted = 0;
        this.courses.forEach(c => {
            totalLessons += c.lessons.length;
            totalCompleted += this.getCompletedCount(c.id);
        });
        return totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
    }
};
