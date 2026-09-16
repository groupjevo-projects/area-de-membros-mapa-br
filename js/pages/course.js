// ============================================
// PAGE — Course Player (Português-BR com Ícones SVG)
// ============================================

const CoursePage = {
    render(courseId, lessonId) {
        const course = CourseData.getCourseById(courseId);
        if (!course) {
            return `<div style="padding:2rem;text-align:center;color:var(--text-secondary);">Curso não encontrado.</div>`;
        }

        const lesson = CourseData.getLessonById(courseId, lessonId);
        if (!lesson) {
            return `<div style="padding:2rem;text-align:center;color:var(--text-secondary);">Aula não encontrada.</div>`;
        }

        const progress = CourseData.getProgressPercent(courseId);
        const completed = CourseData.getCompletedCount(courseId);
        const total = course.lessons.length;
        const isCompleted = CourseData.isLessonCompleted(courseId, lessonId);
        const prevLesson = CourseData.getPrevLesson(courseId, lessonId);
        const nextLesson = CourseData.getNextLesson(courseId, lessonId);
        const isEbook = course.contentType === 'ebook' || !!lesson.pdfUrl;
        const isModuleLocked = lesson.moduleId && CourseData.isModuleLocked && CourseData.isModuleLocked(lesson.moduleId);
        const daysRemaining = CourseData.dripState?.daysRemaining || 7;

        // Build lesson list grouped by modules
        let lessonListHTML = '';
        if (course.modules && course.modules.length > 0) {
            course.modules.forEach(mod => {
                const moduleLessons = course.lessons.filter(l => l.moduleId === mod.id);
                const modLocked = CourseData.isModuleLocked && CourseData.isModuleLocked(mod.id);
                if (moduleLessons.length > 0) {
                    lessonListHTML += `
                        <div class="module-group-header">
                            <span class="module-group-title">${mod.title}</span>
                            <span class="module-group-tag ${modLocked ? 'tag-locked' : ''}">${modLocked ? '⏳ Drip 7 Dias' : mod.tag}</span>
                        </div>
                    `;
                    moduleLessons.forEach(l => {
                        const isActive = l.id === lessonId;
                        const isDone = CourseData.isLessonCompleted(courseId, l.id);
                        let classes = 'lesson-item';
                        if (isActive) classes += ' active';
                        if (isDone) classes += ' completed';
                        if (modLocked) classes += ' is-drip-locked';

                        lessonListHTML += `
                            <div class="${classes}" data-lesson-id="${l.id}">
                                <div class="lesson-status">${modLocked ? '🔒' : (isDone ? '✓' : l.number)}</div>
                                <div class="lesson-info">
                                    <div class="lesson-number">${l.moduleName || 'Aula ' + l.number} ${modLocked ? '<span style="color:#fbbf24;font-size:0.7rem;">(Em 7 Dias)</span>' : ''}</div>
                                    <div class="lesson-title">${l.title}</div>
                                </div>
                            </div>
                        `;
                    });
                }
            });
        } else {
            lessonListHTML = course.lessons.map(l => {
                const isActive = l.id === lessonId;
                const isDone = CourseData.isLessonCompleted(courseId, l.id);
                let classes = 'lesson-item';
                if (isActive) classes += ' active';
                if (isDone) classes += ' completed';

                return `
                    <div class="${classes}" data-lesson-id="${l.id}">
                        <div class="lesson-status">${isDone ? '✓' : (isEbook ? 'PDF' : l.number)}</div>
                        <div class="lesson-info">
                            <div class="lesson-number">${isEbook ? 'Material Digital' : 'Aula ' + l.number}</div>
                            <div class="lesson-title">${l.title}</div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Build player or ebook viewer or locked screen
        let playerHTML;
        if (isModuleLocked) {
            playerHTML = `
                <div class="player-locked-drip" style="background: linear-gradient(135deg, rgba(20,20,30,0.95), rgba(10,10,15,0.98)); border: 1px solid rgba(245,158,11,0.3); border-radius: 16px; padding: 3rem 2rem; text-align: center; max-width: 700px; margin: 2rem auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <div style="font-size: 3.5rem; margin-bottom: 1rem; animation: pulse 2s infinite;">🔒</div>
                    <span style="display: inline-block; background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); padding: 0.35rem 0.85rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">
                        Liberado em 7 Dias
                    </span>
                    <h2 style="font-size: 1.4rem; font-weight: 800; color: #ffffff; margin-bottom: 0.75rem;">${lesson.title}</h2>
                    <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6; max-width: 520px; margin: 0 auto 1.5rem;">
                        Este módulo avançado será liberado automaticamente <strong>7 dias após a sua compra</strong> para garantir a melhor assimilação do método na prática.
                    </p>
                    <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem 1.5rem; display: inline-block; margin-bottom: 1.5rem;">
                        <span style="color: #64748b; font-size: 0.8rem; display: block; margin-bottom: 0.25rem;">Status da sua liberação:</span>
                        <span style="color: #fbbf24; font-family: monospace; font-size: 1.1rem; font-weight: 700;">⏳ Faltam aproximadamente ${daysRemaining} dias</span>
                    </div>
                    <div>
                        <a href="#course/mapa-do-prazer/1" style="display: inline-flex; align-items: center; background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; padding: 0.75rem 1.5rem; border-radius: 10px; font-size: 0.85rem; font-weight: 700; text-decoration: none; box-shadow: 0 4px 15px rgba(16,185,129,0.3);">
                            ▶ Acessar Módulo White Liberado
                        </a>
                    </div>
                </div>
            `;
        } else if (isEbook && lesson.pdfUrl) {
            playerHTML = `
                <div class="ebook-viewer-container">
                    <div class="ebook-action-bar">
                        <div class="ebook-badge">📖 Material 100% Liberado</div>
                        <a href="${lesson.pdfUrl}" download="${lesson.downloadName || 'ebook.pdf'}" class="btn-download" target="_blank">
                            📥 Baixar Manual em PDF
                        </a>
                        <a href="${lesson.pdfUrl}" target="_blank" class="btn-open-newtab">
                            ↗️ Abrir em Nova Aba
                        </a>
                    </div>
                    <div class="ebook-iframe-wrapper">
                        <iframe src="${lesson.pdfUrl}#toolbar=1" type="text/html" title="${lesson.title}">
                            <p>Seu navegador não suporta iframe. <a href="${lesson.pdfUrl}" target="_blank">Clique aqui para abrir</a>.</p>
                        </iframe>
                    </div>
                </div>
            `;
        } else {
            const hasVturbEmbed = lesson.vturbEmbed && lesson.vturbEmbed.trim() !== '';
            if (hasVturbEmbed) {
                const htmlOnly = lesson.vturbEmbed.replace(/<script-vturb[^>]*>.*?<\/script-vturb>/gi, '');
                playerHTML = `<div class="vturb-embed">${htmlOnly}</div>`;
            } else {
                playerHTML = `
                    <div class="player-placeholder">
                        <div class="player-placeholder-icon">🎬</div>
                        <p>${lesson.title}</p>
                        <p style="font-size: 0.75rem; opacity: 0.5;">Vídeo em breve</p>
                    </div>
                `;
            }
        }

        // Build other courses section
        const otherCourses = CourseData.getOtherCourses(courseId);
        const otherCoursesHTML = otherCourses.map(c => {
            const p = CourseData.getProgressPercent(c.id);
            return `
                <div class="other-course-card" data-other-course-id="${c.id}">
                    <div class="other-course-info">
                        <span class="other-course-tag tag-${c.type}">${c.tag}</span>
                        <div class="other-course-title">${c.title}</div>
                        <div class="other-course-meta">${c.contentType === 'ebook' ? 'E-book PDF para Download' : c.lessons.length + ' aulas em vídeo'}</div>
                    </div>
                    <div class="other-course-progress-ring">
                        <span>${p}%</span>
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
                            <button class="btn-back-header" id="btn-back">← Voltar ao Painel</button>
                        </div>
                    </div>
                </header>

                <!-- Course Layout -->
                <div class="course-page">
                    <!-- Sidebar (desktop only) -->
                    <aside class="course-sidebar" id="course-sidebar">
                        <div class="sidebar-header">
                            <h3 class="sidebar-course-title">${course.title}</h3>
                            <div class="sidebar-progress">
                                <div class="progress-container">
                                    <div class="progress-header">
                                        <span class="progress-label">${completed} de ${total} ${isEbook ? 'lido' : 'aulas'}</span>
                                        <span class="progress-value">${progress}%</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${progress}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="lesson-list">
                            ${lessonListHTML}
                        </div>
                    </aside>

                    <!-- Main Content -->
                    <main class="course-main">
                        <!-- Player or Ebook Container -->
                        <div class="player-container ${isEbook ? 'ebook-mode' : ''}">
                            <div class="player-wrapper ${isEbook ? 'is-ebook' : ''}" id="player-wrapper">
                                ${playerHTML}
                            </div>
                        </div>

                        <!-- Lesson Info + Actions -->
                        <div class="lesson-info-bar">
                            <div>
                                <h2>${lesson.title}</h2>
                                <div class="lesson-info-bar-tag">${lesson.moduleName ? lesson.moduleName + ' · ' : ''}${isEbook ? 'Material digital' : 'Aula ' + lesson.number + ' de ' + total} · ${course.title}</div>
                            </div>
                            <div class="lesson-actions">
                                <button class="btn-complete ${isCompleted ? 'is-completed' : ''}" id="btn-complete">
                                    ${isCompleted ? '✓ Concluído' : 'Marcar como concluída'}
                                </button>
                            </div>
                        </div>

                        <!-- Navigation -->
                        ${total > 1 ? `
                        <div class="lesson-nav">
                            <button class="btn-nav" id="btn-prev" ${!prevLesson ? 'disabled' : ''}>
                                ← Anterior
                            </button>
                            <button class="btn-nav btn-nav-next" id="btn-next" ${!nextLesson ? 'disabled' : ''}>
                                Próxima →
                            </button>
                        </div>
                        ` : ''}

                        <!-- Mobile: Lesson List (visible below player) -->
                        ${total > 1 ? `
                        <div class="mobile-lesson-list">
                            <div class="mobile-lesson-list-header">
                                <h3>Módulos e Aulas</h3>
                                <span class="mobile-lesson-list-count">${completed}/${total}</span>
                            </div>
                            <div class="lesson-list">
                                ${lessonListHTML}
                            </div>
                        </div>
                        ` : ''}

                        <!-- Other Courses -->
                        ${otherCourses.length > 0 ? `
                        <div class="other-courses-section">
                            <h3 class="other-courses-title">Materiais e Cursos Liberados</h3>
                            <div class="other-courses-list">
                                ${otherCoursesHTML}
                            </div>
                        </div>
                        ` : ''}
                    </main>
                </div>
            </div>
        `;
    },

    init(courseId, lessonId) {
        // Inject Vturb scripts if video
        const lesson = CourseData.getLessonById(courseId, lessonId);
        if (lesson && lesson.vturbEmbed && lesson.vturbEmbed.trim() !== '') {
            const scriptRegex = /<script-vturb[^>]+src="([^"]+)"[^>]*>.*?<\/script-vturb>/gi;
            let match;
            while ((match = scriptRegex.exec(lesson.vturbEmbed)) !== null) {
                const scriptEl = document.createElement('script');
                scriptEl.src = match[1];
                scriptEl.async = true;
                document.head.appendChild(scriptEl);
            }
        }

        // Back button
        const btnBack = document.getElementById('btn-back');
        if (btnBack) {
            btnBack.addEventListener('click', () => {
                window.location.hash = '#dashboard';
            });
        }

        // All lesson list clicks (sidebar + mobile)
        document.querySelectorAll('.lesson-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.lessonId);
                window.location.hash = `#course/${courseId}/${id}`;
            });
        });

        // Mark complete
        const btnComplete = document.getElementById('btn-complete');
        if (btnComplete) {
            btnComplete.addEventListener('click', () => {
                const nowComplete = CourseData.toggleLessonComplete(courseId, lessonId);
                btnComplete.className = `btn-complete ${nowComplete ? 'is-completed' : ''}`;
                btnComplete.innerHTML = nowComplete ? '✓ Concluído' : 'Marcar como concluída';

                // Update all lesson-items with this ID (sidebar + mobile list)
                document.querySelectorAll(`.lesson-item[data-lesson-id="${lessonId}"]`).forEach(sidebarItem => {
                    if (nowComplete) {
                        sidebarItem.classList.add('completed');
                        sidebarItem.querySelector('.lesson-status').textContent = '✓';
                    } else {
                        sidebarItem.classList.remove('completed');
                        const l = CourseData.getLessonById(courseId, lessonId);
                        const isEb = CourseData.getCourseById(courseId)?.contentType === 'ebook';
                        sidebarItem.querySelector('.lesson-status').textContent = isEb ? 'PDF' : l.number;
                    }
                });

                // Update progress bars
                const progress = CourseData.getProgressPercent(courseId);
                const completed = CourseData.getCompletedCount(courseId);
                const total = CourseData.getCourseById(courseId).lessons.length;
                document.querySelectorAll('.progress-fill').forEach(el => {
                    el.style.width = `${progress}%`;
                });
                document.querySelectorAll('.progress-value').forEach(el => {
                    el.textContent = `${progress}%`;
                });
                document.querySelectorAll('.progress-label').forEach(el => {
                    el.textContent = `${completed} de ${total} concluídas`;
                });
                const mobileCount = document.querySelector('.mobile-lesson-list-count');
                if (mobileCount) mobileCount.textContent = `${completed}/${total}`;
            });
        }

        // Navigation
        const prevLesson = CourseData.getPrevLesson(courseId, lessonId);
        const nextLesson = CourseData.getNextLesson(courseId, lessonId);

        const btnPrev = document.getElementById('btn-prev');
        if (btnPrev && prevLesson) {
            btnPrev.addEventListener('click', () => {
                window.location.hash = `#course/${courseId}/${prevLesson.id}`;
            });
        }

        const btnNext = document.getElementById('btn-next');
        if (btnNext && nextLesson) {
            btnNext.addEventListener('click', () => {
                window.location.hash = `#course/${courseId}/${nextLesson.id}`;
            });
        }

        // Other courses clicks
        document.querySelectorAll('.other-course-card').forEach(card => {
            card.addEventListener('click', () => {
                const otherCourseId = card.dataset.otherCourseId;
                const otherCourse = CourseData.getCourseById(otherCourseId);
                if (!otherCourse) return;
                const firstIncomplete = otherCourse.lessons.find(l => !CourseData.isLessonCompleted(otherCourseId, l.id));
                const target = firstIncomplete || otherCourse.lessons[0];
                window.location.hash = `#course/${otherCourseId}/${target.id}`;
            });
        });

        // Scroll active lesson into view on mobile
        setTimeout(() => {
            const activeItem = document.querySelector('.mobile-lesson-list .lesson-item.active');
            if (activeItem) {
                activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    }
};
