// Battery data interface
export interface BatteryData {
  currentCapacity: number
  maxCapacity: number
  percentage: number
  wearLevel: number
  chargeCycles: number
  temperature: number
  estimatedLifespan: number
  currentUsage: number
  screenUsage: number
  wifiUsage: number
  backgroundUsage: number
  otherUsage: number
}

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

// Get battery data from the browser's Battery API if available
async function getBrowserBatteryData(): Promise<Partial<BatteryData> | null> {
  try {
    // Check if the Battery API is available
    if ("getBattery" in navigator) {
      const battery = await (navigator as any).getBattery()

      // Calculate some basic battery metrics from the Browser Battery API
      const percentage = Math.round(battery.level * 100)

      return {
        percentage,
        // We can't get these values from the Browser API, but we can estimate some
        currentCapacity: 0, // Not available from Browser API
        maxCapacity: 0, // Not available from Browser API
        wearLevel: 0, // Not available from Browser API
        chargeCycles: 0, // Not available from Browser API
        temperature: 0, // Not available from Browser API
        estimatedLifespan: 0, // Not available from Browser API
        // We can estimate current usage based on discharge rate
        currentUsage: battery.charging ? 0 : Math.round(Math.random() * 200 + 100), // Simulated value
        screenUsage: 0, // Not available from Browser API
        wifiUsage: 0, // Not available from Browser API
        backgroundUsage: 0, // Not available from Browser API
        otherUsage: 0, // Not available from Browser API
      }
    }
    return null
  } catch (error) {
    console.error("Error accessing Battery API:", error)
    return null
  }
}

// Fetch battery data from the backend API
async function fetchBatteryDataFromBackend(): Promise<BatteryData | null> {
  try {
    // In a real implementation, this would be a call to your backend API
    const response = await fetch("/api/battery")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching battery data from backend:", error)
    return null
  }
}

// Collect battery data from all available sources
export async function collectBatteryData(): Promise<void> {
  let batteryData: BatteryData | null = null

  try {
    // Try to get data from the backend first (most comprehensive)
    batteryData = await fetchBatteryDataFromBackend()
  } catch (error) {
    console.error("Error fetching from backend:", error)
    // Continue to next method if backend fails
  }

  if (!batteryData) {
    try {
      // If backend data is not available, try browser API
      const browserData = await getBrowserBatteryData()

      if (browserData) {
        // Fill in missing data with estimates or defaults
        batteryData = {
          currentCapacity: browserData.currentCapacity || 3450,
          maxCapacity: browserData.maxCapacity || 4000,
          percentage: browserData.percentage || 87,
          wearLevel: browserData.wearLevel || Math.round(Math.random() * 15 + 5), // Simulated value
          chargeCycles: browserData.chargeCycles || Math.round(Math.random() * 400 + 100), // Simulated value
          temperature: browserData.temperature || Math.round(Math.random() * 10 + 25), // Simulated value
          estimatedLifespan: browserData.estimatedLifespan || Number.parseFloat((Math.random() * 1 + 1).toFixed(1)), // Simulated value
          currentUsage: browserData.currentUsage || Math.round(Math.random() * 200 + 100), // Simulated value
          screenUsage: browserData.screenUsage || Math.round(Math.random() * 100 + 50), // Simulated value
          wifiUsage: browserData.wifiUsage || Math.round(Math.random() * 50 + 20), // Simulated value
          backgroundUsage: browserData.backgroundUsage || Math.round(Math.random() * 70 + 30), // Simulated value
          otherUsage: browserData.otherUsage || Math.round(Math.random() * 30 + 10), // Simulated value
        }
      }
    } catch (error) {
      console.error("Error with browser battery API:", error)
      // Continue to fallback if browser API fails
    }
  }

  // If no real data is available, use fallback data
  if (!batteryData) {
    batteryData = getFallbackBatteryData()
  }

  // Store the data
  localStorage.setItem("battAppBatteryData", JSON.stringify(batteryData))

  return
}

// Get fallback battery data when no real data is available
function getFallbackBatteryData(): BatteryData {
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

// Get the stored battery data
export function getBatteryData(): BatteryData {
  const dataString = localStorage.getItem("battAppBatteryData")

  if (dataString) {
    return JSON.parse(dataString)
  }

  // Return default data if none exists
  return getFallbackBatteryData()
}

// Check if data collection is enabled
export function isDataCollectionEnabled(): boolean {
  return localStorage.getItem("battAppDataCollection") !== "false"
}

// Toggle data collection
export function setDataCollectionEnabled(enabled: boolean): void {
  localStorage.setItem("battAppDataCollection", enabled.toString())
}

