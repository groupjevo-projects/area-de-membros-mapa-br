// ============================================
// APP — Router SPA (Português-BR)
// ============================================

const App = {
    container: null,

    async init() {
        // Inicializa o controle de acesso por Token, Storage e Drip 7 Dias
        if (typeof CourseData !== 'undefined' && CourseData.initAccess) {
            try {
                await CourseData.initAccess();
            } catch (e) {
                console.warn('initAccess error:', e);
            }
        }

        this.container = document.getElementById('app');
        window.addEventListener('hashchange', () => this.route());
        this.route();
    },

    route() {
        const hash = window.location.hash || '#dashboard';
        const parts = hash.replace('#', '').split('/');
        const page = parts[0];

        switch (page) {
            case 'dashboard':
                this.container.innerHTML = DashboardPage.render();
                DashboardPage.init();
                break;

            case 'course':
                const courseId = parts[1] || 'mapa-do-prazer';
                const lessonId = parseInt(parts[2]) || 1;

                // Verificação de acesso ao curso
                if (typeof CourseData !== 'undefined' && CourseData.isProductUnlocked) {
                    if (!CourseData.isProductUnlocked(courseId)) {
                        alert('Este material não está incluído na sua compra atual. Redirecionando para o painel.');
                        window.location.hash = '#dashboard';
                        return;
                    }
                }

                this.container.innerHTML = CoursePage.render(courseId, lessonId);
                CoursePage.init(courseId, lessonId);
                break;

            default:
                window.location.hash = '#dashboard';
                break;
        }

        window.scrollTo(0, 0);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
