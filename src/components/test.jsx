import React, { useEffect } from "react";

function AAA() {
  // یہ function HTML ڈاؤنلوڈ کرواتا ہے
  const downloadPage = () => {
    const html = document.documentElement.outerHTML;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "my-page.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  // جب page reload ہو تو ایک بار ڈاؤنلوڈ trigger ہو
  useEffect(() => {
    // چیک کریں کہ reload ہوا ہے یا پہلی بار
    if (performance.navigation.type === 1) {
      // reload detected
      downloadPage();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center">
      <h1 className="text-4xl font-bold mb-6">🚀 React + Tailwind Test Page</h1>
      <p className="mb-4 text-lg">یہ ایک dummy page ہے، reload کرنے پر HTML save ہو جائے گی۔</p>
      <button
        // onClick={downloadPage}
        className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition"
      >
        Save Manually
      </button>
    </div>
  );
}

// export default AAA;
// import React, { useEffect } from "react";

// function AAA() {
//   // ✅ HTML ڈاؤنلوڈ کرنے والا فنکشن
//   const downloadPage = () => {
//     const html = document.documentElement.outerHTML;
//     const blob = new Blob([html], { type: "text/html" });
//     const url = URL.createObjectURL(blob);

//     // Create <a> element
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "my-page.html";

//     // ✅ body میں add کریں تاکہ browser اسے "trusted" سمجھے
//     document.body.appendChild(a);
//     a.click();

//     // تھوڑا delay دے کر revoke کریں تاکہ فائل properly save ہو
//     setTimeout(() => {
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     }, 100);
//   };

//   // ✅ Reload detection
//   useEffect(() => {
//     if (performance.navigation.type === 1) {
//       // اگر page reload ہوا ہے تو auto download
//       downloadPage();
//     }
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-center">
//       <h1 className="text-4xl font-bold mb-6">⚡ React + Tailwind Test Page</h1>
//       <p className="mb-4 text-lg">
//         یہ ایک dummy React صفحہ ہے۔ Reload پر خودکار save ہوتا ہے،
//         یا manually بٹن سے save کرو ↓
//       </p>

//       <button
//         onClick={downloadPage}
//         className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition"
//       >
//         💾 Save Manually
//       </button>
//     </div>
//   );
// }

// export default AAA;


// import React, { useEffect, useState } from "react";

// const MESSAGES = {
//   en: {
//     greeting: "Welcome to our site!",
//     body: "This is a demo page in English.",
//     chooseText: "Choose language:",
//     arabic: "Arabic",
//     english: "English",
//   },
//   ar: {
//     greeting: "مرحبًا بكم في موقعنا!",
//     body: "هذه صفحة تجريبية باللغة العربية.",
//     chooseText: "اختر اللغة:",
//     arabic: "العربية",
//     english: "الإنجليزية",
//   },
// };

// const LANG_KEY = "preferred_lang";

// export default function AAA() {
//   const [lang, setLang] = useState(() => {
//     // check localStorage first
//     if (typeof window !== "undefined") {
//       return localStorage.getItem(LANG_KEY) || null;
//     }
//     return null;
//   });
//   const [showBanner, setShowBanner] = useState(false);

//   // apply lang + dir on document root
//   useEffect(() => {
//     const chosen = lang;
//     if (chosen) {
//       document.documentElement.lang = chosen === "ar" ? "ar" : "en";
//       document.documentElement.dir = chosen === "ar" ? "rtl" : "ltr";
//     }
//   }, [lang]);

//   // on mount: if no saved language, show banner
//   useEffect(() => {
//     if (!lang) {
//       setShowBanner(true);
//     } else {
//       setShowBanner(false);
//     }
//   }, [lang]);

//   const chooseLanguage = (code) => {
//     localStorage.setItem(LANG_KEY, code);
//     setLang(code);
//     setShowBanner(false);
//   };

//   // convenience: message object for current lang (fallback to en)
//   const t = MESSAGES[lang || "en"];

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors">
//       {/* Top banner / popup */}
//       {showBanner && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[min(980px,96%)]">
//           <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-md border border-gray-200 overflow-hidden">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4">
//               <div className="text-sm sm:text-base">
//                 <span className="font-medium mr-2">{/* label */}</span>
//                 <span className="text-gray-700">
//                   {/* multilingual label in both langs so user understands */}
//                   Choose language — اختر اللغة — زبان منتخب کریں
//                 </span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => chooseLanguage("ar")}
//                   className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//                 >
//                   العربية
//                 </button>
//                 <button
//                   onClick={() => chooseLanguage("en")}
//                   className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
//                 >
//                   English
//                 </button>
//                 <button
//                   onClick={() => setShowBanner(false)}
//                   title="Close"
//                   className="ml-2 text-gray-400 hover:text-gray-600 p-2"
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Page content */}
//       <main className="max-w-3xl mx-auto py-20 px-4">
//         <div className="p-8 bg-white rounded-lg shadow">
//           <h1 className="text-2xl font-bold mb-4">{t.greeting}</h1>
//           <p className="mb-6">{t.body}</p>

//           <div className="flex gap-2">
//             <button
//               onClick={() => chooseLanguage("en")}
//               className={`px-4 py-2 rounded ${lang === "en" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
//             >
//               English
//             </button>
//             <button
//               onClick={() => chooseLanguage("ar")}
//               className={`px-4 py-2 rounded ${lang === "ar" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
//             >
//               العربية
//             </button>

//             <button
//               onClick={() => {
//                 localStorage.removeItem(LANG_KEY);
//                 setLang(null);
//                 setShowBanner(true);
//               }}
//               className="px-4 py-2 rounded bg-red-50 text-red-600 ml-auto"
//             >
//               Change language
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
