import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const heroSource = readFileSync(new URL("./components/HeroIllustration.jsx", import.meta.url), "utf8")

test("hero tidak menampilkan ilustrasi fallback sebelum video siap", () => {
  assert.doesNotMatch(heroSource, /hero-art__fallback/)
  assert.doesNotMatch(heroSource, /currentTime\s*=/)
})

test("video hero memakai autoplay, loop, dan preload", () => {
  assert.match(heroSource, /autoPlay=/)
  assert.match(heroSource, /\bloop\b/)
  assert.match(heroSource, /preload="auto"/)
  assert.match(heroSource, /poster="\/hero-poster\.jpg"/)
  assert.match(heroSource, /\/hero\.mp4#t=3/)
})
