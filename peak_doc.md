Peak Prediction API
Version: 1.0.0
Last Updated: May 16, 2025
Overview
This API forecasts hourly demand and GA top-5 peak risk levels for Ontario Class A industrial users. It is intended for use to support real-time operational and energy planning decisions.
Notes
Cold starts may cause 30–50 seconds delay for the first request.
Always include the correct Authorization header.
Endpoints accept POST requests with JSON bodies.
Data is currently available for up to 2024-05-14 for backtesting.
Base URL
​
Authentication
All requests require an API key via header.
Header Format:
​
Endpoints Summary
Method
Endpoint
Description
POST
/predict/today
Hourly forecast, peak risk for today,
POST
/predict/next24h
Hourly forecast + peak risk for next 24 hrs
POST
/predict/yesterday
Returns actual daily peak from yesterday
POST
/predict/next6d
Forecasted daily peak for next 6 days
/predict/today
Returns the hourly demand forecast for today (request_time) along with actual demand values up to the request time. Each hour includes the probability of triggering a GA top-5 peak and a corresponding risk level. It also includes:
Today’s projected daily peak based on forecasted data.
Today’s actual peak, if known at request time.
Request
​
Response
​
Field
Type
Description
date
string
The date of the prediction (e.g., "2025-04-30").
hourly_forecasts
array
List of hourly forecast data objects.
hourly_forecasts[].hour_ending
integer
The hour ending (1–24) for the forecasted period.
hourly_forecasts[].actual_demand
number
The actual demand for that hour, if available.
hourly_forecasts[].forecasted_demand
number
The forecasted demand for that hour.
hourly_forecasts[].ga_top5_peak_probability
number
The probability that this hour will be one of the GA top-5 peak hours.
hourly_forecasts[].risk_level
string
Qualitative risk level: "Unlikely", "Low", "Medium", "High".
projected_daily_peak
object
The predicted daily peak based on forecasted data.
projected_daily_peak.hour_ending
integer
Hour ending when the forecasted daily peak is expected to occur.
projected_daily_peak.forecasted_demand
number
The forecasted demand value of the projected daily peak.
actual_daily_peak
object
The observed highest demand in the same day up to request_time.
actual_daily_peak.hour_ending
integer
Hour ending of the actual highest demand so far today.
actual_daily_peak.actual_demand
number
The actual demand during that peak hour.
/predict/next24h
Provides a 24-hour forward-looking forecast starting from the request_time. For each hour, it includes forecasted demand and peak probability with a risk level. Also highlights hours with high likelihood of being one of the top 5 GA peaks in a dedicated potential_top5_peak_alerts list.
Request
​
Response
​
Field
Type
Description
next_24_hours
array
List of hourly forecast data for the next 24 hours.
next_24_hours[].date
string
Date of the forecasted hour.
next_24_hours[].hour_ending
integer
The hour ending (1–24) of the forecast.
next_24_hours[].forecasted_demand
number
Predicted demand for that hour.
next_24_hours[].ga_top5_peak_probability
number
Probability that this hour will be a GA top-5 peak.
next_24_hours[].risk_level
string
Qualitative risk level: "Unlikely", "Low", "Medium", "High".
potential_top5_peak_alerts
array
Subset of hours likely to be GA top-5 peaks.
potential_top5_peak_alerts[].date
string
Date of the likely top-5 peak hour.
potential_top5_peak_alerts[].hour_ending
integer
Ending hour of the potential peak.
potential_top5_peak_alerts[].forecasted_demand
number
Predicted demand during the potential peak hour.
potential_top5_peak_alerts[].ga_top5_peak_probability
number
Peak probability for that hour.
potential_top5_peak_alerts[].risk_level
string
Risk label for that hour.
/predict/yesterday
Returns the actual peak demand and hour from the previous calendar day relative to request_time.
Request
​
Response
​
Field
Type
Description
yesterday
object
Contains data from the previous day.
yesterday.actual_daily_peak
object
Yesterday’s daily peak.
actual_daily_peak.hour_ending
integer
Hour ending of the highest actual demand.
actual_daily_peak.actual_demand
number
Actual demand value during that hour.
/predict/next6d
Returns the forecasted daily peak hour and corresponding demand for the next 6 days from request_time.
Request
​
Response
​
Field
Type
Description
6_day_forecasted_daily_peaks
array
List of peak forecasts for the next six days.
6_day_forecasted_daily_peaks[].date
string
Date of the forecast.
6_day_forecasted_daily_peaks[].hour_ending
integer
Hour ending of the predicted peak for that day.
6_day_forecasted_daily_peaks[].forecasted_demand
number
Forecasted demand at the predicted peak hour.
Testing Tools
Swagger UI
​
Curl
​
Postman
Method: POST
URL: https://peak-prediction-api.onrender.com/predict/today
Headers:
Content-Type: application/json
API_KEY: <YOUR_API_KEY>
Body:
