// ===== Sup Ai - روابط التحميل + تأثير الضغط =====
// غير الروابط هنا بس، ما تغير أي شي تاني

// 1. رابط قوقل بلاي - حط رابطك الحقيقي هنا
const PLAY_LINK = "https://play.google.com/store/apps/details?id=com.supai.app";

// 2. رابط الـ APK - لو رافع الملف جنب الملفات، اكتب اسمو بس
// مثال: "SupAi.apk"
// لو رافعو في درايف، حط رابط الدرايف هنا
const APK_LINK = "SupAi.apk";

// ===== من هنا وتحت، الكود بيشتغل براهو، ما تغير شي =====

const playBtn = document.getElementById("playBtn");
const siteBtn = document.getElementById("siteBtn");

// ربط الزر الأسود بقوقل بلاي - يفتح في صفحة جديدة
if (playBtn) {
  playBtn.href = PLAY_LINK;
  playBtn.target = "_blank";
  playBtn.rel = "noopener";
}

// ربط الزر الأبيض بالـ APK - يحمل طوالي
if (siteBtn) {
  siteBtn.href = APK_LINK;
  siteBtn.setAttribute("download", "");
}

// تأثير الضغط - زي تطبيقات التلفون
const allBtns = document.querySelectorAll(".btn");

allBtns.forEach((btn) => {
  const press = () => { btn.style.transform = "scale(0.96)"; };
  const release = () => { btn.style.transform = "scale(1)"; };

  btn.addEventListener("touchstart", press, { passive: true });
  btn.addEventListener("touchend", release);
  btn.addEventListener("touchcancel", release);
  btn.addEventListener("mousedown", press);
  btn.addEventListener("mouseup", release);
  btn.addEventListener("mouseleave", release);
});