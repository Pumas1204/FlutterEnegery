export function __DateString(
  date?: string | Date,
  pattern = "{Y:4}/{M:2}/{D:2} - {h:2}:{m:2}:{s:2}",
  locale = "fa-IR",
) {
  if (!date) return null;
  const value = new Date(date);
  let result = pattern;
  // year
  if (result.includes("{Y:4}")) {
    result = result
      .split("{Y:4}")
      .join(value.toLocaleDateString(locale, { year: "numeric" }));
  } else if (result.includes("{Y}")) {
    result = result
      .split("{Y}")
      .join(value.toLocaleDateString(locale, { year: "numeric" }));
  } else if (result.includes("{Y:2}")) {
    result = result
      .split("{Y:2}")
      .join(value.toLocaleDateString(locale, { year: "2-digit" }));
  }
  // month
  if (result.includes("{M}")) {
    result = result
      .split("{M}")
      .join(value.toLocaleDateString(locale, { month: "numeric" }));
  } else if (result.includes("{M:2}")) {
    result = result
      .split("{M:2}")
      .join(value.toLocaleDateString(locale, { month: "2-digit" }));
  } else if (result.includes("{M:S}")) {
    result = result
      .split("{M:S}")
      .join(value.toLocaleDateString(locale, { month: "long" }));
  } else if (result.includes("{M:s}")) {
    result = result
      .split("{M:s}")
      .join(value.toLocaleDateString(locale, { month: "short" }));
  }
  // day
  if (result.includes("{D}")) {
    result = result
      .split("{D}")
      .join(value.toLocaleDateString(locale, { day: "numeric" }));
  } else if (result.includes("{D:2}")) {
    result = result
      .split("{D:2}")
      .join(value.toLocaleDateString(locale, { day: "2-digit" }));
  }
  // week
  if (result.includes("{W:S}")) {
    result
      .split("{W:S}")
      .join(value.toLocaleDateString(locale, { weekday: "long" }));
  } else if (result.includes("{W:s}")) {
    result
      .split("{W:s}")
      .join(value.toLocaleDateString(locale, { weekday: "short" }));
  }
  // hour
  if (result.includes("{h}")) {
    result = result
      .split("{h}")
      .join(value.toLocaleTimeString(locale, { hour: "numeric" }));
  } else if (result.includes("{h:2}")) {
    result = result
      .split("{h:2}")
      .join(
        value.toLocaleTimeString(locale, { hour: "2-digit", hourCycle: "h24" }),
      );
  }
  // minute
  if (result.includes("{m}")) {
    result = result
      .split("{m}")
      .join(value.toLocaleTimeString(locale, { minute: "numeric" }));
  } else if (result.includes("{m:2}")) {
    result = result
      .split("{m:2}")
      .join(value.toLocaleTimeString(locale, { minute: "2-digit" }));
  }
  // second
  if (result.includes("{s}")) {
    result = result
      .split("{s}")
      .join(value.toLocaleTimeString(locale, { second: "numeric" }));
  } else if (result.includes("{s:2}")) {
    result = result
      .split("{s:2}")
      .join(value.toLocaleTimeString(locale, { second: "2-digit" }));
  }
  return result;
}

export function __HoursDuration(start: string, end?: string) {
  const startDate = end
    ? new Date(start)
    : new Date(new Date(start).setHours(0, 0, 0, 0));
  const endDate = end ? new Date(end) : new Date(start);
  const diff = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);
  return hours;
}

export const __TextTimeDuration = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let diff = endDate.getTime() - startDate.getTime();
  let days = Math.floor(diff / 1000 / 60 / 60 / 24);
  diff -= days * 1000 * 60 * 60 * 24;
  let hours = Math.floor(diff / 1000 / 60 / 60);
  if (days < 0) {
    days = days + 1;
    hours = hours - 24;
  }

  return `${days ? `${days} day${days > 1 ? "s" : ""} ${days ? " and" : ""}` : ""} ${hours ? `${hours} hour${hours > 1 ? "s" : ""}` : ""}`;
};
