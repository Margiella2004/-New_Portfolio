import { projectsData } from './data/projectsData'
import { projects } from './data/projectsList'

const localImages = import.meta.glob('../img_assets/**/*.{png,jpg,jpeg,svg,webp,gif}', {
  eager: true,
  import: 'default',
})

const localMedia = import.meta.glob('../movies_for_portfolio/**/*.{mp4,webm,ogv,mov,gif}', {
  eager: true,
  import: 'default',
})

const srcAssets = import.meta.glob('./assets/**/*.{png,jpg,jpeg,svg,webp,gif}', {
  eager: true,
  import: 'default',
})

const collectRemoteUrls = (value, urls) => {
  if (!value) return
  if (Array.isArray(value)) {
    value.forEach((item) => collectRemoteUrls(item, urls))
    return
  }
  if (typeof value === 'object') {
    Object.values(value).forEach((item) => collectRemoteUrls(item, urls))
    return
  }
  if (typeof value === 'string' && value.startsWith('http')) {
    urls.add(value)
  }
}

const getAssetUrls = () => {
  const urls = new Set()
  Object.values(localImages).forEach((src) => urls.add(src))
  Object.values(localMedia).forEach((src) => urls.add(src))
  Object.values(srcAssets).forEach((src) => urls.add(src))
  collectRemoteUrls(projectsData, urls)
  collectRemoteUrls(projects, urls)
  return Array.from(urls)
}

const isVideo = (src) =>
  /\.(mp4|webm|ogv|mov)(\?|#|$)/i.test(src)

const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(src)
    img.onerror = () => resolve(src)
    img.src = src
  })

const preloadVideo = (src) =>
  new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.onloadeddata = () => resolve(src)
    video.onerror = () => resolve(src)
    video.src = src
    video.load()
  })

export const preloadAssets = () => {
  if (typeof window === 'undefined') return Promise.resolve([])
  const assets = getAssetUrls()
  return Promise.all(
    assets.map((src) => (isVideo(src) ? preloadVideo(src) : preloadImage(src)))
  )
}
