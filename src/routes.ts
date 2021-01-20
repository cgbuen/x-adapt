import { CACHE_ASSETS } from './cache';
import { Router } from '@xdn/core/router'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'
import initializePage from './initializePage'

export default new Router()
  .get('/', ({ proxy }) => {
    proxy('origin', {
      transformResponse: (res, req) => {
        initializePage({ res, req, page: 'home' })
      }
    })
  })
  .get('/adapt-main.css', ({ serveStatic }) => {
    serveStatic('dist/assets-css.css')
  })
  .get('/adapt-main.js', ({ serveStatic }) => {
    serveStatic('dist/assets-js.js')
  })
  .get('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('dist/service-worker.js')
  })
  // example routes for cacheable pages:
  .get('/collections/:path*', shoppingFlowRouteHandler)
  .get('/products/:path*', shoppingFlowRouteHandler)
  // example route for cacheable assets:
  .match('/images/:path*', ({ cache, proxy }) => {
    cache(CACHE_ASSETS)
    return proxy('origin')
  })
  // fallback route for all other requests:
  .fallback(({ proxy }) => {
    proxy('origin', {
      transformResponse: (res, req) => {
        console.log('@@@@ removing/deleting headers from transformResponse')
        res.removeHeader && res.removeHeader('content-security-policy')
      }
    })
  })
