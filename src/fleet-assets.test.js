import test from "node:test"
import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { fleet } from "./data/fleet.js"
import { allInIncludes, selfDriveIncludes } from "./data/site.js"

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

test("data armada mengikuti spesifikasi operasional terbaru", () => {
  const byId = Object.fromEntries(fleet.map((vehicle) => [vehicle.id, vehicle]))

  assert.equal(byId["innova-reborn"].fuelLabel, "Diesel")
  assert.equal(byId["innova-reborn"].fuelNeedsConfirmation, false)
  assert.equal(byId["hiace-premio"].passengerCapacityWithDriver, 14)
  assert.equal(byId["hiace-premio"].capacityLabel, "Hingga 14 penumpang")
  assert.equal(byId["rush-terios"].selfDrivePrice, 400000)
  assert.equal(byId["innova-zenix"].selfDrivePrice, null)
})

test("paket menjelaskan batas waktu pemakaian dengan tepat", () => {
  assert.ok(allInIncludes.includes("Driver maksimal 12 jam perjalanan per hari"))
  assert.ok(selfDriveIncludes.includes("Pemakaian bebas 24 jam per hari"))
  assert.equal(allInIncludes.some((item) => item.includes("24 jam")), false)
})
