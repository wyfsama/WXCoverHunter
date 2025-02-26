// 微信公众号文章封面图片获取
if (window.location.host.includes('weixin.qq.com')) {
  const coverImage = document.querySelector('meta[property="og:image"]');
  if (coverImage) {
    console.log('微信公众号封面图片URL:', coverImage.content);
  } else {
    console.error('未找到微信公众号封面图片');
  }
} 