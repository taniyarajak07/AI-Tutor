
// ============================================
// SINGLE USER DEMO MODE - ALL BUTTONS WORKING
// ============================================

const STUDENT_ID = "89c9c522-65c8-4743-99e2-60bc9d181a18";

// DOM Elements
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const studentSection = document.getElementById("student-section");
const progressSection = document.getElementById("progress-section");
const assessmentSection = document.getElementById("assessment-section");
const lessonsSection = document.getElementById("lessons-section");
const studentName = document.getElementById("student-name");
const studentGrade = document.getElementById("student-grade");
const studentLevel = document.getElementById("student-level");
const studentLanguage = document.getElementById("student-language");
const studentGoal = document.getElementById("student-goal");
const progressContainer = document.getElementById("progress-container");
const assessmentContainer = document.getElementById("assessment-container");
const lessonsContainer = document.getElementById("lessons-container");
const authModal = document.getElementById("auth-modal");
const appLayout = document.getElementById("app-layout");

// ============================================
// MOCK DATA
// ============================================
const mockStudent = {
    name: "Taniya Rajak",
    grade: "10",
    current_level: "Intermediate",
    preferred_language: "English",
    learning_goals: "Master Physics and Mathematics for board exams"
};

const mockProgress = [
    { topic: "Newton's Laws of Motion", subject: "Physics", mastery_score: 85, status: "Mastered", strength: "Conceptual understanding", weakness: "Numerical problems" },
    { topic: "Photosynthesis", subject: "Biology", mastery_score: 60, status: "In Progress", strength: "Diagram labeling", weakness: "Chemical equations" },
    { topic: "Quadratic Equations", subject: "Mathematics", mastery_score: 45, status: "Needs Review", strength: "Basic factoring", weakness: "Word problems" }
];

const mockAssessments = [
    { topic: "Newton's Laws", score: 90, is_correct: true, feedback: "Excellent work! You've mastered this concept." },
    { topic: "Photosynthesis", score: 55, is_correct: false, feedback: "Review the light-dependent reactions chapter." },
    { topic: "Quadratic Equations", score: 65, is_correct: false, feedback: "Practice more word problems to improve." }
];

const mockLessons = [
    { id: "1", title: "Introduction to Kinematics", subject: "Physics", topic: "Motion", progress: 100 },
    { id: "2", title: "Cellular Respiration Deep Dive", subject: "Biology", topic: "Cells", progress: 60 },
    { id: "3", title: "The French Revolution", subject: "History", topic: "Modern Europe", progress: 40 }
];

const allLessons = [
    { id: "1", title: "Introduction to Kinematics", subject: "Physics", topic: "Motion", progress: 100 },
    { id: "2", title: "Cellular Respiration Deep Dive", subject: "Biology", topic: "Cells", progress: 60 },
    { id: "3", title: "The French Revolution", subject: "History", topic: "Modern Europe", progress: 40 },
    { id: "4", title: "Quadratic Equations Mastery", subject: "Math", topic: "Algebra", progress: 25 },
    { id: "5", title: "Periodic Table Basics", subject: "Chemistry", topic: "Elements", progress: 0 },
    { id: "6", title: "Trigonometry Fundamentals", subject: "Math", topic: "Trig", progress: 15 }
];

const allAchievements = [
    { title: "First Steps", desc: "Completed your first AI lesson", icon: "footprints", color: "#6366f1", unlocked: true },
    { title: "7-Day Streak", desc: "Studied for 7 days in a row", icon: "flame", color: "#ec4899", unlocked: true },
    { title: "Physics Master", desc: "Achieved 85%+ mastery in Physics", icon: "atom", color: "#10b981", unlocked: true },
    { title: "Quiz Whiz", desc: "Scored above 90% on an assessment", icon: "trophy", color: "#f59e0b", unlocked: true },
    { title: "Night Owl", desc: "Completed a lesson after 10 PM", icon: "moon", color: "#8b5cf6", unlocked: true },
    { title: "Perfect Week", desc: "Study 7 days in a row with 100% completion", icon: "calendar-check", color: "#06b6d4", unlocked: false },
    { title: "Century Club", desc: "Complete 100 lessons", icon: "medal", color: "#eab308", unlocked: false },
    { title: "Polyglot", desc: "Complete lessons in 3 different languages", icon: "languages", color: "#14b8a6", unlocked: false }
];

// ============================================
// DISPLAY FUNCTIONS
// ============================================
function displayStudent(student) {
    if (!studentName) return;
    studentName.textContent = student.name || "-";
    studentGrade.textContent = student.grade || "-";
    studentLevel.textContent = student.current_level || "-";
    studentLanguage.textContent = student.preferred_language || "-";
    studentGoal.textContent = student.learning_goals || "No learning goal specified.";
    studentSection.classList.remove("hidden");
}

function displayProgress(progress) {
    if (!progressContainer) return;
    progressContainer.innerHTML = "";
    progress.forEach(item => {
        const mastery = Math.max(0, Math.min(100, Number(item.mastery_score ?? 0)));
        const card = document.createElement("div");
        card.className = "progress-card";
        card.innerHTML = `
            <div class="progress-header">
                <h3>${item.topic}</h3>
                <span class="mastery">${mastery}%</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width: ${mastery}%"></div></div>
            <div class="progress-details"><span>Status: ${item.status}</span></div>
            <div class="progress-details"><span>💪 ${item.strength}</span><span>📈 ${item.weakness}</span></div>
        `;
        progressContainer.appendChild(card);
    });
    progressSection.classList.remove("hidden");
}

function displayAssessments(assessments) {
    if (!assessmentContainer) return;
    assessmentContainer.innerHTML = "";
    const table = document.createElement("table");
    table.className = "assessment-table";
    table.innerHTML = `<thead><tr><th>Topic</th><th>Score</th><th>Result</th><th>Feedback</th></tr></thead><tbody></tbody>`;
    const tbody = table.querySelector("tbody");
    assessments.forEach(item => {
        const row = document.createElement("tr");
        const result = item.is_correct ? "Correct" : "Incorrect";
        const resultClass = item.is_correct ? "correct" : "incorrect";
        row.innerHTML = `<td>${item.topic}</td><td>${item.score}%</td><td class="${resultClass}">${result}</td><td>${item.feedback}</td>`;
        tbody.appendChild(row);
    });
    assessmentContainer.appendChild(table);
    assessmentSection.classList.remove("hidden");
}

function displayLessons(lessons) {
    if (!lessonsContainer) return;
    lessonsContainer.innerHTML = "";
    lessons.forEach(lesson => {
        const card = document.createElement("div");
        card.className = "lesson-card";
        
        let buttonLabel = "Start Lesson →";
        if (lesson.progress === 100) buttonLabel = "Review Lesson →";
        else if (lesson.progress > 0) buttonLabel = `Continue (${lesson.progress}%) →`;
        
        card.innerHTML = `
            <h3>${lesson.title}</h3>
            <div class="lesson-info"><span>📘 ${lesson.subject}</span><span>🎯 ${lesson.topic}</span></div>
            <button class="start-lesson-button">${buttonLabel}</button>
        `;
        card.querySelector(".start-lesson-button").addEventListener("click", () => {
            showDemoLesson(lesson);
        });
        lessonsContainer.appendChild(card);
    });
    lessonsSection.classList.remove("hidden");
}

// ============================================
// DEMO LESSON FLOW (with Resume Support)
// ============================================

function getLessonProgress(lessonId) {
    const saved = localStorage.getItem(`lesson_${lessonId}_progress`);
    return saved ? parseInt(saved) : 0;
}

function saveLessonProgress(lessonId, progress) {
    localStorage.setItem(`lesson_${lessonId}_progress`, progress);
}

function showDemoLesson(lesson) {
    console.log("✅ showDemoLesson called with:", lesson);

    try {
        // Determine current progress
        let progress = lesson.progress !== undefined 
            ? lesson.progress 
            : getLessonProgress(lesson.id);
        
        console.log("📊 Progress:", progress);

        // Determine which segment we're on
        const segments = [
            { type: "Introduction", title: `Welcome to ${lesson.topic}`, duration: 5, concept: `Getting started with ${lesson.topic}`,
              text: `In this lesson, we'll explore the fundamentals of ${lesson.topic} and build a solid foundation. The AI teacher has personalized this content based on your current mastery level.` },
            { type: "Core Concept", title: `Deep Dive into ${lesson.topic}`, duration: 7, concept: `Understanding the mechanisms`,
              text: `Now let's examine the key mechanisms involved. This is where the real learning happens — connecting theory to practice with concrete examples tailored to your grade level.` },
            { type: "Practice", title: `Apply Your Knowledge`, duration: 3, concept: `Practice problems`,
              text: `Let's test your understanding with guided practice. The AI will evaluate your answers and provide instant feedback to help you improve.` }
        ];

        let segmentIndex;
        if (progress < 34) segmentIndex = 0;
        else if (progress < 67) segmentIndex = 1;
        else segmentIndex = 2;

        // Toast
        if (progress > 0 && progress < 100) {
            showToast(`▶️ Resuming "${lesson.title}" from ${progress}%`);
        } else if (progress === 100) {
            showToast(`🔁 Reviewing "${lesson.title}"`);
        } else {
            showToast(`📚 Loading "${lesson.title}"...`);
        }

        const generatedLesson = document.getElementById("generated-lesson");
        const lessonTitle = document.getElementById("lesson-title");
        const lessonMeta = document.getElementById("lesson-meta");
        const objectivesList = document.getElementById("objectives-list");
        const segmentsContainer = document.getElementById("segments-container");

        if (!generatedLesson || !lessonTitle || !lessonMeta || !objectivesList || !segmentsContainer) {
            console.error("❌ Missing required DOM elements!");
            showToast("❌ Missing DOM elements — check console");
            return;
        }

        lessonTitle.textContent = lesson.title;
        lessonMeta.textContent = `${lesson.subject} • ${lesson.topic} • Intermediate • 15 minutes`;

        // Remove existing banner/progress bar
        document.querySelectorAll(".resume-banner, .lesson-progress-bar").forEach(el => el.remove());

        // Build banner HTML (with inline styles to guarantee visibility)
        let bannerHtml = "";
        if (progress > 0 && progress < 100) {
            bannerHtml = `
                <div class="resume-banner" style="display:flex; align-items:center; gap:16px; padding:20px 24px; margin-bottom:24px; border-radius:16px; background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.35); border-left:4px solid #6366f1;">
                    <div style="font-size:2rem;">▶️</div>
                    <div style="flex:1;">
                        <strong style="display:block; color:#fff; font-size:1rem; margin-bottom:4px;">Resuming from where you left off</strong>
                        <p style="color:#94a3b8; font-size:0.85rem; margin:0;">You completed <strong style="color:#6366f1;">${progress}%</strong> of this lesson. Continuing from Segment ${segmentIndex + 1} of 3.</p>
                    </div>
                    <div style="font-size:1.5rem; font-weight:800; color:#6366f1; padding:8px 16px; border-radius:12px; background:rgba(99,102,241,0.12); border:1px solid rgba(99,102,241,0.25);">${progress}%</div>
                </div>
            `;
        } else if (progress === 100) {
            bannerHtml = `
                <div class="resume-banner completed" style="display:flex; align-items:center; gap:16px; padding:20px 24px; margin-bottom:24px; border-radius:16px; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.35); border-left:4px solid #10b981;">
                    <div style="font-size:2rem;">✅</div>
                    <div style="flex:1;">
                        <strong style="display:block; color:#fff; font-size:1rem; margin-bottom:4px;">Lesson Completed</strong>
                        <p style="color:#94a3b8; font-size:0.85rem; margin:0;">You've mastered this lesson. This is a review session.</p>
                    </div>
                    <div style="font-size:1.5rem; font-weight:800; color:#10b981; padding:8px 16px; border-radius:12px; background:rgba(16,185,129,0.12);">100%</div>
                </div>
            `;
        } else {
            bannerHtml = `
                <div class="resume-banner fresh" style="display:flex; align-items:center; gap:16px; padding:20px 24px; margin-bottom:24px; border-radius:16px; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); border-left:4px solid #f59e0b;">
                    <div style="font-size:2rem;">✨</div>
                    <div style="flex:1;">
                        <strong style="display:block; color:#fff; font-size:1rem; margin-bottom:4px;">Starting fresh</strong>
                        <p style="color:#94a3b8; font-size:0.85rem; margin:0;">Let's begin this lesson from the beginning. Take your time!</p>
                    </div>
                    <div style="font-size:1.5rem; font-weight:800; color:#f59e0b; padding:8px 16px; border-radius:12px; background:rgba(245,158,11,0.12);">0%</div>
                </div>
            `;
        }

        // Progress bar HTML
        const progressBarHtml = `
            <div class="lesson-progress-bar" style="display:flex; align-items:center; gap:14px; margin-bottom:24px; padding:14px 18px; background:rgba(15,23,42,0.4); border-radius:14px; border:1px solid rgba(255,255,255,0.05);">
                <div style="flex:1; height:10px; background:rgba(255,255,255,0.06); border-radius:5px; overflow:hidden;">
                    <div style="width:${progress}%; height:100%; background:linear-gradient(90deg,#6366f1,#a855f7,#ec4899); border-radius:5px; box-shadow:0 0 15px rgba(99,102,241,0.5);"></div>
                </div>
                <span style="font-size:0.85rem; color:#94a3b8; font-weight:700; white-space:nowrap;">${progress}% complete</span>
            </div>
        `;

        // Segments HTML
        let segmentsHtml = "";
        segments.forEach((seg, i) => {
            let stateBadge, stateBg, stateBorder, opacity;
            
            if (progress === 100 || i < segmentIndex) {
                stateBadge = "✓ Completed";
                stateBg = "rgba(16,185,129,0.05)";
                stateBorder = "#10b981";
                opacity = "0.75";
            } else if (i === segmentIndex && progress < 100) {
                stateBadge = "▶️ Currently here";
                stateBg = "rgba(99,102,241,0.08)";
                stateBorder = "#6366f1";
                opacity = "1";
            } else {
                stateBadge = "⏳ Not started";
                stateBg = "rgba(15,23,42,0.3)";
                stateBorder = "transparent";
                opacity = "0.55";
            }
            
            segmentsHtml += `
                <div class="segment" style="padding:20px; margin-bottom:14px; border-radius:18px; background:${stateBg}; border:1px solid rgba(255,255,255,0.06); border-left:4px solid ${stateBorder}; opacity:${opacity};">
                    <div style="display:inline-block; padding:4px 10px; border-radius:8px; font-size:0.68rem; font-weight:700; margin-bottom:10px; text-transform:uppercase; letter-spacing:0.7px; background:rgba(99,102,241,0.15); color:#a5b4fc;">${stateBadge}</div>
                    <span class="segment-type" style="display:inline-block; background:rgba(99,102,241,0.15); color:#6366f1; padding:6px 14px; border-radius:8px; font-size:0.68rem; font-weight:700; text-transform:uppercase; letter-spacing:1px;">${seg.type}</span>
                    <h3 style="margin:14px 0 10px 0; font-size:1.05rem; color:#fff;">${seg.title}</h3>
                    <p style="color:#94a3b8; line-height:1.6; font-size:0.9rem; margin-bottom:8px;"><strong style="color:#fff;">Concept:</strong> ${seg.concept}</p>
                    <p style="color:#94a3b8; line-height:1.6; font-size:0.9rem; margin-bottom:8px;">${seg.text}</p>
                    <span style="display:inline-flex; align-items:center; gap:6px; margin-top:12px; font-size:0.78rem; color:#94a3b8; padding:6px 12px; background:rgba(15,23,42,0.6); border-radius:8px; border:1px solid rgba(255,255,255,0.05);">⏱ ${seg.duration} minutes</span>
                </div>
            `;
        });

        // Set objectives
        objectivesList.innerHTML = `
            <li style="color:#94a3b8; margin-bottom:6px;">Understand the core principles of ${lesson.topic}</li>
            <li style="color:#94a3b8; margin-bottom:6px;">Apply concepts to solve real-world problems</li>
            <li style="color:#94a3b8; margin-bottom:6px;">Identify common misconceptions</li>
        `;

        // Insert banner + progress bar BEFORE the objectives list
        objectivesList.insertAdjacentHTML("beforebegin", bannerHtml + progressBarHtml);
        
        // Insert segments
        segmentsContainer.innerHTML = segmentsHtml;

        console.log("✅ Banner + progress bar + segments inserted");

        // Hide dashboard while viewing lesson
        const dashGrid = document.getElementById("dashboard-view");
        const lessonFormSect = document.getElementById("lesson-form-section");
        const heroStats = document.querySelector(".hero-stats");
        if (dashGrid) dashGrid.classList.add("hidden");
        if (lessonFormSect) lessonFormSect.classList.add("hidden");
        if (heroStats) heroStats.classList.add("hidden");

        generatedLesson.classList.remove("hidden");

        // Auto-scroll to top of lesson
        setTimeout(() => {
            const yOffset = -20;
            const y = generatedLesson.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }, 150);

        const mediaSection = document.getElementById("media-section");
        if (mediaSection) mediaSection.classList.remove("hidden");

        if (window.lucide) lucide.createIcons();

    } catch (err) {
        console.error("❌ showDemoLesson error:", err);
        showToast("❌ Error: " + err.message);
    }
}

// ============================================
// BACK TO DASHBOARD
// ============================================
function backToDashboard() {
    const dashGrid = document.getElementById("dashboard-view");
    const lessonFormSect = document.getElementById("lesson-form-section");
    const heroStats = document.querySelector(".hero-stats");
    const generatedLesson = document.getElementById("generated-lesson");
    const mediaSection = document.getElementById("media-section");
    
    if (dashGrid) dashGrid.classList.remove("hidden");
    if (lessonFormSect) lessonFormSect.classList.remove("hidden");
    if (heroStats) heroStats.classList.remove("hidden");
    if (generatedLesson) generatedLesson.classList.add("hidden");
    if (mediaSection) mediaSection.classList.add("hidden");
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("📊 Back to dashboard");
}
window.backToDashboard = backToDashboard;

// ============================================
// LESSON FORM
// ============================================
const lessonForm = document.getElementById("lesson-form");
if (lessonForm) {
    lessonForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const subject = document.getElementById("subject").value.trim();
        const topic = document.getElementById("topic").value.trim();
        const time = document.getElementById("time").value;
        const language = document.getElementById("language").value;

        if (!subject || !topic || !time) {
            showToast("⚠️ Please fill in all fields");
            return;
        }

        const generateButton = document.getElementById("generate-button");
        generateButton.disabled = true;
        generateButton.textContent = "✨ AI is generating your lesson...";

        setTimeout(() => {
            const lesson = {
                title: `AI Lesson: ${topic}`,
                subject: subject,
                topic: topic,
                duration: time,
                language: language,
                progress: 0
            };
            
            showDemoLesson(lesson);
            
            generateButton.disabled = false;
            generateButton.textContent = "✨ Generate Personalized Lesson";
            showToast(`✅ Lesson generated in ${language}!`);
            
            lessonForm.reset();
        }, 1500);
    });
}

// ============================================
// GENERATE MEDIA BUTTON
// ============================================
const generateMediaButton = document.getElementById("generate-media-button");
if (generateMediaButton) {
    generateMediaButton.addEventListener("click", function() {
        const mediaStatus = document.getElementById("media-status");
        generateMediaButton.disabled = true;
        generateMediaButton.textContent = "Generating media...";
        
        if (mediaStatus) mediaStatus.textContent = "🎨 Generating educational visual...";

        setTimeout(() => {
            if (mediaStatus) mediaStatus.textContent = "✅ Visual, audio, and video ready! (Demo mode)";
            generateMediaButton.disabled = false;
            generateMediaButton.textContent = "✨ Generate Learning Media";
            showToast("🎬 Media generated successfully!");
        }, 2000);
    });
}

// ============================================
// PAGE NAVIGATION
// ============================================
function showPage(pageName) {
    document.querySelectorAll(".page-view").forEach(p => p.classList.add("hidden"));
    const dashboardGrid = document.getElementById("dashboard-view");
    const lessonFormSection = document.getElementById("lesson-form-section");
    const heroStats = document.querySelector(".hero-stats");
    const generatedLesson = document.getElementById("generated-lesson");
    const mediaSection = document.getElementById("media-section");
    
    // Hide lesson view when navigating
    if (generatedLesson) generatedLesson.classList.add("hidden");
    if (mediaSection) mediaSection.classList.add("hidden");
    
    if (pageName === "dashboard") {
        if (dashboardGrid) dashboardGrid.classList.remove("hidden");
        if (lessonFormSection) lessonFormSection.classList.remove("hidden");
        if (heroStats) heroStats.classList.remove("hidden");
    } else {
        if (dashboardGrid) dashboardGrid.classList.add("hidden");
        if (lessonFormSection) lessonFormSection.classList.add("hidden");
        if (heroStats) heroStats.classList.add("hidden");
        
        const page = document.getElementById(`${pageName}-page`);
        if (page) page.classList.remove("hidden");
        
        if (pageName === "lessons") renderLessonsPage();
        if (pageName === "progress") renderFullProgress();
        if (pageName === "achievements") renderAchievementsPage();
    }
    
    const breadcrumb = document.querySelector(".breadcrumb");
    if (breadcrumb) {
        const label = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        breadcrumb.innerHTML = `<i data-lucide="home"></i> ${label}`;
    }
    
    if (window.lucide) lucide.createIcons();
}

// ============================================
// RENDER LESSONS PAGE
// ============================================
function renderLessonsPage() {
    const grid = document.getElementById("all-lessons-grid");
    if (!grid) return;
    grid.innerHTML = "";

    allLessons.forEach(lesson => {
        const card = document.createElement("div");
        card.className = "lesson-card";
        
        let buttonLabel = "Start Lesson →";
        if (lesson.progress === 100) buttonLabel = "Review Lesson →";
        else if (lesson.progress > 0) buttonLabel = `Continue (${lesson.progress}%) →`;
        
        card.innerHTML = `
            <span class="segment-type">${lesson.subject}</span>
            <h3 style="margin-top: 12px;">${lesson.title}</h3>
            <div class="lesson-info">
                <span>🎯 ${lesson.topic}</span>
                <span>📊 ${lesson.progress}% complete</span>
            </div>
            <div class="progress-bar" style="margin-bottom: 16px;">
                <div class="progress-fill" style="width: ${lesson.progress}%"></div>
            </div>
            <button class="start-lesson-button">${buttonLabel}</button>
        `;
        card.querySelector(".start-lesson-button").addEventListener("click", () => {
            showDemoLesson(lesson);
        });
        grid.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
}

// ============================================
// RENDER ACHIEVEMENTS PAGE
// ============================================
function renderAchievementsPage() {
    const grid = document.getElementById("achievements-grid");
    if (!grid) return;
    grid.innerHTML = "";

    allAchievements.forEach(a => {
        const card = document.createElement("div");
        card.className = `achievement-card ${a.unlocked ? "" : "locked"}`;
        card.innerHTML = `
            <div class="achievement-icon" style="background: linear-gradient(135deg, ${a.color}, ${a.color}dd);">
                <i data-lucide="${a.icon}"></i>
            </div>
            <h3>${a.title}</h3>
            <p>${a.desc}</p>
            <span class="achievement-badge ${a.unlocked ? "" : "locked-badge"}">
                ${a.unlocked ? "✓ Unlocked" : "🔒 Locked"}
            </span>
        `;
        grid.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
}

// ============================================
// RENDER FULL PROGRESS PAGE
// ============================================
function renderFullProgress() {
    const container = document.getElementById("full-progress-container");
    if (!container) return;
    container.innerHTML = "";

    mockProgress.forEach(item => {
        const card = document.createElement("div");
        card.className = "progress-card";
        card.innerHTML = `
            <div class="progress-header">
                <h3>${item.topic}</h3>
                <span class="mastery">${item.mastery_score}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${item.mastery_score}%"></div>
            </div>
            <div class="progress-details">
                <span>📘 ${item.subject || "General"}</span>
                <span>Status: ${item.status}</span>
            </div>
            <div class="progress-details">
                <span>💪 ${item.strength}</span>
                <span>📈 ${item.weakness}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// ============================================
// SIDEBAR NAVIGATION
// ============================================
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active"));
        this.classList.add("active");
        
        const page = this.getAttribute("data-page") || "dashboard";
        showPage(page);
    });
});

// ============================================
// THEME TOGGLE
// ============================================
function initTheme() {
    const saved = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    updateThemeIcon(saved);
    syncThemeSelect(saved);
}

function updateThemeIcon(theme) {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;
    toggle.innerHTML = theme === "dark" 
        ? '<i data-lucide="sun"></i>' 
        : '<i data-lucide="moon"></i>';
    if (window.lucide) lucide.createIcons();
}

function syncThemeSelect(theme) {
    const select = document.getElementById("theme-select");
    if (select) select.value = theme;
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeIcon(theme);
    syncThemeSelect(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    showToast(next === "dark" ? "🌙 Dark mode enabled" : "☀️ Light mode enabled");
}

const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
}

const themeSelect = document.getElementById("theme-select");
if (themeSelect) {
    themeSelect.addEventListener("change", function() {
        const selected = this.value;
        applyTheme(selected);
        showToast(selected === "dark" ? "🌙 Dark mode enabled" : "☀️ Light mode enabled");
    });
}

// ============================================
// ACCENT COLOR PICKER
// ============================================
function setAccent(color) {
    document.documentElement.style.setProperty('--accent', color);
    showToast(`🎨 Accent color updated`);
}
window.setAccent = setAccent;

// ============================================
// TOGGLE SWITCHES
// ============================================
document.querySelectorAll(".toggle").forEach(toggle => {
    toggle.addEventListener("click", function() {
        this.classList.toggle("on");
    });
});

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__toastTimeout);
    window.__toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================
// LOAD DASHBOARD
// ============================================
async function loadDashboard() {
    if (loading) loading.classList.add("hidden");
    if (errorBox) errorBox.classList.add("hidden");

    displayStudent(mockStudent);
    displayProgress(mockProgress);
    displayAssessments(mockAssessments);
    displayLessons(mockLessons);

    const chartCtx = document.getElementById('progressChart');
    if (chartCtx && window.Chart) {
        new Chart(chartCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Minutes Learned',
                    data: [45, 60, 30, 90, 75, 120, 85],
                    borderColor: '#6366f1',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
                        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
                        return gradient;
                    },
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#a855f7',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 10,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#94a3b8' } },
                    y: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#94a3b8' }, beginAtZero: true }
                }
            }
        });
    }

    if (window.lucide) lucide.createIcons();
}

// ============================================
// START APP
// ============================================
function startApp() {
    initTheme();
    if (authModal) authModal.style.display = "none";
    if (appLayout) appLayout.classList.remove("hidden");
    loadDashboard();
}

window.addEventListener("load", startApp);