// ==========================================
// 1. كود صفحة تسجيل الدخول (login.html)
// ==========================================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  // إظهار وإخفاء كلمة المرور
  const togglePasswordBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordBtn.textContent = "🙈";
      } else {
        passwordInput.type = "password";
        togglePasswordBtn.textContent = "👁️";
      }
    });
  }

  // التحقق من بيانات الدخول
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    if (usernameError) usernameError.textContent = "";
    if (passwordError) passwordError.textContent = "";

    if (username === "") {
      if (usernameError)
        usernameError.textContent = "الرجاء إدخال اسم المستخدم";
      isValid = false;
    }

    if (password.length < 6) {
      if (passwordError)
        passwordError.textContent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
      isValid = false;
    }

    if (isValid) {
      window.location.href = "services.html";
    }
  });
}

// ==========================================
// 2. كود صفحة إنشاء حساب جديد (register.html)
// ==========================================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    //event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("gmail").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // التحقق من أن كل الحقول مليانة
    if (name === "" || email === "" || password === "") {
      regError.textContent = "الرجاء ملء جميع الحقول المطلوبة";
      return;
    }

    // التحقق من تطابق كلمتي المرور
    if (password !== confirmPassword) {
      regError.textContent = "كلمتا المرور غير متطابقتين!";
      return;
    }

    if (password.length < 6) {
      regError.textContent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
      return;
    }

    // إذا كل شيء سليم، نعرض رسالة نجاح وننتقل لتسجيل الدخول
    alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
    window.location.href = "login.html";
  });
}

// ==========================================
// 3. كود صفحة الخدمات والوظائف (services.html)
// ==========================================
const jobsContainer = document.getElementById("jobsContainer");

if (jobsContainer) {
  // قاعدة البيانات الوهمية
  const jobsData = [
    {
      id: 1,
      title: "مطور واجهات أمامية",
      company: "شركة التقنية الحديثة",
      location: "الرياض",
      type: "دوام كامل",
    },
    {
      id: 2,
      title: "مصمم جرافيك",
      company: "استوديو الإبداع",
      location: "جدة",
      type: "دوام جزئي",
    },
    {
      id: 3,
      title: "محاسب مالي",
      company: "مجموعة الأعمال",
      location: "الخرطوم",
      type: "دوام كامل",
    },
    {
      id: 4,
      title: "مسؤول تسويق إلكتروني",
      company: "منصة نمو",
      location: "عن بُعد",
      type: "عمل حر",
    },
    {
      id: 5,
      title: "مهندس شبكات",
      company: "حلول الاتصالات",
      location: "الرياض",
      type: "دوام كامل",
    },
    {
      id: 6,
      title: "مترجم لغة إنجليزية",
      company: "مكتب الترجمة",
      location: "عن بُعد",
      type: "عمل حر",
    },
  ];

  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");

  // نظام المفضلة
  let savedJobs = JSON.parse(localStorage.getItem("mySavedJobs")) || [];

  // دالة العرض
  window.displayJobs = function (jobs) {
    jobsContainer.innerHTML = "";

    if (jobs.length === 0) {
      jobsContainer.innerHTML =
        '<p class="no-results">لا توجد وظائف تطابق بحثك.</p>';
      return;
    }

    jobs.forEach((job) => {
      const isSaved = savedJobs.includes(job.id);
      const heartIcon = isSaved ? "❤️" : "🤍";

      const jobCard = `
                <div class="job-card">
                    <div class="card-header">
                        <h3>${job.title}</h3>
                        <button class="save-btn" onclick="toggleSave(${job.id})">${heartIcon}</button>
                    </div>
                    <p class="company-name">🏢 ${job.company}</p>
                    <p class="location">📍 ${job.location}</p>
                    <span class="job-type">${job.type}</span>
                    <button class="btn-primary btn-apply" onclick="applyForJob('${job.title}')">قدم الآن</button>
                </div>
            `;
      jobsContainer.innerHTML += jobCard;
    });
  };

  // دالة الفلترة
  window.filterJobs = function () {
    const searchText = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;

    const filtered = jobsData.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.location.toLowerCase().includes(searchText);
      const matchesType = selectedType === "all" || job.type === selectedType;
      return matchesSearch && matchesType;
    });

    displayJobs(filtered);
  };

  // دالة المفضلة
  window.toggleSave = function (jobId) {
    if (savedJobs.includes(jobId)) {
      savedJobs = savedJobs.filter((id) => id !== jobId);
    } else {
      savedJobs.push(jobId);
    }
    localStorage.setItem("mySavedJobs", JSON.stringify(savedJobs));
    filterJobs();
  };

  // دالة التقديم
  window.applyForJob = function (jobTitle) {
    alert(`تم إرسال طلبك بنجاح لوظيفة: ${jobTitle}`);
  };

  // ربط الأحداث
  if (searchInput) searchInput.addEventListener("input", filterJobs);
  if (typeFilter) typeFilter.addEventListener("change", filterJobs);

  // التشغيل الأول
  filterJobs();
}
