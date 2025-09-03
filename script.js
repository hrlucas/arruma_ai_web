// ArrumaAí - JavaScript Profissional e Funcional

// Dados simulados da aplicação
const appData = {
    providers: [
        {
            id: 1,
            name: 'João Silva',
            service: 'Eletricista',
            region: 'Centro',
            rating: 4.9,
            price: 120,
            verified: true,
            badge: false,
            completedServices: 45,
            responseTime: '2h'
        },
        {
            id: 2,
            name: 'Maria Pereira',
            service: 'Pintora',
            region: 'Zona Sul',
            rating: 4.7,
            price: 180,
            verified: true,
            badge: false,
            completedServices: 32,
            responseTime: '3h'
        },
        {
            id: 3,
            name: 'Equipe Azul',
            service: 'Faz-tudo',
            region: 'Bairro Alto',
            rating: 5.0,
            price: 200,
            verified: true,
            badge: true,
            completedServices: 78,
            responseTime: '1h'
        },
        {
            id: 4,
            name: 'Carlos Santos',
            service: 'Encanador',
            region: 'Zona Norte',
            rating: 4.8,
            price: 150,
            verified: true,
            badge: false,
            completedServices: 56,
            responseTime: '4h'
        }
    ],
    auctions: [
        {
            id: 1,
            title: 'Pintura quarto 12m²',
            desc: 'Tinta lavável, cor neutra',
            region: 'Centro',
            budget: 250,
            proposals: [],
            status: 'open',
            endsAt: Date.now() + 60000,
            client: 'Ana Silva',
            category: 'Pintura'
        },
        {
            id: 2,
            title: 'Instalação tomadas elétricas',
            desc: '3 tomadas 20A, residencial',
            region: 'Zona Sul',
            budget: 180,
            proposals: [],
            status: 'open',
            endsAt: Date.now() + 120000,
            client: 'Pedro Costa',
            category: 'Elétrica'
        }
    ],
    calls: [
        {
            id: 1,
            title: 'Troca de tomada',
            desc: 'Tomada 3 pinos, residencial',
            region: 'Centro',
            price: 80,
            client: 'Ana Silva',
            status: 'pending',
            category: 'Elétrica',
            urgency: 'normal'
        },
        {
            id: 2,
            title: 'Vazamento na pia',
            desc: 'Vazamento na conexão da pia da cozinha',
            region: 'Zona Sul',
            price: 120,
            client: 'Maria Oliveira',
            status: 'pending',
            category: 'Encanamento',
            urgency: 'urgent'
        }
    ],
    transactions: [],
    pendingDocs: []
};

// Estado da aplicação
let currentUser = null;
let currentScreen = 'home';

// Elementos DOM
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadMockData();
    setupFloatingLogo();
});

function initializeApp() {
    // Animações de entrada
    addScrollAnimations();
    
    // Mockup interativo
    setupMockupAnimation();
    
    // Atualiza o título principal
    updateMainTitle();
}

function updateMainTitle() {
    const titulo = document.getElementById('tituloPrincipal');
    if (titulo) {
        titulo.textContent = 'ArrumaAí - Bem-vindo!';
        titulo.style.color = '#2563eb'; // Azul mais chamativo
        titulo.style.transition = 'color 0.3s ease';
    }
}

function setupEventListeners() {
    // Botões do header
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => showLoginModal());
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', () => showRegisterModal());
    }
    
    // Tabs do demo
    document.querySelectorAll('.demo-tab').forEach(tab => {
        tab.addEventListener('click', () => switchDemoTab(tab.dataset.tab));
    });
    
    // Fechar modal
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.service-item, .feature-item, .step-item');
    elements.forEach(el => {
        observer.observe(el);
    });
}

function setupMockupAnimation() {
    const mockup = document.querySelector('.app-mockup');
    if (!mockup) return;
    
    // Animação de entrada
    mockup.style.opacity = '0';
    mockup.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        mockup.style.transition = 'all 0.8s ease-out';
        mockup.style.opacity = '1';
        mockup.style.transform = 'translateY(0)';
    }, 500);
}

// Funções de navegação
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToHowItWorks() {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
        howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Sistema de modais
function showModal(title, content) {
    if (!modalTitle || !modalContent || !modalOverlay) {
        console.warn('Elementos do modal não encontrados');
        return;
    }
    
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modalOverlay) {
        console.warn('Modal overlay não encontrado');
        return;
    }
    
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Modais específicos
function showLoginModal() {
    const content = `
        <form id="login-form" class="auth-form">
            <div class="form-group">
                <label for="login-email">Email</label>
                <input type="email" id="login-email" required placeholder="seu@email.com">
            </div>
            <div class="form-group">
                <label for="login-password">Senha</label>
                <input type="password" id="login-password" required placeholder="••••••••">
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-primary">Entrar</button>
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
            </div>
        </form>
    `;
    
    showModal('Entrar no ArrumaAí', content);
    
    // Adicionar event listener com verificação
    setTimeout(() => {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
    }, 100);
}

function showRegisterModal() {
    const content = `
        <form id="register-form" class="auth-form">
            <div class="form-group">
                <label for="register-name">Nome completo</label>
                <input type="text" id="register-name" required placeholder="Seu nome completo">
            </div>
            <div class="form-group">
                <label for="register-email">Email</label>
                <input type="email" id="register-email" required placeholder="seu@email.com">
            </div>
            <div class="form-group">
                <label for="register-phone">Telefone</label>
                <input type="tel" id="register-phone" required placeholder="(11) 99999-9999">
            </div>
            <div class="form-group">
                <label for="register-role">Tipo de conta</label>
                <select id="register-role" required>
                    <option value="">Selecione...</option>
                    <option value="client">Cliente</option>
                    <option value="provider">Prestador de Serviços</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-primary">Criar conta</button>
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
            </div>
        </form>
    `;
    
    showModal('Criar conta no ArrumaAí', content);
    
    // Adicionar event listener com verificação
    setTimeout(() => {
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', handleRegister);
        }
    }, 100);
}

// Handlers de autenticação
function handleLogin(e) {
    e.preventDefault();
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    
    if (!emailInput || !passwordInput) {
        console.warn('Campos de login não encontrados');
        return;
    }
    
    const email = emailInput.value;
    const password = passwordInput.value;
    
    // Simulação de login
    currentUser = {
        id: 1,
        name: 'Usuário Demo',
        email: email,
        role: 'client',
        loggedIn: true
    };
    
    closeModal();
    showToast('Login realizado com sucesso!', 'success');
    updateHeaderForUser();
}

function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    
    // Verificar se os campos necessários existem
    const nameInput = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email');
    const phoneInput = document.getElementById('register-phone');
    const roleInput = document.getElementById('register-role');
    
    if (!nameInput || !emailInput || !phoneInput || !roleInput) {
        console.warn('Campos de registro não encontrados');
        return;
    }
    
    // Simulação de registro
    currentUser = {
        id: Date.now(),
        name: userData.registerName || nameInput.value,
        email: userData.registerEmail || emailInput.value,
        phone: userData.registerPhone || phoneInput.value,
        role: userData.registerRole || roleInput.value,
        loggedIn: true
    };
    
    closeModal();
    showToast('Conta criada com sucesso!', 'success');
    updateHeaderForUser();
}

function updateHeaderForUser() {
    const headerActions = document.querySelector('.header-actions');
    if (!headerActions) {
        console.warn('Header actions não encontrado');
        return;
    }
    
    if (currentUser) {
        headerActions.innerHTML = `
            <span class="user-welcome">Olá, ${currentUser.name}</span>
            <button class="btn-secondary" onclick="logout()">Sair</button>
        `;
    } else {
        headerActions.innerHTML = `
            <button id="login-btn" class="btn-primary">Entrar</button>
            <button id="register-btn" class="btn-secondary">Cadastrar</button>
        `;
        
        // Reconfigurar event listeners após atualizar o HTML
        setTimeout(() => {
            const newLoginBtn = document.getElementById('login-btn');
            const newRegisterBtn = document.getElementById('register-btn');
            
            if (newLoginBtn) {
                newLoginBtn.addEventListener('click', () => showLoginModal());
            }
            
            if (newRegisterBtn) {
                newRegisterBtn.addEventListener('click', () => showRegisterModal());
            }
        }, 100);
    }
}

function logout() {
    currentUser = null;
    updateHeaderForUser();
    showToast('Logout realizado com sucesso!', 'info');
}

// Sistema de tabs do demo
function switchDemoTab(tabName) {
    // Atualizar tabs
    document.querySelectorAll('.demo-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Atualizar conteúdo
    document.querySelectorAll('.demo-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const activeScreen = document.getElementById(`${tabName}-demo`);
    if (activeScreen) {
        activeScreen.classList.add('active');
    }
}

// Modais de demonstração
function showDemoModal(type) {
    switch(type) {
        case 'service-request':
            showServiceRequestModal();
            break;
        case 'auction':
            showAuctionModal();
            break;
        case 'chat':
            showChatModal();
            break;
        case 'provider-dashboard':
            showProviderDashboardModal();
            break;
        case 'service-calls':
            showServiceCallsModal();
            break;
        case 'provider-financial':
            showProviderFinancialModal();
            break;
        case 'admin-dashboard':
            showAdminDashboardModal();
            break;
        case 'provider-verification':
            showProviderVerificationModal();
            break;
        case 'transactions':
            showTransactionsModal();
            break;
    }
}

function showServiceRequestModal() {
    const content = `
        <div class="demo-content">
            <h4>Solicitar Serviço</h4>
            <form class="service-form">
                <div class="form-group">
                    <label>Tipo de serviço</label>
                    <select required>
                        <option value="">Selecione...</option>
                        <option value="pintura">Pintura</option>
                        <option value="eletrica">Elétrica</option>
                        <option value="encanamento">Encanamento</option>
                        <option value="limpeza">Limpeza</option>
                        <option value="faz-tudo">Faz-tudo</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Descrição</label>
                    <textarea placeholder="Descreva o serviço necessário..." rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label>Orçamento (R$)</label>
                    <input type="number" placeholder="0,00" min="0">
                </div>
                <div class="form-group">
                    <label>Urgência</label>
                    <select>
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgente</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Enviar Solicitação</button>
                </div>
            </form>
        </div>
    `;
    
    showModal('Solicitar Serviço', content);
}

function showAuctionModal() {
    const content = `
        <div class="demo-content">
            <h4>Criar Leilão</h4>
            <div class="auction-info">
                <p><strong>Como funciona:</strong></p>
                <ul>
                    <li>Defina o serviço e orçamento</li>
                    <li>Prestadores fazem propostas</li>
                    <li>Você escolhe a melhor oferta</li>
                    <li>Pagamento seguro via escrow</li>
                </ul>
            </div>
            <form class="auction-form">
                <div class="form-group">
                    <label>Título do leilão</label>
                    <input type="text" placeholder="Ex: Pintura sala 20m²" required>
                </div>
                <div class="form-group">
                    <label>Orçamento máximo (R$)</label>
                    <input type="number" placeholder="500,00" min="0" required>
                </div>
                <div class="form-group">
                    <label>Prazo do leilão</label>
                    <select>
                        <option value="24h">24 horas</option>
                        <option value="48h">48 horas</option>
                        <option value="72h">72 horas</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Criar Leilão</button>
                </div>
            </form>
        </div>
    `;
    
    showModal('Criar Leilão', content);
}

function showChatModal() {
    const content = `
        <div class="demo-content">
            <h4>Chat com Prestador</h4>
            <div class="chat-container">
                <div class="chat-messages">
                    <div class="message received">
                        <div class="message-content">
                            <strong>João Silva:</strong> Olá! Posso ajudar com o serviço de elétrica?
                        </div>
                        <div class="message-time">14:30</div>
                    </div>
                    <div class="message sent">
                        <div class="message-content">
                            Sim, preciso trocar algumas tomadas
                        </div>
                        <div class="message-time">14:32</div>
                    </div>
                    <div class="message received">
                        <div class="message-content">
                            Perfeito! Posso ir hoje às 16h. R$ 80 está bom?
                        </div>
                        <div class="message-time">14:33</div>
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Digite sua mensagem...">
                    <button class="btn-primary">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    showModal('Chat com Prestador', content);
}

function showProviderDashboardModal() {
    const content = `
        <div class="demo-content">
            <h4>Dashboard do Prestador</h4>
            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-number">12</div>
                    <div class="stat-label">Serviços Ativos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">R$ 2.450</div>
                    <div class="stat-label">Ganhos do Mês</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">4.9★</div>
                    <div class="stat-label">Avaliação Média</div>
                </div>
            </div>
            <div class="recent-activity">
                <h5>Atividade Recente</h5>
                <div class="activity-item">
                    <i class="fas fa-check-circle"></i>
                    <span>Serviço de pintura concluído - R$ 180</span>
                </div>
                <div class="activity-item">
                    <i class="fas fa-clock"></i>
                    <span>Novo chamado recebido - Elétrica</span>
                </div>
                <div class="activity-item">
                    <i class="fas fa-star"></i>
                    <span>Nova avaliação 5★ recebida</span>
                </div>
            </div>
        </div>
    `;
    
    showModal('Dashboard do Prestador', content);
}

function showServiceCallsModal() {
    const content = `
        <div class="demo-content">
            <h4>Chamados Recebidos</h4>
            <div class="calls-list">
                ${appData.calls.map(call => `
                    <div class="call-item ${call.urgency}">
                        <div class="call-header">
                            <h5>${call.title}</h5>
                            <span class="urgency-badge ${call.urgency}">${call.urgency === 'urgent' ? 'Urgente' : 'Normal'}</span>
                        </div>
                        <p>${call.desc}</p>
                        <div class="call-details">
                            <span><i class="fas fa-map-marker-alt"></i> ${call.region}</span>
                            <span><i class="fas fa-dollar-sign"></i> R$ ${call.price}</span>
                        </div>
                        <div class="call-actions">
                            <button class="btn-primary">Aceitar</button>
                            <button class="btn-secondary">Ver detalhes</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    showModal('Chamados Recebidos', content);
}

function showProviderFinancialModal() {
    const content = `
        <div class="demo-content">
            <h4>Financeiro</h4>
            <div class="financial-summary">
                <div class="financial-card">
                    <h5>Saldo Disponível</h5>
                    <div class="amount">R$ 1.250,00</div>
                </div>
                <div class="financial-card">
                    <h5>Em Processamento</h5>
                    <div class="amount">R$ 450,00</div>
                </div>
            </div>
            <div class="transaction-history">
                <h5>Histórico de Transações</h5>
                <div class="transaction-item">
                    <div class="transaction-info">
                        <strong>Pintura residencial</strong>
                        <span>15/01/2024</span>
                    </div>
                    <div class="transaction-amount positive">+R$ 180,00</div>
                </div>
                <div class="transaction-item">
                    <div class="transaction-info">
                        <strong>Taxa da plataforma</strong>
                        <span>15/01/2024</span>
                    </div>
                    <div class="transaction-amount negative">-R$ 18,00</div>
                </div>
            </div>
        </div>
    `;
    
    showModal('Financeiro', content);
}

function showAdminDashboardModal() {
    const content = `
        <div class="demo-content">
            <h4>Dashboard Administrativo</h4>
            <div class="admin-stats">
                <div class="stat-card">
                    <div class="stat-number">${appData.providers.length}</div>
                    <div class="stat-label">Prestadores</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${appData.providers.filter(p => p.verified).length}</div>
                    <div class="stat-label">Verificados</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${appData.auctions.length}</div>
                    <div class="stat-label">Leilões Ativos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">R$ 15.420</div>
                    <div class="stat-label">Receita Total</div>
                </div>
            </div>
            <div class="admin-actions">
                <button class="btn-primary">Verificar Prestadores</button>
                <button class="btn-secondary">Relatórios</button>
                <button class="btn-secondary">Configurações</button>
            </div>
        </div>
    `;
    
    showModal('Dashboard Administrativo', content);
}

function showProviderVerificationModal() {
    const content = `
        <div class="demo-content">
            <h4>Verificação de Prestadores</h4>
            <div class="verification-list">
                <div class="verification-item">
                    <div class="provider-info">
                        <h5>Carlos Santos</h5>
                        <span>Encanador - Zona Norte</span>
                    </div>
                    <div class="verification-status pending">
                        <span>Aguardando verificação</span>
                    </div>
                    <div class="verification-actions">
                        <button class="btn-primary">Aprovar</button>
                        <button class="btn-secondary">Rejeitar</button>
                    </div>
                </div>
                <div class="verification-item">
                    <div class="provider-info">
                        <h5>Maria Pereira</h5>
                        <span>Pintora - Zona Sul</span>
                    </div>
                    <div class="verification-status approved">
                        <span>Verificado ✓</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showModal('Verificação de Prestadores', content);
}

function showTransactionsModal() {
    const content = `
        <div class="demo-content">
            <h4>Transações</h4>
            <div class="transactions-list">
                <div class="transaction-item">
                    <div class="transaction-info">
                        <strong>Leilão - Pintura</strong>
                        <span>16/01/2024</span>
                    </div>
                    <div class="transaction-amount">R$ 250,00</div>
                    <div class="transaction-status completed">Concluída</div>
                </div>
                <div class="transaction-item">
                    <div class="transaction-info">
                        <strong>Serviço Elétrico</strong>
                        <span>15/01/2024</span>
                    </div>
                    <div class="transaction-amount">R$ 120,00</div>
                    <div class="transaction-status pending">Processando</div>
                </div>
            </div>
        </div>
    `;
    
    showModal('Transações', content);
}

// Sistema de notificações
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Carregamento de dados mock
function loadMockData() {
    // Simular carregamento de dados
    setTimeout(() => {
        console.log('Dados carregados:', appData);
    }, 1000);
}

// Controle da logo flutuante
function setupFloatingLogo() {
    const floatingLogo = document.getElementById('floating-logo');
    if (!floatingLogo) return;
    
    // Mostrar logo após scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            floatingLogo.classList.add('show');
        } else {
            floatingLogo.classList.remove('show');
        }
    });
    
    // Clique na logo flutuante volta ao topo
    floatingLogo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Estilos CSS adicionais para os componentes
const additionalStyles = `
    .auth-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .form-group label {
        font-weight: 600;
        color: var(--text-dark);
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 0.75rem;
        border: 1px solid var(--border-light);
        border-radius: var(--radius-md);
        font-size: 0.875rem;
    }
    
    .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .demo-content h4 {
        margin-bottom: 1rem;
        color: var(--text-dark);
    }
    
    .dashboard-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .stat-card {
        background: var(--bg-light);
        padding: 1rem;
        border-radius: var(--radius-lg);
        text-align: center;
    }
    
    .stat-number {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--primary-blue);
    }
    
    .stat-label {
        font-size: 0.75rem;
        color: var(--text-light);
        margin-top: 0.25rem;
    }
    
    .calls-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .call-item {
        background: var(--bg-light);
        padding: 1rem;
        border-radius: var(--radius-lg);
        border-left: 4px solid var(--primary-blue);
    }
    
    .call-item.urgent {
        border-left-color: #ef4444;
    }
    
    .call-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .urgency-badge {
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .urgency-badge.urgent {
        background: #fef2f2;
        color: #ef4444;
    }
    
    .urgency-badge.normal {
        background: #f0f9ff;
        color: var(--primary-blue);
    }
    
    .call-details {
        display: flex;
        gap: 1rem;
        margin: 0.5rem 0;
        font-size: 0.875rem;
        color: var(--text-light);
    }
    
    .call-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .chat-container {
        display: flex;
        flex-direction: column;
        height: 300px;
    }
    
    .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        background: var(--bg-light);
        border-radius: var(--radius-lg);
        margin-bottom: 1rem;
    }
    
    .message {
        margin-bottom: 1rem;
    }
    
    .message.received {
        text-align: left;
    }
    
    .message.sent {
        text-align: right;
    }
    
    .message-content {
        background: white;
        padding: 0.75rem;
        border-radius: var(--radius-lg);
        display: inline-block;
        max-width: 80%;
    }
    
    .message.sent .message-content {
        background: var(--primary-blue);
        color: white;
    }
    
    .message-time {
        font-size: 0.75rem;
        color: var(--text-light);
        margin-top: 0.25rem;
    }
    
    .chat-input {
        display: flex;
        gap: 0.5rem;
    }
    
    .chat-input input {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid var(--border-light);
        border-radius: var(--radius-lg);
    }
    
    .toast {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        padding: 1rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 3000;
    }
    
    .toast.show {
        transform: translateX(0);
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .toast-success {
        border-left: 4px solid #10b981;
    }
    
    .toast-error {
        border-left: 4px solid #ef4444;
    }
    
    .toast-warning {
        border-left: 4px solid #f59e0b;
    }
    
    .toast-info {
        border-left: 4px solid var(--primary-blue);
    }
    
    .user-welcome {
        color: white;
        font-weight: 600;
    }
    
    .financial-summary {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .financial-card {
        background: var(--bg-light);
        padding: 1rem;
        border-radius: var(--radius-lg);
        text-align: center;
    }
    
    .amount {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--primary-blue);
    }
    
    .transaction-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-light);
    }
    
    .transaction-amount.positive {
        color: #10b981;
        font-weight: 600;
    }
    
    .transaction-amount.negative {
        color: #ef4444;
        font-weight: 600;
    }
    
    .verification-item {
        background: var(--bg-light);
        padding: 1rem;
        border-radius: var(--radius-lg);
        margin-bottom: 1rem;
    }
    
    .verification-status {
        margin: 0.5rem 0;
        font-size: 0.875rem;
    }
    
    .verification-status.pending {
        color: #f59e0b;
    }
    
    .verification-status.approved {
        color: #10b981;
    }
    
    .transaction-status {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
    }
    
    .transaction-status.completed {
        background: #f0fdf4;
        color: #10b981;
    }
    
    .transaction-status.pending {
        background: #fef3c7;
        color: #f59e0b;
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
