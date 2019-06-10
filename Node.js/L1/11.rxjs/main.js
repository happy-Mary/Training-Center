const cheerio = require('cheerio');
const fetch = require('node-fetch');
const flatCache = require('flat-cache');
const Rx = require('rxjs/Rx');
const cache = flatCache.load('lossless24-cache');

//flatCache.clearAll();

let obs = Rx.Observable
    .range(1, 100)
    .map(i => ({
        categoryPageIndex: i,
        categoryPageUrl: 'http://lossless24.com/category/jazz/page/' + i
    }))
    .mergeMap((ctx) => {
        var cachedCategoryPageBody = cache.getKey(ctx.categoryPageUrl);
        ctx.categoryPageBodyPromise = cachedCategoryPageBody ? Promise.resolve(cachedCategoryPageBody) : fetch(ctx.categoryPageUrl).then(res => res.text());
        return Rx.Observable.of(ctx);
    }, null, 4)
    .mergeMap((ctx) => ctx.categoryPageBodyPromise.then((categoryPageBody) => {
        if (categoryPageBody) {
            cache.setKey(ctx.categoryPageUrl, categoryPageBody);
        }
        ctx.categoryPageBody = categoryPageBody;
        return ctx;
    }), null, 4)
    .map((ctx) =>
        Rx.Observable
            .from(cheerio.load(ctx.categoryPageBody)('.entry-header .entry-title a'))
            .map(($categoryPage) => Object.assign({}, ctx, {
                albumPageUrl: $categoryPage.attribs.href.trim()
            }))
    )
    .mergeAll()
    .mergeMap((ctx) => {
        var cachedAlbumPageBody = cache.getKey(ctx.albumPageUrl);
        ctx.albumPageBodyPromise = cachedAlbumPageBody ? Promise.resolve(cachedAlbumPageBody) : fetch(ctx.albumPageUrl).then(res => res.text());
        return Rx.Observable.of(ctx);
    }, null, 4)
    .mergeMap((ctx) => ctx.albumPageBodyPromise.then((albumPageBody) => {
        let downloadUrl = cheerio.load(albumPageBody)('.entry_link a').attr('href');
        if (downloadUrl) {
            cache.setKey(ctx.albumPageUrl, albumPageBody);
            ctx.albumDownloadUrl = downloadUrl.trim();
        }

        return ctx;
    }))
    .reduce((acc, ctx) => {
        if (acc[ctx.albumDownloadUrl]) {
            acc[ctx.albumDownloadUrl] += 1;
        } else {
            acc[ctx.albumDownloadUrl] = 1;
        }

        return acc;
    }, {});


obs.subscribe(
    console.log,
    (err) => console.error(err),
    () => {
        cache.save();
        console.log('Done!');
    });




// let obs = Rx.Observable
//     .range(1, 100)
//     .map(i => ({
//         categoryPageIndex: i,
//         baseCategoryPageUrl: 'http://lossless24.com/category/jazz/page/'
//     }))
//     //.do(val => console.log(`Index: ${val.categoryPageIndex}`))
//     .mergeMap((ctx) => {
//             ctx.categoryPageUrl = ctx.baseCategoryPageUrl + ctx.categoryPageIndex;
//             return fetch(ctx.categoryPageUrl).then(res => res.text()).then((categoryPageBody) => {
//                 ctx.categoryPageBody = categoryPageBody;
//                 return ctx;
//             });
//         },
//         null,
//         4)
//     //.do(val => console.log(`Category page: ${val.categoryPageUrl}`))
//     .map((ctx) =>
//         Rx.Observable
//             .from(cheerio.load(ctx.categoryPageBody)('.entry-header .entry-title a'))
//             .map(($categoryPage) => ({
//                 categoryPageIndex: ctx.categoryPageIndex,
//                 baseCategoryPageUrl: ctx.baseCategoryPageUrl,
//                 categoryPageUrl: ctx.categoryPageUrl,
//                 albumPageUrl: $categoryPage.attribs.href.trim()
//             }))
//     )
//     .mergeAll()
//     .mergeMap((ctx) => fetch(ctx.albumPageUrl).then(res => res.text()).then((albumPageBody) => {
//         let downloadUrl = cheerio.load(albumPageBody)('.entry_link a').attr('href');
//         if (downloadUrl) {
//             ctx.albumDownloadUrl = downloadUrl.trim();
//         } else {
//             throw ctx;
//         }
//
//         return ctx;
//     }));
//
// obs.subscribe(console.log, (err) => {
//     console.error(err);
// });




// let obs = Rx.Observable
//     .interval(200)
//     .map(x => x + 1)
//     .take(100)
//     .mergeMap((categoryPageIndex) => fetch('http://lossless24.com/category/jazz/page/' + categoryPageIndex).then(res => res.text()))
//     .map((categoryPageBody) => Rx.Observable.from(cheerio.load(categoryPageBody)('.entry-header .entry-title a')))
//     .mergeAll(2)
//     .map(($categoryPage) => $categoryPage.attribs.href.trim())
//     .mergeMap((albumPageUrl) => fetch(albumPageUrl).then(res => res.text()))
//     .map((albumPageBody) => cheerio.load(albumPageBody)('.entry_link a').attr('href'));
//
// obs.subscribe(console.log);




// var higherOrder = Rx.Observable.create(function(observer) {
//     observer.next(Rx.Observable.create(function(observer1) {
//         observer1.next(Rx.Observable.create(function(observer11) {
//             observer11.next('1.1');
//             observer11.next('1.2');
//         }));
//         observer1.next('2');
//     }).mergeAll());
//
//     observer.next(Rx.Observable.create(function(observer2) {
//         observer2.next('3');
//         observer2.next('4');
//     }));
// });
//
// var firstOrder = higherOrder.mergeAll(2);
//
// firstOrder.subscribe(x => console.log(x));





// let albumsStream = Rx.Observable.create(function(observer) {
//     fetch('http://lossless24.com/category/jazz/page/2/')
//         .then(res => res.text())
//         .then(function (body) {
//             var $ = cheerio.load(body);
//             $('.entry-header .entry-title a').each((i, el) => {
//                 observer.next(el.attribs.href);
//             });
//         }).catch((err) => console.error(err));
// });
//
// albumsStream.subscribe((album) => {
//    console.log(album);
// });