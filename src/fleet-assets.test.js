import test from "node:test"
import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { fleet } from "./data/fleet.js"

const publicAssetExists = (assetPath) =>
  existsSync(join(process.cwd(), "public", assetPath.replace(/^\//, "")))

test("semua foto kendaraan mengarah ke file yang tersedia", () => {
  for (const vehicle of fleet) {
    assert.equal(publicAssetExists(vehicle.image), true, `${vehicle.name}: ${vehicle.image}`)
  }
})

test("logo dan foto ambulans tersedia", () => {
  assert.equal(publicAssetExists("/img/logo/logo.png"), true)
  assert.equal(publicAssetExists("/img/car/ambulance.jpeg"), true)
  assert.equal(publicAssetExists("/hero-poster.jpg"), true)
})
