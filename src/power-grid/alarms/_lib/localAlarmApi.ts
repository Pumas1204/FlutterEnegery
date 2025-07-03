interface LocalStorageAlarm {
  id: number;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  description: string;
  status: "on" | "off";
  alarm_field: string;
  alarm_value: string;
  alarm_condition: string;
  profile: number;
}

// Function to get the local storage key for a specific user
const getLocalStorageKey = (userId: number) => `powergrid_alarms_${userId}`;

// Helper to get all alarms for a user from local storage
const getAlarmsFromLocalStorage = (userId: number): LocalStorageAlarm[] => {
  if (typeof window === "undefined") {
    // Return empty array if not in browser environment
    return [];
  }
  const key = getLocalStorageKey(userId);
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Helper to save alarms to local storage for a user
const saveAlarmsToLocalStorage = (
  userId: number,
  alarms: LocalStorageAlarm[],
) => {
  if (typeof window === "undefined") {
    return;
  }
  const key = getLocalStorageKey(userId);
  localStorage.setItem(key, JSON.stringify(alarms));
};

export const LocalAlarmAPI = {
  // Simulates fetching alarms with pagination
  getAlarms: async (
    userId: number,
    params: string = "",
  ): Promise<{ results: LocalStorageAlarm[]; count: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allAlarms = getAlarmsFromLocalStorage(userId);
        const urlParams = new URLSearchParams(params);
        const page = parseInt(urlParams.get("page") || "1");
        const pageSize = parseInt(urlParams.get("page_size") || "8");

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedAlarms = allAlarms.slice(startIndex, endIndex);

        resolve({ results: paginatedAlarms, count: allAlarms.length });
      }, 500); // Simulate network delay
    });
  },

  // Simulates creating a new alarm
  createAlarm: async (
    userId: number,
    alarmData: Omit<
      LocalStorageAlarm,
      "id" | "created_at" | "updated_at" | "deleted_at" | "profile"
    >,
  ): Promise<LocalStorageAlarm> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allAlarms = getAlarmsFromLocalStorage(userId);
        const newAlarm: LocalStorageAlarm = {
          id:
            allAlarms.length > 0
              ? Math.max(...allAlarms.map((a) => a.id)) + 1
              : 1,
          ...alarmData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          profile: userId, // Assign the user ID to the profile
        };
        allAlarms.push(newAlarm);
        saveAlarmsToLocalStorage(userId, allAlarms);
        resolve(newAlarm);
      }, 500);
    });
  },

  // Simulates updating an existing alarm
  updateAlarm: async (
    userId: number,
    id: number,
    updateData: Partial<LocalStorageAlarm>,
  ): Promise<LocalStorageAlarm | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allAlarms = getAlarmsFromLocalStorage(userId);
        const alarmIndex = allAlarms.findIndex((alarm) => alarm.id === id);

        if (alarmIndex > -1) {
          const updatedAlarm = {
            ...allAlarms[alarmIndex],
            ...updateData,
            updated_at: new Date().toISOString(),
          };
          allAlarms[alarmIndex] = updatedAlarm;
          saveAlarmsToLocalStorage(userId, allAlarms);
          resolve(updatedAlarm);
        } else {
          resolve(undefined);
        }
      }, 500);
    });
  },

  // Simulates deleting an alarm
  deleteAlarm: async (userId: number, id: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allAlarms = getAlarmsFromLocalStorage(userId);
        const updatedAlarms = allAlarms.filter((alarm) => alarm.id !== id);
        saveAlarmsToLocalStorage(userId, updatedAlarms);
        resolve();
      }, 500);
    });
  },
};
