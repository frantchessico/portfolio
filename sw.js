
// 'use strict';





// /* eslint-disable quotes, comma-spacing */
// let PrecacheConfig = [["/bower_components/webcomponentsjs/webcomponents-lite.min.js","f04ed23700daeb36f637bfe095960659"],["/index.html","6018d0295f8faf690e2878af152ecbbc"],["/manifest.json","2eefc15db4b58758cddc0d666e27d399"],["/src/my-app.html","7e5dee7784534c0ccc50f8ec71bccd3f"],["/src/my-view1.html","4ccb8d9cd5b87a92973cc7704873b65f"],["/src/my-view2.html","7e00f1613408e109e6d26853846c8467"],["/src/my-view3.html","1971572d82bd5c7e058dce75bdd068df"],["/src/my-view404.html","858fecebfa5de274e8d3f7ba905d599e"]];
// /* eslint-enable quotes, comma-spacing */
// let CacheNamePrefix = 'sw-precache-v1--' + (self.registration ? self.registration.scope : '') + '-';


// let IgnoreUrlParametersMatching = [/^utm_/];



// let addDirectoryIndex = function (originalUrl, index) {
//     let url = new URL(originalUrl);
//     if (url.pathname.slice(-1) === '/') {
//       url.pathname += index;
//     }
//     return url.toString();
//   };

// let getCacheBustedUrl = function (url, param) {
//     param = param || Date.now();

//     let urlWithCacheBusting = new URL(url);
//     urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
//       'sw-precache=' + param;

//     return urlWithCacheBusting.toString();
//   };

// let isPathWhitelisted = function (whitelist, absoluteUrlString) {
//     // If the whitelist is empty, then consider all URLs to be whitelisted.
//     if (whitelist.length === 0) {
//       return true;
//     }

//     // Otherwise compare each path regex to the path of the URL passed in.
//     let path = (new URL(absoluteUrlString)).pathname;
//     return whitelist.some(function(whitelistedPathRegex) {
//       return path.match(whitelistedPathRegex);
//     });
//   };

// let populateCurrentCacheNames = function (precacheConfig,
//     cacheNamePrefix, baseUrl) {
//     let absoluteUrlToCacheName = {};
//     let currentCacheNamesToAbsoluteUrl = {};

//     precacheConfig.forEach(function(cacheOption) {
//       let absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
//       let cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
//       currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
//       absoluteUrlToCacheName[absoluteUrl] = cacheName;
//     });

//     return {
//       absoluteUrlToCacheName: absoluteUrlToCacheName,
//       currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
//     };
//   };

// let stripIgnoredUrlParameters = function (originalUrl,
//     ignoreUrlParametersMatching) {
//     let url = new URL(originalUrl);

//     url.search = url.search.slice(1) // Exclude initial '?'
//       .split('&') // Split into an array of 'key=value' strings
//       .map(function(kv) {
//         return kv.split('='); // Split each 'key=value' string into a [key, value] array
//       })
//       .filter(function(kv) {
//         return ignoreUrlParametersMatching.every(function(ignoredRegex) {
//           return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
//         });
//       })
//       .map(function(kv) {
//         return kv.join('='); // Join each [key, value] array into a 'key=value' string
//       })
//       .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

//     return url.toString();
//   };


// let mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
// let AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
// let CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

// function deleteAllCaches() {
//   return caches.keys().then(function(cacheNames) {
//     return Promise.all(
//       cacheNames.map(function(cacheName) {
//         return caches.delete(cacheName);
//       })
//     );
//   });
// }

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     // Take a look at each of the cache names we expect for this version.
//     Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
//       return caches.open(cacheName).then(function(cache) {
//         // Get a list of all the entries in the specific named cache.
//         // For caches that are already populated for a given version of a
//         // resource, there should be 1 entry.
//         return cache.keys().then(function(keys) {
//           // If there are 0 entries, either because this is a brand new version
//           // of a resource or because the install step was interrupted the
//           // last time it ran, then we need to populate the cache.
//           if (keys.length === 0) {
//             // Use the last bit of the cache name, which contains the hash,
//             // as the cache-busting parameter.
//             // See https://github.com/GoogleChrome/sw-precache/issues/100
//             let cacheBustParam = cacheName.split('-').pop();
//             let urlWithCacheBusting = getCacheBustedUrl(
//               CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

//             let request = new Request(urlWithCacheBusting,
//               {credentials: 'same-origin'});
//             return fetch(request).then(function(response) {
//               if (response.ok) {
//                 return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
//                   response);
//               }

//               console.error('Request for %s returned a response status %d, ' +
//                 'so not attempting to cache it.',
//                 urlWithCacheBusting, response.status);
//               // Get rid of the empty cache if we can't add a successful response to it.
//               return caches.delete(cacheName);
//             });
//           }
//         });
//       });
//     })).then(function() {
//       return caches.keys().then(function(allCacheNames) {
//         return Promise.all(allCacheNames.filter(function(cacheName) {
//           return cacheName.indexOf(CacheNamePrefix) === 0 &&
//             !(cacheName in CurrentCacheNamesToAbsoluteUrl);
//           }).map(function(cacheName) {
//             return caches.delete(cacheName);
//           })
//         );
//       });
//     }).then(function() {
//       if (typeof self.skipWaiting === 'function') {
//         // Force the SW to transition from installing -> active state
//         self.skipWaiting();
//       }
//     })
//   );
// });

// if (self.clients && (typeof self.clients.claim === 'function')) {
//   self.addEventListener('activate', function(event) {
//     event.waitUntil(self.clients.claim());
//   });
// }

// self.addEventListener('message', function(event) {
//   if (event.data.command === 'delete_all') {
//     console.log('About to delete all caches...');
//     deleteAllCaches().then(function() {
//       console.log('Caches deleted.');
//       event.ports[0].postMessage({
//         error: null
//       });
//     }).catch(function(error) {
//       console.log('Caches not deleted:', error);
//       event.ports[0].postMessage({
//         error: error
//       });
//     });
//   }
// });


// self.addEventListener('fetch', function(event) {
//   if (event.request.method === 'GET') {
//     let urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
//       IgnoreUrlParametersMatching);

//     let cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
//     let directoryIndex = 'index.html';
//     if (!cacheName && directoryIndex) {
//       urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
//       cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
//     }

//     let navigateFallback = '/index.html';
//     // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
//     // supported yet:
//     // https://code.google.com/p/chromium/issues/detail?id=540967
//     // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
//     if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
//         event.request.headers.get('accept').includes('text/html') &&
//         /* eslint-disable quotes, comma-spacing */
//         isPathWhitelisted([], event.request.url)) {
//         /* eslint-enable quotes, comma-spacing */
//       let navigateFallbackUrl = new URL(navigateFallback, self.location);
//       cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
//     }

//     if (cacheName) {
//       event.respondWith(
//         // Rely on the fact that each cache we manage should only have one entry, and return that.
//         caches.open(cacheName).then(function(cache) {
//           return cache.keys().then(function(keys) {
//             return cache.match(keys[0]).then(function(response) {
//               if (response) {
//                 return response;
//               }
//               // If for some reason the response was deleted from the cache,
//               // raise and exception and fall back to the fetch() triggered in the catch().
//               throw Error('The cache ' + cacheName + ' is empty.');
//             });
//           });
//         }).catch(function(e) {
//           console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
//           return fetch(event.request);
//         })
//       );
//     }
//   }
// });



