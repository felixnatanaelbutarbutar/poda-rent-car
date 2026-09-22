import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const heroSource = readFileSync(new URL("./components/HeroIllustration.jsx", import.meta.url), "utf8")

test("hero tidak menampilkan ilustrasi fallback sebelum video siap", () => {
  assert.doesNotMatch(heroSource, /hero-art__fallback/)
  assert.doesNotMatch(heroSource, /currentTime\s*=/)
})

test("video hero diputar setelah mount dan tidak berebut unduhan dengan poster", () => {
  assert.doesNotMatch(heroSource, /autoPlay=/)
  assert.match(heroSource, /video\.play\(\)/)
  assert.match(heroSource, /prefers-reduced-motion: reduce/)
  assert.match(heroSource, /\bloop\b/)
  assert.match(heroSource, /preload="none"/)
  assert.match(heroSource, /poster="\/hero-poster\.jpg"/)
  assert.match(heroSource, /\/hero\.mp4#t=3/)
})
