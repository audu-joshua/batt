// Generate a consistent anonymous ID for the user
export function generateAnonymousId(): string {
  // Check if ID already exists
  const existingId = localStorage.getItem("battAppAnonymousId")
  if (existingId) {
    return existingId
  }

  // Generate a new ID if none exists
  const newId = "batt_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  // Store the ID
  localStorage.setItem("battAppAnonymousId", newId)
  return newId
}

// Get the anonymous ID
export function getAnonymousId(): string {
  const id = localStorage.getItem("battAppAnonymousId")
  return id || generateAnonymousId()
}

// Simulate collecting battery data from the system
export async function collectBatteryData(): Promise<void> {
  // In a real app, this would use system APIs to get actual battery data
  // For this demo, we'll simulate the data collection

  // Simulate a delay for data collection
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate simulated battery data
  const batteryData = {
    currentCapacity: 3450,
    maxCapacity: 4000,
    percentage: 87,
    wearLevel: 14,
    chargeCycles: 342,
    temperature: 28,
    estimatedLifespan: 1.5,
    currentUsage: 245,
    screenUsage: 120,
    wifiUsage: 45,
    backgroundUsage: 65,
    otherUsage: 15,
  }

  // Store the data
  localStorage.setItem("battAppBatteryData", JSON.stringify(batteryData))

  return
}

// Get the stored battery data
export function getBatteryData(): any {
  const dataString = localStorage.getItem("battAppBatteryData")

  if (dataString) {
    return JSON.parse(dataString)
  }

  // Return default data if none exists
  return {
    currentCapacity: 3450,
    maxCapacity: 4000,
    percentage: 87,
    wearLevel: 14,
    chargeCycles: 342,
    temperature: 28,
    estimatedLifespan: 1.5,
    currentUsage: 245,
    screenUsage: 120,
    wifiUsage: 45,
    backgroundUsage: 65,
    otherUsage: 15,
  }
}

// Check if data collection is enabled
export function isDataCollectionEnabled(): boolean {
  return localStorage.getItem("battAppDataCollection") !== "false"
}

// Toggle data collection
export function setDataCollectionEnabled(enabled: boolean): void {
  localStorage.setItem("battAppDataCollection", enabled.toString())
}

