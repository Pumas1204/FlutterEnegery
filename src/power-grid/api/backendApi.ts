/**
 * Backend API client for making authenticated requests to the backend
 * Uses the Next.js API proxy to handle authentication securely
 */

// const BACKEND_API_BASE =
//   process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
//   "https://api-power.6thsolution.com/api/v1";

/**
 * A helper to handle fetch requests through the Next.js API proxy.
 * This approach is more secure as it uses httpOnly cookies set by the server.
 */
async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  try {
    // Use the Next.js API proxy instead of direct backend calls
    const url = `/api/backend/${endpoint}`;

    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: data.error || "Failed to fetch from backend",
        details: data.details,
        status: res.status,
        endpoint,
      };
    }
    return data;
  } catch (err: any) {
    throw {
      message: err.message || "Unknown error",
      details: err.details || null,
      status: err.status || 500,
      endpoint,
    };
  }
}

// --- EXPORTED API OBJECT ---

export const BackendAPI = {
  /**
   * Gets the price summary. This data is ONLY available from the original backend.
   * @throws {Error} If the token is missing or the request fails
   */
  getPriceSummary() {
    return fetchFromBackend("grid/price/price_summary/", {
      method: "GET",
    });
  },

  /**
   * Gets generator availability. This data is ONLY available from the original backend.
   * @throws {Error} If the token is missing or the request fails
   */
  getGeneratorAvailability(params: string = "") {
    return fetchFromBackend(`grid/supply/generator_availability/${params}`, {
      method: "GET",
    });
  },

  /**
   * Fetches price chart data from the backend.
   * @param params Query string parameters (e.g., '?time_filter=...')
   */
  getPriceChart(params: string = "") {
    return fetchFromBackend(`grid/price/chart_data/${params}`, {
      method: "GET",
    });
  },

  /**
   * Gets demand summary, including 5-minute market demand, from the backend.
   * @throws {Error} If the token is missing or the request fails
   */
  getDemandSummary() {
    return fetchFromBackend("grid/demand/demand_summary/", {
      method: "GET",
    });
  },

  /**
   * Gets list of alarms with pagination.
   * @param params Query string parameters (e.g., '?page=1&page_size=8')
   * @throws {Error} If the token is missing or the request fails
   */
  getAlarms(params: string = "") {
    return fetchFromBackend(`alm/alarms/${params}`, {
      method: "GET",
    });
  },

  /**
   * Creates a new alarm.
   * @param alarmData The alarm data to create
   * @throws {Error} If the token is missing or the request fails
   */
  createAlarm(alarmData: any) {
    return fetchFromBackend("alm/alarms/", {
      method: "POST",
      body: JSON.stringify(alarmData),
    });
  },

  /**
   * Updates an alarm by ID.
   * @param id The alarm ID
   * @param updateData The data to update
   * @throws {Error} If the token is missing or the request fails
   */
  updateAlarm(id: number, updateData: any) {
    return fetchFromBackend(`alm/alarms/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
    });
  },

  /**
   * Deletes an alarm by ID.
   * @param id The alarm ID
   * @throws {Error} If the token is missing or the request fails
   */
  deleteAlarm(id: number) {
    return fetchFromBackend(`alm/alarms/${id}/`, {
      method: "DELETE",
    });
  },

  // Add any other functions that ONLY your backend can fulfill.
};
