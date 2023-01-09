import { joinURL, encodeQueryItem } from "ufo"
import { createOperationsGenerator } from "#image"

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    width: "width",
    height: "height",
    fit: "resize",
  },
  valueMap: {
    fit: {
      cover: "cover",
      contain: "contain",
      fill: "fill",
    },
  },
  joinWith: "&",
  formatter: (key: any, val: any) => `${key}=${val}`,
})

const defaultModifiers = {}

const isDev = process.env.NODE_ENV === "development"

// https://supabase.com/blog/storage-image-resizing-smart-cdn
export const getImage = (src: string, { modifiers = {} } = {}) => {
  const mergeModifiers = { ...defaultModifiers, ...modifiers }
  const operations = operationsGenerator(mergeModifiers as any)

  // https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/lookout-1w901k-screenshot-2022-12-19-at-12733-pmpng?width=500
  // https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/render/image/public/products/lookout-1w901k-screenshot-2022-12-19-at-12733-pmpng?width=500
  // GET https://project_id.supabase.co/storage/v1/render/image/public/bucket/image.jpg?width=500&height=600

  const updatedSrc = src.replace("v1/object", "v1/render/image")

  const url = joinURL(updatedSrc) + (operations ? "?" + operations : "")

  return {
    url,
  }
}
