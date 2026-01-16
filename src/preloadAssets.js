import { projectsData } from './data/projectsData'
import { projects } from './data/projectsList'
import designEngineerSvg from '/Design Engineer.svg'
import designEngineerMobileSvg from '/Design Engineer_Mobile.svg'
import linkArrowImage from '../Svg/material-symbols-light_arrow-back.svg'

const localImages = import.meta.glob('../img_assets/**/*.{png,jpg,jpeg,svg,webp,gif}', {
  import: 'default',
})

const localMedia = import.meta.glob('../movies_for_portfolio/**/*.{mp4,webm,ogv,mov,gif}', {
  import: 'default',
})

const srcAssets = import.meta.glob('./assets/**/*.{png,jpg,jpeg,svg,webp,gif}', {
  import: 'default',
})

const criticalAssets = [designEngineerSvg, designEngineerMobileSvg, linkArrowImage]

const loadGlobAssets = async (glob, urls) => {
  const modules = await Promise.all(Object.values(glob).map((loader) => loader()))
  modules.forEach((src) => urls.add(src))
}

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

const getAssetUrls = async ({
  includeAll = false,
  includeMedia = false,
  includeRemote = false,
} = {}) => {
  const urls = new Set()
  criticalAssets.forEach((src) => urls.add(src))

  if (includeAll || includeMedia) {
    await loadGlobAssets(localImages, urls)
  }

  if (includeAll) {
    await Promise.all([loadGlobAssets(localMedia, urls), loadGlobAssets(srcAssets, urls)])
  } else if (includeMedia) {
    await loadGlobAssets(localMedia, urls)
  }

  if (includeRemote) {
    collectRemoteUrls(projectsData, urls)
    collectRemoteUrls(projects, urls)
  }
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

export const preloadAssets = async () => {
  if (typeof window === 'undefined') return Promise.resolve([])
  const params = new URLSearchParams(window.location.search)
  const preloadMode = params.get('preload')
  const includeRemote = params.get('preloadRemote') === 'true'

  if (!preloadMode) return []

  const includeAll = preloadMode === 'all'
  const includeMedia = preloadMode === 'media'
  const includeCritical = preloadMode === 'critical' || preloadMode === 'block'

  const assets = includeCritical || includeAll || includeMedia
    ? await getAssetUrls({ includeAll, includeMedia, includeRemote })
    : []

  return Promise.all(
    assets.map((src) => (isVideo(src) ? preloadVideo(src) : preloadImage(src)))
  )
}
