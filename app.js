const STORAGE_KEY = 'optima_staff_analytics_v2';

const state = {
  employees: [],
  attendance: [],
  jobHistory: [],
  operations: [],
  credits: [],
  ui: {
    activeSection: 'dashboardSection',
    search: '',
  },
};

const els = {
  pageTitle: document.getElementById('pageTitle'),
  liveDate: document.getElementById('liveDate'),
  navLinks: document.querySelectorAll('.nav-link'),
  pageSections: document.querySelectorAll('.page-section'),
  metricsGrid: document.getElementById('metricsGrid'),
  statusStats: document.getElementById('statusStats'),
  recentLogsTable: document.getElementById('recentLogsTable'),
  departmentPerformance: document.getElementById('departmentPerformance'),
  employeesTable: document.getElementById('employeesTable'),
  attendanceTable: document.getElementById('attendanceTable'),
  dailySummary: document.getElementById('dailySummary'),
  topEmployeesList: document.getElementById('topEmployeesList'),
  topBranchesList: document.getElementById('topBranchesList'),
  monthlyReportOutput: document.getElementById('monthlyReportOutput'),
  globalSearch: document.getElementById('globalSearch'),
  departmentFilter: document.getElementById('departmentFilter'),
  statusFilter: document.getElementById('statusFilter'),
  attendanceDateFilter: document.getElementById('attendanceDateFilter'),
  attendanceEmployeeFilter: document.getElementById('attendanceEmployeeFilter'),
  analyticsStartDate: document.getElementById('analyticsStartDate'),
  analyticsEndDate: document.getElementById('analyticsEndDate'),
  reportMonth: document.getElementById('reportMonth'),
  attendanceEmployee: document.getElementById('attendanceEmployee'),
  attendanceDate: document.getElementById('attendanceDate'),
  attendanceCheckIn: document.getElementById('attendanceCheckIn'),
  attendanceCheckOut: document.getElementById('attendanceCheckOut'),
  attendanceBreak: document.getElementById('attendanceBreak'),
  attendanceStatus: document.getElementById('attendanceStatus'),
  attendanceNote: document.getElementById('attendanceNote'),
  attendanceId: document.getElementById('attendanceId'),
  employeeModal: document.getElementById('employeeModal'),
  attendanceModal: document.getElementById('attendanceModal'),
  employeeModalTitle: document.getElementById('employeeModalTitle'),
  employeeForm: document.getElementById('employeeForm'),
  attendanceForm: document.getElementById('attendanceForm'),
  employeeId: document.getElementById('employeeId'),
  employeeName: document.getElementById('employeeName'),
  employeeRole: document.getElementById('employeeRole'),
  employeeDepartment: document.getElementById('employeeDepartment'),
  employeeBranch: document.getElementById('employeeBranch'),
  employeeShiftStart: document.getElementById('employeeShiftStart'),
  employeeShiftEnd: document.getElementById('employeeShiftEnd'),
  employeeStatus: document.getElementById('employeeStatus'),
  employeeEmail: document.getElementById('employeeEmail'),
  employeeNote: document.getElementById('employeeNote'),
  quickAddEmployeeBtn: document.getElementById('quickAddEmployeeBtn'),
  openAttendanceModalBtn: document.getElementById('openAttendanceModalBtn'),
  applyAnalyticsBtn: document.getElementById('applyAnalyticsBtn'),
  seedDemoBtn: document.getElementById('seedDemoBtn'),
  generateMonthlyReportBtn: document.getElementById('generateMonthlyReportBtn'),
  exportEmployeesBtn: document.getElementById('exportEmployeesBtn'),
  exportAttendanceBtn: document.getElementById('exportAttendanceBtn'),
  backupDataBtn: document.getElementById('backupDataBtn'),
  restoreDataBtn: document.getElementById('restoreDataBtn'),
  restoreFileInput: document.getElementById('restoreFileInput'),
  resetAllDataBtn: document.getElementById('resetAllDataBtn'),
  seedDemoPrimaryBtn: document.getElementById('seedDemoPrimaryBtn'),
  hoursChart: document.getElementById('hoursChart'),
  analyticsChart: document.getElementById('analyticsChart'),
  jobHistoryTable: document.getElementById('jobHistoryTable'),
  operationsTable: document.getElementById('operationsTable'),
  creditKpis: document.getElementById('creditKpis'),
  creditAmountChart: document.getElementById('creditAmountChart'),
  creditOfficerChart: document.getElementById('creditOfficerChart'),
  recentClientTable: document.getElementById('recentClientTable'),
  creditSummaryList: document.getElementById('creditSummaryList'),
};

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    employees: state.employees,
    attendance: state.attendance,
    jobHistory: state.jobHistory,
    operations: state.operations,
    credits: state.credits,
  }));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    seedDemoData();
    return;
  }

  try {
    const parsed = JSON.parse(raw);
   state.employees = parsed.employees || [];
    state.attendance = parsed.attendance || [];
    state.jobHistory = parsed.jobHistory || [];
    state.operations = parsed.operations || [];
    state.credits = parsed.credits || [];
  } catch (error) {
    console.error('Ошибка чтения localStorage:', error);
    seedDemoData();
  }
}

function seedDemoData() {
  const employees = [
    ['EMP-001', 'Айжан Темирова', 'Кредитный менеджер', 'Кредитный отдел', 'Бишкек — Головной офис', '08:30', '17:30', 'Active', 'a.temirova@optima.local', 'Работает с корпоративными клиентами'],
    ['EMP-002', 'Нурсултан Асанов', 'Специалист по рискам', 'Риск-менеджмент', 'Бишкек — Головной офис', '09:00', '18:00', 'Active', 'n.asanov@optima.local', 'Анализ кредитных рисков'],
    ['EMP-003', 'Аделина Калыкова', 'Операционист', 'Операционный отдел', 'Ош — Центральный филиал', '08:00', '17:00', 'Active', 'a.kalykova@optima.local', 'Работа с клиентскими операциями'],
    ['EMP-004', 'Эрмек Турсунов', 'HR-менеджер', 'HR', 'Бишкек — Головной офис', '09:00', '18:00', 'Remote', 'e.tursunov@optima.local', 'Контроль кадров и табеля'],
    ['EMP-005', 'Мээрим Абдиева', 'Финансовый аналитик', 'Финансовый отдел', 'Бишкек — Головной офис', '09:00', '18:00', 'Active', 'm.abdieva@optima.local', 'Подготовка сводных отчётов'],
    ['EMP-006', 'Руслан Бейшенов', 'Кассир', 'Кассовый отдел', 'Каракол — Филиал', '08:30', '17:30', 'Active', 'r.beishenov@optima.local', 'Кассовые операции'],
    ['EMP-007', 'Элина Сариева', 'IT-администратор', 'IT', 'Бишкек — Data Center', '09:30', '18:30', 'Active', 'e.sarieva@optima.local', 'Поддержка инфраструктуры'],
    ['EMP-008', 'Бекжан Жапаров', 'Старший специалист', 'Служба безопасности', 'Бишкек — Головной офис', '08:00', '17:00', 'Vacation', 'b.japarov@optima.local', 'Контроль доступа и безопасности'],
    ['EMP-009', 'Алина Момунова', 'Менеджер по продажам', 'Розничный бизнес', 'Джалал-Абад — Филиал', '09:00', '18:00', 'Active', 'a.momunova@optima.local', 'Продажи банковских продуктов'],
    ['EMP-010', 'Улан Сыдыков', 'Юрист', 'Юридический отдел', 'Бишкек — Головной офис', '09:00', '18:00', 'Active', 'u.sydykov@optima.local', 'Сопровождение договоров'],
    ['EMP-011', 'Камила Токтобаева', 'Менеджер по качеству', 'Контроль качества', 'Бишкек — Головной офис', '08:30', '17:30', 'Active', 'k.toktobaeva@optima.local', 'Контроль KPI отделов'],
    ['EMP-012', 'Талант Иманов', 'Системный аналитик', 'Digital Banking', 'Бишкек — Головной офис', '10:00', '19:00', 'Active', 't.imanov@optima.local', 'Развитие цифровых сервисов'],
  ].map(([code, name, role, department, branch, shiftStart, shiftEnd, status, email, note]) => ({
    id: code,
    name,
    role,
    department,
    branch,
    shiftStart,
    shiftEnd,
    status,
    email,
    note,
  }));

  const today = new Date();
  const attendance = [];

  const demoPatterns = [
    { checkIn: '08:32', checkOut: '17:39', breakMinutes: 60, status: 'Present' },
    { checkIn: '09:14', checkOut: '18:02', breakMinutes: 60, status: 'Late' },
    { checkIn: '08:03', checkOut: '17:04', breakMinutes: 45, status: 'Present' },
    { checkIn: '09:01', checkOut: '17:58', breakMinutes: 60, status: 'Remote' },
    { checkIn: '09:08', checkOut: '18:47', breakMinutes: 50, status: 'Present' },
    { checkIn: '08:28', checkOut: '17:21', breakMinutes: 60, status: 'Present' },
    { checkIn: '09:34', checkOut: '18:48', breakMinutes: 40, status: 'Late' },
    { checkIn: '', checkOut: '', breakMinutes: 0, status: 'Vacation' },
    { checkIn: '09:05', checkOut: '18:15', breakMinutes: 60, status: 'Present' },
    { checkIn: '08:58', checkOut: '18:01', breakMinutes: 60, status: 'Present' },
    { checkIn: '08:34', checkOut: '17:37', breakMinutes: 60, status: 'Present' },
    { checkIn: '10:10', checkOut: '19:24', breakMinutes: 45, status: 'Late' },
  ];

  for (let i = 0; i < 7; i += 1) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - i);
    const isoDate = formatDateISO(currentDate);

    employees.forEach((employee, index) => {
      const pattern = demoPatterns[(index + i) % demoPatterns.length];
      let status = pattern.status;

      if (i === 2 && index === 5) status = 'Sick';
      if (i === 4 && index === 2) status = 'Absent';
      if (employee.status === 'Vacation') status = 'Vacation';
      if (employee.status === 'Remote' && i % 2 === 0) status = 'Remote';

      attendance.push({
        id: uid('att'),
        employeeId: employee.id,
        date: isoDate,
        checkIn: status === 'Absent' || status === 'Sick' || status === 'Vacation' ? '' : pattern.checkIn,
        checkOut: status === 'Absent' || status === 'Sick' || status === 'Vacation' ? '' : pattern.checkOut,
        breakMinutes: status === 'Absent' || status === 'Sick' || status === 'Vacation' ? 0 : pattern.breakMinutes,
        status,
        note: status === 'Late' ? 'Требуется контроль дисциплины' : status === 'Remote' ? 'Удалённая смена' : '',
      });
    });
  }

  const jobHistory = [
    { employeeId: 'EMP-001', organization: 'Optima Bank (демо)', department: 'Кредитный отдел', role: 'Кредитный менеджер', startDate: '2021-02', endDate: 'Настоящее время', responsibilities: 'Консультации по кредитам, анализ документов, сопровождение клиента' },
    { employeeId: 'EMP-002', organization: 'Optima Risk Center (демо)', department: 'Риск-менеджмент', role: 'Специалист по рискам', startDate: '2020-08', endDate: 'Настоящее время', responsibilities: 'Оценка кредитоспособности, скоринг, анализ просрочки' },
    { employeeId: 'EMP-003', organization: 'Optima Bank (демо)', department: 'Операционный отдел', role: 'Операционист', startDate: '2022-01', endDate: 'Настоящее время', responsibilities: 'Работа с клиентскими операциями и платежами' },
    { employeeId: 'EMP-004', organization: 'Optima HR Service (демо)', department: 'HR', role: 'HR-менеджер', startDate: '2021-05', endDate: 'Настоящее время', responsibilities: 'Кадровый мониторинг, табель, история сотрудников' },
    { employeeId: 'EMP-005', organization: 'Optima Finance Unit (демо)', department: 'Финансовый отдел', role: 'Финансовый аналитик', startDate: '2019-10', endDate: 'Настоящее время', responsibilities: 'Финансовая аналитика, отчёты, внутренние KPI' },
    { employeeId: 'EMP-006', organization: 'Optima Branch Karakol (демо)', department: 'Кассовый отдел', role: 'Кассир', startDate: '2023-03', endDate: 'Настоящее время', responsibilities: 'Приём платежей, кассовые операции, обслуживание клиентов' },
    { employeeId: 'EMP-007', organization: 'Optima Digital (демо)', department: 'IT', role: 'IT-администратор', startDate: '2020-01', endDate: 'Настоящее время', responsibilities: 'Поддержка рабочих мест, внутренней сети и сервисов' },
    { employeeId: 'EMP-009', organization: 'Optima Retail Sales (демо)', department: 'Розничный бизнес', role: 'Менеджер по продажам', startDate: '2022-06', endDate: 'Настоящее время', responsibilities: 'Продажа кредитных и депозитных продуктов' },
    { employeeId: 'EMP-010', organization: 'Optima Legal Service (демо)', department: 'Юридический отдел', role: 'Юрист', startDate: '2021-11', endDate: 'Настоящее время', responsibilities: 'Проверка договоров и юридическое сопровождение' },
    { employeeId: 'EMP-012', organization: 'Optima Digital Banking (демо)', department: 'Digital Banking', role: 'Системный аналитик', startDate: '2023-02', endDate: 'Настоящее время', responsibilities: 'Разработка цифровых банковских процессов' }
  ];

  const operations = [
    { employeeId: 'EMP-001', date: '2026-04-05', organization: 'Optima Bank (демо)', operationType: 'Оформление потребительского кредита', clientInteractions: 6, amountSom: 850000, result: '3 договора одобрены' },
    { employeeId: 'EMP-001', date: '2026-04-08', organization: 'Optima Bank (демо)', operationType: 'Консультации по рефинансированию', clientInteractions: 9, amountSom: 1200000, result: 'Подано 4 заявки' },
    { employeeId: 'EMP-002', date: '2026-04-10', organization: 'Optima Risk Center (демо)', operationType: 'Проверка кредитного скоринга', clientInteractions: 12, amountSom: 2700000, result: 'Оценено 12 заявок' },
    { employeeId: 'EMP-003', date: '2026-04-11', organization: 'Optima Bank (демо)', operationType: 'Внутренние расчётные операции', clientInteractions: 18, amountSom: 560000, result: 'Все операции завершены' },
    { employeeId: 'EMP-005', date: '2026-04-12', organization: 'Optima Finance Unit (демо)', operationType: 'Подготовка отчёта по кредитному портфелю', clientInteractions: 0, amountSom: 6300000, result: 'Отчёт передан руководству' },
    { employeeId: 'EMP-006', date: '2026-04-13', organization: 'Optima Branch Karakol (демо)', operationType: 'Кассовое сопровождение клиентов', clientInteractions: 21, amountSom: 420000, result: '21 клиент обслужен' },
    { employeeId: 'EMP-009', date: '2026-04-14', organization: 'Optima Retail Sales (демо)', operationType: 'Продажа банковских продуктов', clientInteractions: 14, amountSom: 980000, result: '5 клиентов подали заявки' },
    { employeeId: 'EMP-010', date: '2026-04-15', organization: 'Optima Legal Service (демо)', operationType: 'Проверка кредитных договоров', clientInteractions: 7, amountSom: 2100000, result: '7 договоров согласовано' },
    { employeeId: 'EMP-012', date: '2026-04-16', organization: 'Optima Digital Banking (демо)', operationType: 'Анализ цифровых заявок', clientInteractions: 24, amountSom: 3100000, result: '24 онлайн-заявки обработаны' }
  ];

  const credits = [
    { clientName: 'Азамат Т.', clientCode: 'CL-101', officerId: 'EMP-001', product: 'Потребительский кредит', amountSom: 250000, status: 'Approved', month: '2026-01', branch: 'Бишкек — Головной офис', historyStatus: 'Хорошая', riskLevel: 'Низкий' },
    { clientName: 'Алина К.', clientCode: 'CL-102', officerId: 'EMP-001', product: 'Автокредит', amountSom: 780000, status: 'Approved', month: '2026-01', branch: 'Бишкек — Головной офис', historyStatus: 'Хорошая', riskLevel: 'Средний' },
    { clientName: 'Бекзат А.', clientCode: 'CL-103', officerId: 'EMP-009', product: 'Ипотека', amountSom: 3200000, status: 'Pending', month: '2026-02', branch: 'Джалал-Абад — Филиал', historyStatus: 'Средняя', riskLevel: 'Средний' },
    { clientName: 'Нурзат Ж.', clientCode: 'CL-104', officerId: 'EMP-001', product: 'Потребительский кредит', amountSom: 180000, status: 'Approved', month: '2026-02', branch: 'Бишкек — Головной офис', historyStatus: 'Хорошая', riskLevel: 'Низкий' },
    { clientName: 'Руслан М.', clientCode: 'CL-105', officerId: 'EMP-009', product: 'Бизнес-кредит', amountSom: 1450000, status: 'Rejected', month: '2026-02', branch: 'Джалал-Абад — Филиал', historyStatus: 'Проблемная', riskLevel: 'Высокий' },
    { clientName: 'Камила С.', clientCode: 'CL-106', officerId: 'EMP-001', product: 'Рефинансирование', amountSom: 640000, status: 'Approved', month: '2026-03', branch: 'Бишкек — Головной офис', historyStatus: 'Хорошая', riskLevel: 'Низкий' },
    { clientName: 'Эрлан Б.', clientCode: 'CL-107', officerId: 'EMP-009', product: 'Потребительский кредит', amountSom: 300000, status: 'Approved', month: '2026-03', branch: 'Джалал-Абад — Филиал', historyStatus: 'Средняя', riskLevel: 'Средний' },
    { clientName: 'Мээрим Д.', clientCode: 'CL-108', officerId: 'EMP-001', product: 'Ипотека', amountSom: 4100000, status: 'Approved', month: '2026-03', branch: 'Бишкек — Головной офис', historyStatus: 'Хорошая', riskLevel: 'Средний' },
    { clientName: 'Ильгиз К.', clientCode: 'CL-109', officerId: 'EMP-009', product: 'Автокредит', amountSom: 950000, status: 'Closed', month: '2026-03', branch: 'Джалал-Абад — Филиал', historyStatus: 'Хорошая', riskLevel: 'Низкий' },
    { clientName: 'Аделина Н.', clientCode: 'CL-110', officerId: 'EMP-001', product: 'Потребительский кредит', amountSom: 220000, status: 'Approved', month: '2026-04', branch: 'Бишкек — Головной офис', historyStatus: 'Средняя', riskLevel: 'Средний' },
    { clientName: 'Таалай О.', clientCode: 'CL-111', officerId: 'EMP-009', product: 'Бизнес-кредит', amountSom: 2700000, status: 'Approved', month: '2026-04', branch: 'Джалал-Абад — Филиал', historyStatus: 'Хорошая', riskLevel: 'Средний' },
    { clientName: 'Сезим П.', clientCode: 'CL-112', officerId: 'EMP-001', product: 'Рефинансирование', amountSom: 530000, status: 'Pending', month: '2026-04', branch: 'Бишкек — Головной офис', historyStatus: 'Средняя', riskLevel: 'Средний' }
  ];

  state.employees = employees;
  state.attendance = attendance;
  state.jobHistory = jobHistory;
  state.operations = operations;
  state.credits = credits;
  saveState();
}

function formatDateVerbose(date) {
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatDateISO(date) {
  return date.toISOString().split('T')[0];
}

function formatHours(value) {
  return `${value.toFixed(1)} ч`;
}

function minutesFromTime(value) {
  if (!value || !value.includes(':')) return null;
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function hoursBetween(start, end, breakMinutes = 0) {
  const startMin = minutesFromTime(start);
  const endMin = minutesFromTime(end);
  if (startMin === null || endMin === null || endMin <= startMin) return 0;
  return Math.max(0, (endMin - startMin - Number(breakMinutes || 0)) / 60);
}

function getEmployeeById(id) {
  return state.employees.find((employee) => employee.id === id);
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

function badgeClass(status) {
  return `badge ${status}`;
}

function getTodayDate() {
  return formatDateISO(new Date());
}

function getTodayAttendance() {
  const today = getTodayDate();
  return state.attendance.filter((item) => item.date === today);
}

function safeText(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function openModal(modal) {
  modal.classList.remove('hidden');
}

function closeModal(modal) {
  modal.classList.add('hidden');
}

function switchSection(sectionId) {
  state.ui.activeSection = sectionId;
  els.pageSections.forEach((section) => section.classList.toggle('active', section.id === sectionId));
  els.navLinks.forEach((link) => link.classList.toggle('active', link.dataset.section === sectionId));

  const titles = {
  dashboardSection: 'Панель управления',
  employeesSection: 'Сотрудники',
  attendanceSection: 'Посещение и рабочее время',
  analyticsSection: 'Аналитика',
  reportsSection: 'Отчёты',
  historySection: 'История сотрудников',
  creditsSection: 'Кредиты',
  settingsSection: 'Настройки',
};
  els.pageTitle.textContent = titles[sectionId] || 'Панель';
}

function renderMetrics() {
  const todayLogs = getTodayAttendance();
  const presentCount = todayLogs.filter((item) => ['Present', 'Late', 'Remote'].includes(item.status)).length;
  const lateCount = todayLogs.filter((item) => item.status === 'Late').length;
  const absentCount = todayLogs.filter((item) => ['Absent', 'Sick', 'Vacation'].includes(item.status)).length;
  const totalHours = todayLogs.reduce((sum, item) => sum + hoursBetween(item.checkIn, item.checkOut, item.breakMinutes), 0);
  const avgHours = todayLogs.length ? totalHours / todayLogs.filter((item) => ['Present', 'Late', 'Remote'].includes(item.status)).length || 0 : 0;
  const overtime = todayLogs.reduce((sum, item) => {
    const employee = getEmployeeById(item.employeeId);
    if (!employee) return sum;
    const actual = hoursBetween(item.checkIn, item.checkOut, item.breakMinutes);
    const planned = hoursBetween(employee.shiftStart, employee.shiftEnd, 60);
    return sum + Math.max(0, actual - planned);
  }, 0);

  const metrics = [
    ['Сотрудников', state.employees.length, 'Общее количество в системе', '👥'],
    ['Сегодня на работе', presentCount, 'Присутствуют, удалённо и с отметкой', '🏦'],
    ['Опоздания', lateCount, 'Требуют внимания HR и руководителей', '⏰'],
    ['Отсутствуют', absentCount, 'Больничный, отпуск или неявка', '📌'],
    ['Среднее время', formatHours(avgHours || 0), 'Фактически отработано за день', '📊'],
  ];

  els.metricsGrid.innerHTML = metrics.map(([label, value, subtext, icon]) => `
    <article class="metric-card">
      <div class="metric-top">
        <span class="metric-label">${safeText(label)}</span>
        <div class="metric-icon">${icon}</div>
      </div>
      <div class="metric-value">${safeText(value)}</div>
      <div class="metric-subtext">${safeText(subtext)}</div>
    </article>
  `).join('');

  els.statusStats.innerHTML = [
    ['Присутствуют', presentCount],
    ['Опоздали', lateCount],
    ['Отсутствуют', absentCount],
    ['Переработка', formatHours(overtime)],
  ].map(([label, value]) => `
    <div class="status-item">
      <span>${safeText(label)}</span>
      <strong>${safeText(value)}</strong>
    </div>
  `).join('');
}

function getFilteredEmployees() {
  const search = state.ui.search.trim().toLowerCase();
  const departmentFilter = els.departmentFilter.value;
  const statusFilter = els.statusFilter.value;

  return state.employees.filter((employee) => {
    const matchesSearch = !search || [employee.name, employee.role, employee.department, employee.branch, employee.id]
      .join(' ')
      .toLowerCase()
      .includes(search);
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });
}

function renderEmployeeFilters() {
  const departments = [...new Set(state.employees.map((employee) => employee.department))].sort((a, b) => a.localeCompare(b, 'ru'));
  const currentDepartment = els.departmentFilter.value || 'all';
  els.departmentFilter.innerHTML = `
    <option value="all">Все отделы</option>
    ${departments.map((department) => `<option value="${safeText(department)}">${safeText(department)}</option>`).join('')}
  `;
  els.departmentFilter.value = departments.includes(currentDepartment) ? currentDepartment : 'all';
}

function renderEmployeesTable() {
  const employees = getFilteredEmployees();

  if (!employees.length) {
    els.employeesTable.innerHTML = `<tr><td colspan="8"><div class="empty-state">Сотрудники не найдены</div></td></tr>`;
    return;
  }

  els.employeesTable.innerHTML = employees.map((employee) => `
    <tr>
      <td>${safeText(employee.id)}</td>
      <td>
        <div class="person-cell">
          <div class="person-avatar">${safeText(getInitials(employee.name))}</div>
          <div class="person-meta">
            <strong>${safeText(employee.name)}</strong>
            <small>${safeText(employee.email)}</small>
          </div>
        </div>
      </td>
      <td>${safeText(employee.role)}</td>
      <td>${safeText(employee.department)}</td>
      <td>${safeText(employee.branch)}</td>
      <td>${safeText(employee.shiftStart)} - ${safeText(employee.shiftEnd)}</td>
      <td><span class="${badgeClass(employee.status)}">${safeText(statusLabel(employee.status))}</span></td>
      <td>
        <div class="actions-row">
          <button class="action-btn" onclick="editEmployee('${safeText(employee.id)}')">Редактировать</button>
          <button class="action-btn" onclick="removeEmployee('${safeText(employee.id)}')">Удалить</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function statusLabel(status) {
  const map = {
    Active: 'Активен',
    Remote: 'Удалённо',
    Vacation: 'Отпуск',
    Suspended: 'Приостановлен',
    Present: 'Присутствовал',
    Late: 'Опоздал',
    Absent: 'Отсутствовал',
    Sick: 'Больничный',
  };
  return map[status] || status;
}

function getFilteredAttendance() {
  const selectedDate = els.attendanceDateFilter.value;
  const selectedEmployee = els.attendanceEmployeeFilter.value;
  const search = state.ui.search.trim().toLowerCase();

  return state.attendance.filter((item) => {
    const employee = getEmployeeById(item.employeeId);
    if (!employee) return false;
    const matchesDate = !selectedDate || item.date === selectedDate;
    const matchesEmployee = selectedEmployee === 'all' || item.employeeId === selectedEmployee;
    const matchesSearch = !search || [employee.name, employee.department, employee.branch, item.status]
      .join(' ')
      .toLowerCase()
      .includes(search);
    return matchesDate && matchesEmployee && matchesSearch;
  }).sort((a, b) => `${b.date}${b.checkIn}`.localeCompare(`${a.date}${a.checkIn}`));
}

function renderAttendanceFilters() {
  const options = state.employees.map((employee) => `
    <option value="${safeText(employee.id)}">${safeText(employee.name)} — ${safeText(employee.department)}</option>
  `).join('');

  const currentFilter = els.attendanceEmployeeFilter.value || 'all';
  els.attendanceEmployeeFilter.innerHTML = `<option value="all">Все сотрудники</option>${options}`;
  els.attendanceEmployee.innerHTML = options;

  if ([...state.employees.map((employee) => employee.id), 'all'].includes(currentFilter)) {
    els.attendanceEmployeeFilter.value = currentFilter;
  }
}

function renderAttendanceTable() {
  const items = getFilteredAttendance();
  if (!items.length) {
    els.attendanceTable.innerHTML = `<tr><td colspan="9"><div class="empty-state">Записи посещаемости не найдены</div></td></tr>`;
    renderDailySummary([]);
    return;
  }

  els.attendanceTable.innerHTML = items.map((item) => {
    const employee = getEmployeeById(item.employeeId);
    const hours = hoursBetween(item.checkIn, item.checkOut, item.breakMinutes);
    return `
      <tr>
        <td>${safeText(employee?.name || 'Не найден')}</td>
        <td>${safeText(item.date)}</td>
        <td>${safeText(item.checkIn || '—')}</td>
        <td>${safeText(item.checkOut || '—')}</td>
        <td>${safeText(item.breakMinutes || 0)} мин</td>
        <td><span class="${badgeClass(item.status)}">${safeText(statusLabel(item.status))}</span></td>
        <td>${formatHours(hours)}</td>
        <td>${safeText(item.note || '—')}</td>
        <td>
          <div class="actions-row">
            <button class="action-btn" onclick="editAttendance('${safeText(item.id)}')">Изменить</button>
            <button class="action-btn" onclick="removeAttendance('${safeText(item.id)}')">Удалить</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  renderDailySummary(items);
}

function renderDailySummary(items) {
  const present = items.filter((item) => ['Present', 'Late', 'Remote'].includes(item.status)).length;
  const absent = items.filter((item) => ['Absent', 'Sick', 'Vacation'].includes(item.status)).length;
  const late = items.filter((item) => item.status === 'Late').length;
  const totalHours = items.reduce((sum, item) => sum + hoursBetween(item.checkIn, item.checkOut, item.breakMinutes), 0);
  const avgHours = items.length ? totalHours / Math.max(1, present) : 0;

  els.dailySummary.innerHTML = [
    ['Присутствуют', present],
    ['Отсутствуют', absent],
    ['Опоздали', late],
    ['Всего часов', formatHours(totalHours)],
    ['Среднее на сотрудника', formatHours(avgHours)],
  ].map(([label, value]) => `
    <div class="summary-item">
      <strong>${safeText(label)}</strong>
      <span>${safeText(value)}</span>
    </div>
  `).join('');
}

function renderRecentLogs() {
  const recent = [...state.attendance]
    .sort((a, b) => `${b.date}${b.checkIn}`.localeCompare(`${a.date}${a.checkIn}`))
    .slice(0, 10);

  els.recentLogsTable.innerHTML = recent.map((item) => {
    const employee = getEmployeeById(item.employeeId);
    return `
      <tr>
        <td>${safeText(employee?.name || '—')}</td>
        <td>${safeText(item.date)}</td>
        <td>${safeText(item.checkIn || '—')}</td>
        <td>${safeText(item.checkOut || '—')}</td>
        <td><span class="${badgeClass(item.status)}">${safeText(statusLabel(item.status))}</span></td>
        <td>${formatHours(hoursBetween(item.checkIn, item.checkOut, item.breakMinutes))}</td>
      </tr>
    `;
  }).join('');
}

function renderDepartmentPerformance() {
  const map = new Map();

  state.attendance.forEach((item) => {
    const employee = getEmployeeById(item.employeeId);
    if (!employee) return;
    if (!map.has(employee.department)) {
      map.set(employee.department, { hours: 0, total: 0, present: 0 });
    }
    const data = map.get(employee.department);
    data.total += 1;
    if (['Present', 'Late', 'Remote'].includes(item.status)) {
      data.present += 1;
      data.hours += hoursBetween(item.checkIn, item.checkOut, item.breakMinutes);
    }
  });

  const rows = [...map.entries()]
    .map(([department, data]) => ({
      department,
      avgHours: data.present ? data.hours / data.present : 0,
      attendanceRate: data.total ? (data.present / data.total) * 100 : 0,
    }))
    .sort((a, b) => b.attendanceRate - a.attendanceRate);

  els.departmentPerformance.innerHTML = rows.map((row) => `
    <div class="stack-item">
      <div class="stack-head">
        <strong>${safeText(row.department)}</strong>
        <span>${row.attendanceRate.toFixed(0)}%</span>
      </div>
      <div>Среднее время: ${formatHours(row.avgHours)}</div>
      <div class="progress-line"><span style="width:${row.attendanceRate.toFixed(0)}%"></span></div>
    </div>
  `).join('');
}

function getDateRange(days = 7) {
  const dates = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(formatDateISO(date));
  }
  return dates;
}

function drawLineChart(canvas, labels, values, lineColor = '#b51520', fillColor = 'rgba(181, 21, 32, 0.12)') {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const padding = { top: 28, right: 18, bottom: 52, left: 52 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxValue = Math.max(...values, 10);

  ctx.font = '12px Inter';
  ctx.fillStyle = '#7b818c';
  ctx.strokeStyle = '#edf0f4';
  ctx.lineWidth = 1;

  for (let i = 0; i <= 5; i += 1) {
    const y = padding.top + (chartH / 5) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    const value = Math.round(maxValue - (maxValue / 5) * i);
    ctx.fillText(String(value), 12, y + 4);
  }

  if (!values.length) return;

  const points = values.map((value, index) => {
    const x = padding.left + (chartW / Math.max(1, values.length - 1)) * index;
    const y = padding.top + chartH - (value / maxValue) * chartH;
    return { x, y, value };
  });

  ctx.beginPath();
  ctx.moveTo(points[0].x, padding.top + chartH);
  points.forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();

  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();
  });

  labels.forEach((label, index) => {
    const x = padding.left + (chartW / Math.max(1, labels.length - 1)) * index;
    ctx.fillStyle = '#68707d';
    ctx.fillText(label.slice(5), x - 14, height - 20);
  });
}

function drawDashboardCharts() {
  const labels = getDateRange(7);
  const values = labels.map((date) => state.attendance
    .filter((item) => item.date === date)
    .reduce((sum, item) => sum + hoursBetween(item.checkIn, item.checkOut, item.breakMinutes), 0));

  drawLineChart(els.hoursChart, labels, values);
}

function getAnalyticsRange() {
  const defaultEnd = getTodayDate();
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 13);
  const start = els.analyticsStartDate.value || formatDateISO(defaultStartDate);
  const end = els.analyticsEndDate.value || defaultEnd;
  return { start, end };
}

function filterAttendanceByDateRange(start, end) {
  return state.attendance.filter((item) => item.date >= start && item.date <= end);
}

function renderAnalytics() {
  const { start, end } = getAnalyticsRange();
  const items = filterAttendanceByDateRange(start, end);

  const groupedByDate = new Map();
  items.forEach((item) => {
    if (!groupedByDate.has(item.date)) groupedByDate.set(item.date, 0);
    groupedByDate.set(item.date, groupedByDate.get(item.date) + hoursBetween(item.checkIn, item.checkOut, item.breakMinutes));
  });

  const labels = [...groupedByDate.keys()].sort();
  const values = labels.map((label) => groupedByDate.get(label));
  drawLineChart(els.analyticsChart, labels, values, '#1b4bb3', 'rgba(37, 99, 235, 0.10)');

  const employeeHours = new Map();
  const branchStats = new Map();

  items.forEach((item) => {
    const employee = getEmployeeById(item.employeeId);
    if (!employee) return;

    employeeHours.set(employee.id, (employeeHours.get(employee.id) || 0) + hoursBetween(item.checkIn, item.checkOut, item.breakMinutes));

    if (!branchStats.has(employee.branch)) {
      branchStats.set(employee.branch, { total: 0, present: 0 });
    }
    const branch = branchStats.get(employee.branch);
    branch.total += 1;
    if (['Present', 'Late', 'Remote'].includes(item.status)) {
      branch.present += 1;
    }
  });

  const topEmployees = [...employeeHours.entries()]
    .map(([employeeId, hours]) => ({ employee: getEmployeeById(employeeId), hours }))
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 6);

  els.topEmployeesList.innerHTML = topEmployees.map((entry, index) => `
    <div class="stack-item">
      <div class="stack-head">
        <strong>${index + 1}. ${safeText(entry.employee?.name || '—')}</strong>
        <span>${formatHours(entry.hours)}</span>
      </div>
      <div>${safeText(entry.employee?.department || '—')}</div>
      <div class="progress-line"><span style="width:${Math.min(100, (entry.hours / Math.max(1, topEmployees[0]?.hours || 1)) * 100)}%"></span></div>
    </div>
  `).join('') || '<div class="empty-state">Нет данных за выбранный период</div>';

  const topBranches = [...branchStats.entries()]
    .map(([branch, data]) => ({ branch, rate: data.total ? (data.present / data.total) * 100 : 0 }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 6);

  els.topBranchesList.innerHTML = topBranches.map((entry) => `
    <div class="stack-item">
      <div class="stack-head">
        <strong>${safeText(entry.branch)}</strong>
        <span>${entry.rate.toFixed(0)}%</span>
      </div>
      <div class="progress-line"><span style="width:${entry.rate.toFixed(0)}%"></span></div>
    </div>
  `).join('') || '<div class="empty-state">Нет данных по филиалам</div>';
}

function generateMonthlyReport() {
  const monthValue = els.reportMonth.value || getTodayDate().slice(0, 7);
  const items = state.attendance.filter((item) => item.date.startsWith(monthValue));

  if (!items.length) {
    els.monthlyReportOutput.innerHTML = '<div class="empty-state">За выбранный месяц данных нет</div>';
    return;
  }

  const totalHours = items.reduce((sum, item) => sum + hoursBetween(item.checkIn, item.checkOut, item.breakMinutes), 0);
  const lateCount = items.filter((item) => item.status === 'Late').length;
  const absentCount = items.filter((item) => ['Absent', 'Sick', 'Vacation'].includes(item.status)).length;
  const presentCount = items.filter((item) => ['Present', 'Late', 'Remote'].includes(item.status)).length;

  const byDepartment = new Map();
  items.forEach((item) => {
    const employee = getEmployeeById(item.employeeId);
    if (!employee) return;
    if (!byDepartment.has(employee.department)) {
      byDepartment.set(employee.department, { hours: 0, count: 0 });
    }
    const itemData = byDepartment.get(employee.department);
    itemData.hours += hoursBetween(item.checkIn, item.checkOut, item.breakMinutes);
    itemData.count += 1;
  });

  const departmentRows = [...byDepartment.entries()]
    .sort((a, b) => b[1].hours - a[1].hours)
    .map(([department, data]) => `
      <div class="report-item">
        <strong>${safeText(department)}</strong>
        <div>Суммарные часы: ${formatHours(data.hours)}</div>
        <div>Записей: ${data.count}</div>
      </div>
    `)
    .join('');

  els.monthlyReportOutput.innerHTML = `
    <div class="report-item">
      <strong>Месяц: ${safeText(monthValue)}</strong>
      <div>Всего сотрудников в системе: ${state.employees.length}</div>
      <div>Всего записей посещаемости: ${items.length}</div>
      <div>Общее количество часов: ${formatHours(totalHours)}</div>
      <div>Присутствия: ${presentCount}</div>
      <div>Опоздания: ${lateCount}</div>
      <div>Отсутствия: ${absentCount}</div>
    </div>
    ${departmentRows}
  `;
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportEmployeesCSV() {
  const rows = [
    ['ID', 'ФИО', 'Должность', 'Отдел', 'Филиал', 'Начало смены', 'Конец смены', 'Статус', 'Email', 'Комментарий'],
    ...state.employees.map((employee) => [
      employee.id,
      employee.name,
      employee.role,
      employee.department,
      employee.branch,
      employee.shiftStart,
      employee.shiftEnd,
      statusLabel(employee.status),
      employee.email,
      employee.note,
    ]),
  ];

  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  download('employees.csv', csv, 'text/csv;charset=utf-8;');
}

function exportAttendanceCSV() {
  const rows = [
    ['ID', 'Сотрудник', 'Дата', 'Вход', 'Выход', 'Перерыв', 'Статус', 'Часы', 'Примечание'],
    ...state.attendance.map((item) => {
      const employee = getEmployeeById(item.employeeId);
      return [
        item.id,
        employee?.name || '',
        item.date,
        item.checkIn,
        item.checkOut,
        item.breakMinutes,
        statusLabel(item.status),
        hoursBetween(item.checkIn, item.checkOut, item.breakMinutes).toFixed(2),
        item.note,
      ];
    }),
  ];

  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  download('attendance.csv', csv, 'text/csv;charset=utf-8;');
}

function downloadBackup() {
  download('optima_staff_backup.json', JSON.stringify({
    employees: state.employees,
    attendance: state.attendance,
    jobHistory: state.jobHistory,
    operations: state.operations,
    credits: state.credits,
  }, null, 2), 'application/json');
}


function restoreFromJsonFile(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      state.employees = Array.isArray(parsed.employees) ? parsed.employees : [];
      state.attendance = Array.isArray(parsed.attendance) ? parsed.attendance : [];
      state.jobHistory = Array.isArray(parsed.jobHistory) ? parsed.jobHistory : [];
      state.operations = Array.isArray(parsed.operations) ? parsed.operations : [];
      state.credits = Array.isArray(parsed.credits) ? parsed.credits : [];
      saveState();
      refreshUI();
      alert('Данные успешно восстановлены.');
    } catch (error) {
      alert('Не удалось прочитать JSON файл.');
    }
  };
  reader.readAsText(file);
}

function fillEmployeeForm(employee = null) {
  els.employeeForm.reset();

  if (!employee) {
    els.employeeModalTitle.textContent = 'Добавить сотрудника';
    els.employeeId.value = '';
    els.employeeShiftStart.value = '09:00';
    els.employeeShiftEnd.value = '18:00';
    els.employeeStatus.value = 'Active';
    return;
  }

  els.employeeModalTitle.textContent = 'Редактировать сотрудника';
  els.employeeId.value = employee.id;
  els.employeeName.value = employee.name;
  els.employeeRole.value = employee.role;
  els.employeeDepartment.value = employee.department;
  els.employeeBranch.value = employee.branch;
  els.employeeShiftStart.value = employee.shiftStart;
  els.employeeShiftEnd.value = employee.shiftEnd;
  els.employeeStatus.value = employee.status;
  els.employeeEmail.value = employee.email;
  els.employeeNote.value = employee.note || '';
}

function fillAttendanceForm(record = null) {
  els.attendanceForm.reset();
  els.attendanceId.value = '';
  els.attendanceBreak.value = 60;
  els.attendanceDate.value = getTodayDate();
  els.attendanceStatus.value = 'Present';

  if (!record) return;

  els.attendanceId.value = record.id;
  els.attendanceEmployee.value = record.employeeId;
  els.attendanceDate.value = record.date;
  els.attendanceCheckIn.value = record.checkIn;
  els.attendanceCheckOut.value = record.checkOut;
  els.attendanceBreak.value = record.breakMinutes;
  els.attendanceStatus.value = record.status;
  els.attendanceNote.value = record.note || '';
}

function submitEmployeeForm(event) {
  event.preventDefault();

  const employeeData = {
    id: els.employeeId.value || `EMP-${String(Date.now()).slice(-6)}`,
    name: els.employeeName.value.trim(),
    role: els.employeeRole.value.trim(),
    department: els.employeeDepartment.value.trim(),
    branch: els.employeeBranch.value.trim(),
    shiftStart: els.employeeShiftStart.value,
    shiftEnd: els.employeeShiftEnd.value,
    status: els.employeeStatus.value,
    email: els.employeeEmail.value.trim(),
    note: els.employeeNote.value.trim(),
  };

  const existingIndex = state.employees.findIndex((employee) => employee.id === employeeData.id);
  if (existingIndex >= 0) {
    state.employees[existingIndex] = employeeData;
  } else {
    state.employees.push(employeeData);
  }

  saveState();
  refreshUI();
  closeModal(els.employeeModal);
}

function submitAttendanceForm(event) {
  event.preventDefault();

  const attendanceData = {
    id: els.attendanceId.value || uid('att'),
    employeeId: els.attendanceEmployee.value,
    date: els.attendanceDate.value,
    checkIn: els.attendanceCheckIn.value,
    checkOut: els.attendanceCheckOut.value,
    breakMinutes: Number(els.attendanceBreak.value || 0),
    status: els.attendanceStatus.value,
    note: els.attendanceNote.value.trim(),
  };

  const index = state.attendance.findIndex((item) => item.id === attendanceData.id);
  if (index >= 0) {
    state.attendance[index] = attendanceData;
  } else {
    state.attendance.push(attendanceData);
  }

  saveState();
  refreshUI();
  closeModal(els.attendanceModal);
}

function editEmployee(id) {
  const employee = getEmployeeById(id);
  if (!employee) return;
  fillEmployeeForm(employee);
  openModal(els.employeeModal);
}

function removeEmployee(id) {
  const employee = getEmployeeById(id);
  if (!employee) return;
  const approved = confirm(`Удалить сотрудника ${employee.name}?`);
  if (!approved) return;
  state.employees = state.employees.filter((item) => item.id !== id);
  state.attendance = state.attendance.filter((item) => item.employeeId !== id);
  saveState();
  refreshUI();
}

function editAttendance(id) {
  const record = state.attendance.find((item) => item.id === id);
  if (!record) return;
  fillAttendanceForm(record);
  openModal(els.attendanceModal);
}

function removeAttendance(id) {
  const approved = confirm('Удалить запись посещаемости?');
  if (!approved) return;
  state.attendance = state.attendance.filter((item) => item.id !== id);
  saveState();
  refreshUI();
}

window.editEmployee = editEmployee;
window.removeEmployee = removeEmployee;
window.editAttendance = editAttendance;
window.removeAttendance = removeAttendance;

function formatMoney(value) {
  return new Intl.NumberFormat('ru-RU').format(Number(value || 0)) + ' сом';
}

function creditStatusClass(status) {
  const map = {
    Approved: 'approved',
    Pending: 'pending',
    Rejected: 'rejected',
    Closed: 'closed',
  };
  return map[status] || 'pending';
}

function creditStatusLabel(status) {
  const map = {
    Approved: 'Одобрено',
    Pending: 'На рассмотрении',
    Rejected: 'Отказ',
    Closed: 'Закрыт',
  };
  return map[status] || status;
}

function drawBarChart(canvas, labels, values, color = '#b51520') {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const padding = { top: 25, right: 20, bottom: 60, left: 70 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxValue = Math.max(...values, 1);

  ctx.font = '12px Inter';
  ctx.strokeStyle = '#edf0f4';
  ctx.fillStyle = '#7b818c';
  ctx.lineWidth = 1;

  for (let i = 0; i <= 5; i += 1) {
    const y = padding.top + (chartH / 5) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    const value = Math.round(maxValue - (maxValue / 5) * i);
    ctx.fillText(String(value), 16, y + 4);
  }

  if (!labels.length) return;

  const slot = chartW / labels.length;
  const barWidth = slot * 0.58;

  labels.forEach((label, index) => {
    const value = values[index];
    const barHeight = (value / maxValue) * chartH;
    const x = padding.left + slot * index + (slot - barWidth) / 2;
    const y = padding.top + chartH - barHeight;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = '#68707d';
    ctx.fillText(label, x - 4, height - 22);
  });
}

function renderEmployeeHistorySection() {
  if (!els.jobHistoryTable || !els.operationsTable) return;

  state.jobHistory = Array.isArray(state.jobHistory) ? state.jobHistory : [];
  state.operations = Array.isArray(state.operations) ? state.operations : [];

  if (state.jobHistory.length) {
    els.jobHistoryTable.innerHTML = state.jobHistory.map((item) => {
      const employee = getEmployeeById(item.employeeId);
      return `
        <tr>
          <td>${safeText(employee?.name || '—')}</td>
          <td>${safeText(item.organization)}</td>
          <td>${safeText(item.department)}</td>
          <td>${safeText(item.role)}</td>
          <td>${safeText(item.startDate)} — ${safeText(item.endDate)}</td>
          <td>${safeText(item.responsibilities)}</td>
        </tr>
      `;
    }).join('');
  } else {
    els.jobHistoryTable.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">Нет данных по истории сотрудников</div>
        </td>
      </tr>
    `;
  }

  if (state.operations.length) {
    els.operationsTable.innerHTML = state.operations.map((item) => {
      const employee = getEmployeeById(item.employeeId);
      return `
        <tr>
          <td>${safeText(employee?.name || '—')}</td>
          <td>${safeText(item.date)}</td>
          <td>${safeText(item.organization)}</td>
          <td>${safeText(item.operationType)}</td>
          <td>${safeText(item.clientInteractions)}</td>
          <td><span class="money-value">${formatMoney(item.amountSom)}</span></td>
          <td>${safeText(item.result)}</td>
        </tr>
      `;
    }).join('');
  } else {
    els.operationsTable.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">Нет данных по операциям</div>
        </td>
      </tr>
    `;
  }
}

function renderCreditsSection() {
  if (!els.creditKpis || !els.creditAmountChart || !els.creditOfficerChart || !els.recentClientTable || !els.creditSummaryList) return;

  state.credits = Array.isArray(state.credits) ? state.credits : [];

  const uniqueClients = new Set(state.credits.map((item) => item.clientCode)).size;
  const approvedCredits = state.credits.filter((item) => item.status === 'Approved');
  const approvedCount = approvedCredits.length;
  const approvedSum = approvedCredits.reduce((sum, item) => sum + item.amountSom, 0);
  const averageCredit = approvedCount ? approvedSum / approvedCount : 0;
  const totalInteractions = state.operations.reduce((sum, item) => sum + Number(item.clientInteractions || 0), 0);

  els.creditKpis.innerHTML = `
    <div class="mini-metric-card">
      <div class="label">Клиентов в системе</div>
      <div class="value">${uniqueClients}</div>
      <div class="desc">Уникальные клиенты по кредитным заявкам</div>
    </div>
    <div class="mini-metric-card">
      <div class="label">Одобренные кредиты</div>
      <div class="value">${approvedCount}</div>
      <div class="desc">Количество одобренных заявок</div>
    </div>
    <div class="mini-metric-card">
      <div class="label">Сумма одобренных</div>
      <div class="value">${formatMoney(approvedSum)}</div>
      <div class="desc">Общий объём выданных кредитов</div>
    </div>
    <div class="mini-metric-card">
      <div class="label">Средний кредит</div>
      <div class="value">${formatMoney(averageCredit)}</div>
      <div class="desc">Средняя сумма одного кредита</div>
    </div>
    <div class="mini-metric-card">
      <div class="label">Взаимодействия</div>
      <div class="value">${totalInteractions}</div>
      <div class="desc">Контакты сотрудников с клиентами</div>
    </div>
  `;

  const monthMap = new Map();
  approvedCredits.forEach((item) => {
    monthMap.set(item.month, (monthMap.get(item.month) || 0) + item.amountSom);
  });

  const monthLabels = [...monthMap.keys()].sort();
  const monthValues = monthLabels.map((label) => Math.round((monthMap.get(label) || 0) / 1000));
  drawBarChart(els.creditAmountChart, monthLabels.map((m) => m.slice(5)), monthValues, '#b51520');

  const officerMap = new Map();
  approvedCredits.forEach((item) => {
    officerMap.set(item.officerId, (officerMap.get(item.officerId) || 0) + 1);
  });

  const officerRows = [...officerMap.entries()]
    .map(([employeeId, count]) => ({
      name: getEmployeeById(employeeId)?.name || employeeId,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  drawBarChart(
    els.creditOfficerChart,
    officerRows.map((row) => row.name.split(' ')[0]),
    officerRows.map((row) => row.count),
    '#1b4bb3'
  );

  els.recentClientTable.innerHTML = state.credits.length
    ? [...state.credits].reverse().slice(0, 8).map((item) => {
        const officer = getEmployeeById(item.officerId);
        return `
          <tr>
            <td>${safeText(item.clientName)}</td>
            <td>${safeText(officer?.name || '—')}</td>
            <td>${safeText(item.product)}</td>
            <td><span class="money-value">${formatMoney(item.amountSom)}</span></td>
            <td><span class="credit-pill ${creditStatusClass(item.status)}">${creditStatusLabel(item.status)}</span></td>
            <td><span class="history-badge">${safeText(item.historyStatus)}</span></td>
          </tr>
        `;
      }).join('')
    : `
      <tr>
        <td colspan="6">
          <div class="empty-state">Нет данных по кредитам</div>
        </td>
      </tr>
    `;

  const productMap = new Map();
  state.credits.forEach((item) => {
    if (!productMap.has(item.product)) {
      productMap.set(item.product, { count: 0, sum: 0 });
    }
    const product = productMap.get(item.product);
    product.count += 1;
    product.sum += item.amountSom;
  });

  const riskMap = new Map();
  state.credits.forEach((item) => {
    riskMap.set(item.riskLevel, (riskMap.get(item.riskLevel) || 0) + 1);
  });

  const maxProductSum = Math.max(1, ...[...productMap.values()].map((item) => item.sum));

  const productSummary = [...productMap.entries()]
    .sort((a, b) => b[1].sum - a[1].sum)
    .map(([product, data]) => `
      <div class="stack-item">
        <div class="stack-head">
          <strong>${safeText(product)}</strong>
          <span>${data.count} заявок</span>
        </div>
        <div>Общая сумма: ${formatMoney(data.sum)}</div>
        <div class="progress-line">
          <span style="width:${Math.min(100, (data.sum / maxProductSum) * 100)}%"></span>
        </div>
      </div>
    `).join('');

  const riskSummary = [...riskMap.entries()]
    .map(([risk, count]) => `
      <div class="stack-item">
        <div class="stack-head">
          <strong>Риск: ${safeText(risk)}</strong>
          <span>${count}</span>
        </div>
      </div>
    `).join('');

  els.creditSummaryList.innerHTML = productSummary + riskSummary;
}
function refreshUI() {
  renderEmployeeFilters();
  renderAttendanceFilters();
  renderMetrics();
  renderEmployeesTable();
  renderAttendanceTable();
  renderRecentLogs();
  renderDepartmentPerformance();
  drawDashboardCharts();
  renderAnalytics();
  renderEmployeeHistorySection();
  renderCreditsSection();
  generateMonthlyReport();
}

function setDefaults() {
  els.liveDate.textContent = formatDateVerbose(new Date());
  els.attendanceDateFilter.value = getTodayDate();
  els.attendanceDate.value = getTodayDate();
  els.reportMonth.value = getTodayDate().slice(0, 7);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 13);
  els.analyticsStartDate.value = formatDateISO(startDate);
  els.analyticsEndDate.value = formatDateISO(endDate);
}

function attachEvents() {
  els.navLinks.forEach((link) => {
    link.addEventListener('click', () => switchSection(link.dataset.section));
  });

  els.globalSearch.addEventListener('input', (event) => {
    state.ui.search = event.target.value;
    renderEmployeesTable();
    renderAttendanceTable();
  });

  els.departmentFilter.addEventListener('change', renderEmployeesTable);
  els.statusFilter.addEventListener('change', renderEmployeesTable);
  els.attendanceDateFilter.addEventListener('change', renderAttendanceTable);
  els.attendanceEmployeeFilter.addEventListener('change', renderAttendanceTable);
  els.applyAnalyticsBtn.addEventListener('click', renderAnalytics);
  els.generateMonthlyReportBtn.addEventListener('click', generateMonthlyReport);

  els.quickAddEmployeeBtn.addEventListener('click', () => {
    fillEmployeeForm();
    openModal(els.employeeModal);
  });

  els.openAttendanceModalBtn.addEventListener('click', () => {
    fillAttendanceForm();
    openModal(els.attendanceModal);
  });

  els.seedDemoBtn.addEventListener('click', () => {
    const approved = confirm('Загрузить демо-данные? Текущие данные будут заменены.');
    if (!approved) return;
    seedDemoData();
    setDefaults();
    refreshUI();
  });

  document.querySelectorAll('[data-close]').forEach((button) => {
    button.addEventListener('click', () => {
      const modal = document.getElementById(button.dataset.close);
      closeModal(modal);
    });
  });

  [els.employeeModal, els.attendanceModal].forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal(modal);
    });
  });

  els.employeeForm.addEventListener('submit', submitEmployeeForm);
  els.attendanceForm.addEventListener('submit', submitAttendanceForm);

  els.exportEmployeesBtn.addEventListener('click', exportEmployeesCSV);
  els.exportAttendanceBtn.addEventListener('click', exportAttendanceCSV);
  els.backupDataBtn.addEventListener('click', downloadBackup);
  els.restoreDataBtn.addEventListener('click', () => els.restoreFileInput.click());
  els.restoreFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) restoreFromJsonFile(file);
    event.target.value = '';
  });

  els.resetAllDataBtn.addEventListener('click', () => {
    const approved = confirm('Полностью удалить все данные?');
    if (!approved) return;
    localStorage.removeItem(STORAGE_KEY);
    seedDemoData();
    setDefaults();
    refreshUI();
  });
}

function init() {
  loadState();
  setDefaults();
  attachEvents();
  switchSection('dashboardSection');
  refreshUI();
}

init();
