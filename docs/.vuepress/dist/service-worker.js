/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "1.jpg",
    "revision": "a85334d6facf88b14fbea27e37c8f8c1"
  },
  {
    "url": "404.html",
    "revision": "87502fea55e964c941ddd33e07286e6b"
  },
  {
    "url": "assets/css/0.styles.01e0b4b8.css",
    "revision": "860db78631b5ae76401ba5d52e32427f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.061b3904.js",
    "revision": "a7a88c4d75437d7cdb8eaa1367668d72"
  },
  {
    "url": "assets/js/3.e3640347.js",
    "revision": "1e3cbb62b000aa0a09ee259458217e4b"
  },
  {
    "url": "assets/js/4.7f64594c.js",
    "revision": "1c96f87b8a1d5ef31de3115f99d748c1"
  },
  {
    "url": "assets/js/5.53dddd2b.js",
    "revision": "d323a82c3605cca92eb220bef07753a5"
  },
  {
    "url": "assets/js/6.1d901ace.js",
    "revision": "ba65e4aa87b0108baccf80a2da44a670"
  },
  {
    "url": "assets/js/7.61fe6d19.js",
    "revision": "86bded93d16186fea6277561e0d71f87"
  },
  {
    "url": "assets/js/8.28b627c0.js",
    "revision": "55d7d2e82a5f9dca8ebfced5317bae02"
  },
  {
    "url": "assets/js/app.460279ee.js",
    "revision": "c170f4b9d9aef9ef93b8043c9204239d"
  },
  {
    "url": "index.html",
    "revision": "70fa122efaa6fda407d32c396a601557"
  },
  {
    "url": "java/index.html",
    "revision": "92723e7bc8ffd3e0a3f7df0682fee815"
  },
  {
    "url": "java/Java枚举类.html",
    "revision": "a1839d272ea61bbb295caaa39a22b9a0"
  },
  {
    "url": "leetCode/1.html",
    "revision": "0b664387b7334c5e5a2bd31cbb6d9f9d"
  },
  {
    "url": "leetCode/index.html",
    "revision": "05d18398c161fce2d527c6d284008391"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
