import { TSchedules } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedules: TSchedules[],
  newSchedule: TSchedules,
) => {
  for (const schedules of assignedSchedules) {
    const existingStartTime = new Date(`2000-01-01T${schedules.startTime}`);
    const existingEndTime = new Date(`2000-01-01T${schedules.endTime}`);
    const newStartTime = new Date(`2000-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`2000-01-01T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};
