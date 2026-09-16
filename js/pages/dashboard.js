// ============================================
// ICONS — SVG Icons System (Clean & Modern)
// ============================================

const Icons = {
    lock: `<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    unlock: `<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>`,
    play: `<svg style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:6px;" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
    book: `<svg style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    sparkles: `<svg style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`,
    check: `<svg style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    download: `<svg style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
    external: `<svg style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`
};

// ============================================
// PAGE — Dashboard (Multi-Produto & Dynamic Access Control - BR)
// ============================================

const DashboardPage = {
    render() {
        const courses = CourseData.courses;

        // Montar cards de cursos
        const courseCardsHTML = courses.map((course, idx) => {
            const progress = CourseData.getProgressPercent(course.id);
            const completed = CourseData.getCompletedCount(course.id);
            const total = course.lessons.length;
            const isMain = course.type === 'main';
            const isEbook = course.contentType === 'ebook';
            const isUnlocked = CourseData.isProductUnlocked(course.id);

            let bgGradient = 'linear-gradient(135deg, #1a0a0a, #3d0c0c)';
            if (isEbook) {
                bgGradient = 'linear-gradient(135deg, #2d1810, #4a2820, #2d1810)';
            }
            if (!isUnlocked) {
                bgGradient = 'linear-gradient(135deg, #121217, #1c1c24)';
            }

            const thumbnailImg = course.image ? `<img src="${course.image}" alt="${course.title}" class="course-card-compact-logo">` : (isMain ? '<img src="assets/logo.jpg" alt="' + course.title + '" class="course-card-compact-logo">' : '');

            return `
                <div class="course-card-compact ${isMain ? 'course-card-main' : ''} ${!isUnlocked ? 'is-locked' : ''}" 
                     data-course-id="${course.id}" 
                     data-unlocked="${isUnlocked ? 'true' : 'false'}"
                     style="animation-delay: ${idx * 60}ms;">
                    <div class="course-card-compact-thumb">
                        <div class="course-card-compact-thumb-bg" style="background: ${bgGradient};">
                        </div>
                        ${thumbnailImg}
                        <div class="course-card-compact-overlay">
                            ${!isUnlocked ? `${Icons.lock} Bloqueado` : isEbook ? `${Icons.book} Acessar E-book` : `${Icons.play} Acessar o Método`}
                        </div>
                    </div>
                    <div class="course-card-compact-body">
                        <div class="course-card-header-row">
                            <span class="course-card-compact-tag tag-${course.type}">${course.tag}</span>
                            ${isUnlocked 
                                ? `<span class="badge-unlocked">${Icons.unlock} Acesso Liberado</span>` 
                                : `<span class="badge-locked">${Icons.lock} Não Adquirido</span>`
                            }
                        </div>
                        <h3 class="course-card-compact-title">${course.title}</h3>
                        <p class="course-card-compact-desc">${course.description}</p>
                        <div class="course-card-compact-footer">
                            <span class="course-card-compact-meta">
                                ${isUnlocked 
                                    ? (isEbook ? 'E-Book Digital (PDF)' : total + ' aulas · ' + completed + ' concluídas')
                                    : 'Clique para desbloquear este conteúdo'
                                }
                            </span>
                            ${isUnlocked ? `
                            <div class="progress-container progress-sm">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${progress}%"></div>
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="dashboard">
                <!-- Header -->
                <header class="app-header">
                    <div class="header-inner">
                        <a href="#dashboard" class="header-brand">
                            <img src="assets/logo.jpg" alt="Mapa do Prazer Masculino" style="height: 40px; border-radius: 6px;">
                        </a>
                        <div class="header-user">
                            <div class="header-user-name" style="font-size: 0.75rem; opacity: 0.85; color: var(--accent-success);">
                                ${Icons.sparkles} Acesso Exclusivo
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Content -->
                <div class="dashboard-content">
                    <div class="dashboard-welcome-compact">
                        <h2>Boas-vindas à sua Área de Membros</h2>
                        <p>Acesse abaixo as suas aulas e materiais liberados.</p>
                    </div>

                    <div class="course-grid-multi stagger-children">
                        ${courseCardsHTML}
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // Course card clicks
        document.querySelectorAll('.course-card-compact').forEach(card => {
            card.addEventListener('click', () => {
                const courseId = card.dataset.courseId;
                const isUnlocked = card.dataset.unlocked === 'true';
                const course = CourseData.getCourseById(courseId);
                if (!course) return;

                if (!isUnlocked) {
                    const checkoutUrl = CourseData.checkoutLinks[courseId] || 'https://pay.kiwify.com.br/';
                    const buy = confirm(`Este material (${course.title}) ainda não está liberado na sua conta.\n\nDeseja adicioná-lo ao seu pedido agora?`);
                    if (buy) {
                        window.open(checkoutUrl, '_blank');
                    }
                    return;
                }

                // Ir para a primeira aula não concluída
                const firstIncomplete = course.lessons.find(l => !CourseData.isLessonCompleted(courseId, l.id));
                const targetLesson = firstIncomplete || course.lessons[0];
                window.location.hash = `#course/${courseId}/${targetLesson.id}`;
            });
        });
    }
};
