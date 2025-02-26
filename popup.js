document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length === 0) {
      console.error("未找到活动标签页");
      return;
    }
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: getCoverImage,
      },
      (results) => {
        if (chrome.runtime.lastError) {
          console.error("脚本执行错误:", chrome.runtime.lastError);
          return;
        }
        if (results && results[0]) {
          const coverImageUrl = results[0].result;

          const coverImageElement = document.getElementById("coverImage");
          coverImageElement.src = coverImageUrl;

          const downloadButton = document.getElementById("downloadButton");
          downloadButton.addEventListener("click", function () {
            if (coverImageUrl) {
              try {
                chrome.downloads.download(
                  {
                    url: coverImageUrl,
                    filename: `cover-image-${Date.now()}.jpg`,
                    saveAs: true,
                  },
                  (downloadId) => {
                    if (chrome.runtime.lastError) {
                      console.error("下载错误：", chrome.runtime.lastError);
                    }
                  }
                );
              } catch (error) {
                console.error("下载错误：", error);
              }
            } else {
              console.error("错误：封面图片URL无效");
            }
          });
        } else {
          console.error("未能获取封面图片");
        }
      }
    );
  });
});

function getCoverImage() {
  const coverImage = document.querySelector('meta[property="og:image"]');
  return coverImage ? coverImage.content : "";
}
