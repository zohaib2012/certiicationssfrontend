import React, { useEffect } from "react";

export function AAA() {
  const downloadPage = () => {
    // پوری body کا clone لو
    const cloned = document.body.cloneNode(true);

    // React یا Vite کے JS scripts ہٹا دو
    cloned.querySelectorAll("script").forEach((s) => s.remove());

    // Head کا minimal structure دو
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ur">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Saved Snapshot</title>
          <style>
            body { font-family: sans-serif; }
          </style>
        </head>
        <body>
          ${cloned.innerHTML}
        </body>
      </html>
    `;

    // Blob بنا کر download trigger کرو
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "snapshot.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (performance.navigation.type === 1) {
      // صرف reload پر snapshot download کرو
      setTimeout(downloadPage, 1000); // تھوڑا delay تاکہ React render ہو جائے
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center">
      <h1 className="text-4xl font-bold mb-6">🚀 React + Tailwind Test Page</h1>
      <p className="mb-4 text-lg">یہ ایک dummy page ہے، reload کرنے پر HTML save ہو جائے گی۔</p>
      <button
        onClick={downloadPage}
        className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition"
      >
        Save Manually
      </button>
    </div>
  );
}
