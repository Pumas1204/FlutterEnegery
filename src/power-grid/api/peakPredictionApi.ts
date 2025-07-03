// /lib/api/peakPredictionApi.ts

// --- HELPER & TRANSFORMER FUNCTIONS ---

/**
 * Transforms the raw `/predict/today` data into the format expected by the `getDemandSummary` component.
 * @param apiData Raw data from the Peak Prediction API.
 */
function transformTodayToDemandSummary(apiData: any) {
  // Use hourly_forecasts for all calculations if available
  const hours = apiData?.hourly_forecasts || apiData?.next_24_hours || [];
  if (hours.length > 0) {
    // Market Demand: latest actual_demand if available, else latest forecasted_demand
    const latestHour = hours[hours.length - 1];
    let marketDemandValue = null;
    let marketDemandTime = "";
    // Find the latest hour with actual_demand
    for (let i = hours.length - 1; i >= 0; i--) {
      if (
        hours[i].actual_demand !== undefined &&
        hours[i].actual_demand !== null
      ) {
        marketDemandValue = `${Math.round(hours[i].actual_demand).toLocaleString()} MW`;
        marketDemandTime = `at hour ending ${hours[i].hour_ending}`;
        break;
      }
    }
    // If no actual_demand, use latest forecasted_demand
    if (!marketDemandValue) {
      marketDemandValue = `${Math.round(latestHour.forecasted_demand).toLocaleString()} MW`;
      marketDemandTime = `at hour ending ${latestHour.hour_ending}`;
    }

    // Projected Minimum: min of all forecasted_demand
    const minimum = hours.reduce(
      (min: any, hour: any) =>
        hour.forecasted_demand < min.forecasted_demand ? hour : min,
      hours[0],
    );

    // Projected Peak: max of all forecasted_demand
    const peak = hours.reduce(
      (max: any, hour: any) =>
        hour.forecasted_demand > max.forecasted_demand ? hour : max,
      hours[0],
    );

    return {
      market_demand: {
        value: marketDemandValue,
        time: marketDemandTime,
      },
      five_minute_demand: {
        value: "N/A", // Not available from Peak API
        time: "N/A",
      },
      projected_peak: {
        value: `${Math.round(peak.forecasted_demand).toLocaleString()} MW`,
        time: `at hour ending ${peak.hour_ending}`,
      },
      projected_minimum: {
        value: `${Math.round(minimum.forecasted_demand).toLocaleString()} MW`,
        time: `at hour ending ${minimum.hour_ending}`,
      },
    };
  }

  // Handle original projected_daily_peak structure
  if (apiData?.projected_daily_peak) {
    return {
      market_demand: {
        value: "N/A", // This data is not available from the Peak API
        time: "N/A",
      },
      five_minute_demand: {
        value: "N/A", // Not available from Peak API
        time: "N/A",
      },
      projected_peak: {
        value: `${Math.round(apiData.projected_daily_peak.forecasted_demand).toLocaleString()} MW`,
        time: `at hour ending ${apiData.projected_daily_peak.hour_ending}`,
      },
      projected_minimum: {
        value: "N/A", // Not available from Peak API, but could be calculated if needed
        time: "N/A",
      },
    };
  }

  // Fallback if no data
  return {
    market_demand: { value: "N/A", time: "N/A" },
    five_minute_demand: { value: "N/A", time: "N/A" },
    projected_peak: { value: "N/A", time: "N/A" },
    projected_minimum: { value: "N/A", time: "N/A" },
  };
}

/**
 * Transforms the raw `/predict/next24h` data into the format expected by your charts.
 * @param apiData Raw data from the Peak Prediction API.
 */
function transformNext24hToChartData(apiData: any) {
  if (!apiData?.next_24_hours) return { results: [] };

  // Mimics the structure of your old backend's power-data endpoint
  return {
    results: apiData.next_24_hours.map((hour: any) => ({
      timestamp: new Date(
        Date.parse(
          `${hour.date}T${String(hour.hour_ending - 1).padStart(2, "0")}:00:00`,
        ),
      ).toISOString(),
      demand: `${Math.round(hour.forecasted_demand).toLocaleString()} MW`,
      // Add peak risk data, which your charts can now use!
      peak_risk_level: hour.risk_level,
      peak_probability: hour.ga_top5_peak_probability,
      // These fields are not in the Peak API but are added for compatibility
      supply: "N/A",
      price: "N/A",
      source: "Peak Prediction API",
    })),
  };
}

/**
 * A helper function to handle POST requests to our Next.js API proxy for the Peak API.
 * @param endpoint The API endpoint to call (e.g., '/predict/today').
 * @param body The JSON body to send with the request.
 */
async function postToPeakAPI(endpoint: string, body: object) {
  try {
    const res = await fetch(`/api/peak${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: data.error || "Failed to fetch from Peak API",
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

export const PeakPredictionAPI = {
  /**
   * Replaces the old `getDemandSummary` by fetching from Peak API and transforming the data.
   */
  async getDemandSummary() {
    try {
      const requestTime = "2024-04-14 12:00:00";
      const rawData = await postToPeakAPI("/predict/today", {
        request_time: requestTime,
      });
      const result = transformTodayToDemandSummary(rawData);
      return result;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Replaces the old `getSupplyDemand` for charts by fetching the next 24h forecast.
   */
  async getSupplyDemand() {
    const requestTime = "2024-04-14 12:00:00";
    const rawData = await postToPeakAPI("/predict/next24h", {
      request_time: requestTime,
    });
    return transformNext24hToChartData(rawData);
  },

  /**
   * Retrieves the actual daily peak from the previous day. Returns raw data.
   */
  async predictYesterday() {
    const requestTime = "2024-04-14 12:00:00";
    return postToPeakAPI("/predict/yesterday", { request_time: requestTime });
  },

  /**
   * Retrieves the forecasted daily peak for the next 6 days. Returns raw data.
   */
  async predictNext6d() {
    const requestTime = "2024-04-14 12:00:00";
    return postToPeakAPI("/predict/next6d", { request_time: requestTime });
  },
};
