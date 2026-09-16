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

        // Build lesson list grouped by modules
        let lessonListHTML = '';
        if (course.modules && course.modules.length > 0) {
            course.modules.forEach(mod => {
                const moduleLessons = course.lessons.filter(l => l.moduleId === mod.id);
                if (moduleLessons.length > 0) {
                    lessonListHTML += `
                        <div class="module-group-header">
                            <span class="module-group-title">${mod.title}</span>
                            <span class="module-group-tag">${mod.tag}</span>
                        </div>
                    `;
                    moduleLessons.forEach(l => {
                        const isActive = l.id === lessonId;
                        const isDone = CourseData.isLessonCompleted(courseId, l.id);
                        let classes = 'lesson-item';
                        if (isActive) classes += ' active';
                        if (isDone) classes += ' completed';

                        lessonListHTML += `
                            <div class="${classes}" data-lesson-id="${l.id}">
                                <div class="lesson-status">${isDone ? '✓' : l.number}</div>
                                <div class="lesson-info">
                                    <div class="lesson-number">${l.moduleName || 'Aula ' + l.number}</div>
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

        // Build player or ebook viewer
        let playerHTML;
        if (isEbook && lesson.pdfUrl) {
            playerHTML = `
                <div class="ebook-viewer-container">
                    <div class="ebook-action-bar">
                        <div class="ebook-badge">Material Digital Liberado</div>
                        <a href="${lesson.pdfUrl}" download="${lesson.downloadName || 'ebook.pdf'}" class="btn-download" target="_blank">
                            <svg style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Baixar PDF Completo
                        </a>
                        <a href="${lesson.pdfUrl}" target="_blank" class="btn-open-newtab">
                            <svg style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            Abrir em tela cheia
                        </a>
                    </div>
                    <div class="ebook-iframe-wrapper">
                        <iframe src="${lesson.pdfUrl}#toolbar=1" type="application/pdf" title="${lesson.title}">
                            <p>Seu navegador não suporta visualização direta de PDFs. 
                               <a href="${lesson.pdfUrl}" download>Clique aqui para baixar o arquivo</a>.
                            </p>
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
