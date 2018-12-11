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
    "url": "404.html",
    "revision": "2a0085ab28e08507b0f103a1a114c97b"
  },
  {
    "url": "about/index.html",
    "revision": "774652add1831f19fc26c0a386938052"
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
    "url": "assets/js/10.655613a3.js",
    "revision": "b30200624a5440ddc486e5a2f60b40cd"
  },
  {
    "url": "assets/js/11.b2572ea0.js",
    "revision": "bb98685030d818d5d9342a845b144856"
  },
  {
    "url": "assets/js/12.e87997d1.js",
    "revision": "0f45261b4873072e891714776a51f650"
  },
  {
    "url": "assets/js/13.ba9de7a5.js",
    "revision": "e5e77592de600e597ed743fc4cee4567"
  },
  {
    "url": "assets/js/14.42369655.js",
    "revision": "450663ac670b9251844bcbfacdd7f8ba"
  },
  {
    "url": "assets/js/15.3d194d65.js",
    "revision": "651fc5190c7dbe9ac609ac2a4894115f"
  },
  {
    "url": "assets/js/2.8ac41a9e.js",
    "revision": "4f79d8445d0fab4d21268b6256b09de5"
  },
  {
    "url": "assets/js/3.a3d400ce.js",
    "revision": "863ac852035d2f930e47471afa134190"
  },
  {
    "url": "assets/js/4.a976edf2.js",
    "revision": "3d704336ff500b9482f7b7f5983861bb"
  },
  {
    "url": "assets/js/5.9f359203.js",
    "revision": "f71a1e595584168c97f6192220791885"
  },
  {
    "url": "assets/js/6.b6556ead.js",
    "revision": "6ac40c712b2061cee3035b069680e059"
  },
  {
    "url": "assets/js/7.f831e313.js",
    "revision": "217fc1e4c289d0d81704f89675d80542"
  },
  {
    "url": "assets/js/8.f00c23ab.js",
    "revision": "2b254ed3432b50cf3add8651d082b7bc"
  },
  {
    "url": "assets/js/9.650e0059.js",
    "revision": "c6041303eab269c7b8a0b55d92510742"
  },
  {
    "url": "assets/js/app.1abb1d62.js",
    "revision": "c42aad573a5a3aa9f2caccf89e16e4b0"
  },
  {
    "url": "docker/Docker基本操作.html",
    "revision": "f27018438957ba7158d1e1e4bee3f4d3"
  },
  {
    "url": "docker/index.html",
    "revision": "4b4e50b57e9774c4e83a98530869c564"
  },
  {
    "url": "dubbo/Dubbo的一个demo.html",
    "revision": "363fec428597ffec10d29174f8d96ed2"
  },
  {
    "url": "dubbo/index.html",
    "revision": "f522facda86cbf55b1a084a03a25cf2a"
  },
  {
    "url": "dubbo/四种负载均衡.html",
    "revision": "ef9c8eb967a26a032e40c16b45830344"
  },
  {
    "url": "index.html",
    "revision": "212a104b134e6ead7bde044f238bed36"
  },
  {
    "url": "java/index.html",
    "revision": "7f9385d398a045a1959acd69071b66c8"
  },
  {
    "url": "java/Java枚举类.html",
    "revision": "27fa64a73002409e4f4421172e88ceff"
  },
  {
    "url": "leetCode/1.html",
    "revision": "9651d6a79076a0c88f1ff2e89ee8a46e"
  },
  {
    "url": "leetCode/2.html",
    "revision": "8e9d714a87a22c29bee77eeaffd02be2"
  },
  {
    "url": "leetCode/index.html",
    "revision": "e5dea6609789878020d16d9230d4d6e9"
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
