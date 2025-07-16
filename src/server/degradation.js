export const renderDegraded = () => {
  return `
    <html>
      <head>
        <title>Loading...</title>
        <meta charset="utf-8">
      </head>
      <body>
        <div id="root">
          <div style="text-align: center; padding: 50px;">
            <h2>Loading...</h2>
          </div>
        </div>
        <!-- 降级模式标记 -->
        <script>
          window.__DEGRADED_MODE__ = true;
        </script>
        <script src="./index.js"></script>
      </body>
    </html>
  `;
}; 