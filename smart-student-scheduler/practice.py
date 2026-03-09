"""Optional enhancements for the Smart Student Activity Organizer.
These are meant for hackathon follow-up questions or 2-4 hour improvements.
"""

import csv

FILENAME = "vaishnavi_schedule.csv"
DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


def time_to_minutes(time_text):
    hour, minute = time_text.split(":")
    return int(hour) * 60 + int(minute)


def read_activities(filename):
    activities = []
    with open(filename, "r", newline="") as file:
        reader = csv.DictReader(file)
        for row in reader:
            row["priority"] = int(row["priority"])
            row["start_minutes"] = time_to_minutes(row["start_time"])
            row["end_minutes"] = time_to_minutes(row["end_time"])
            row["duration"] = row["end_minutes"] - row["start_minutes"]
            activities.append(row)
    return activities


def minutes_to_pretty(total_minutes):
    hours = total_minutes // 60
    minutes = total_minutes % 60
    return f"{hours} hour(s) {minutes} minute(s)"


def daily_totals(activities):
    totals = {day: 0 for day in DAYS}
    for activity in activities:
        totals[activity["day"]] += activity["duration"]
    return totals


def show_free_time(activities):
    print("\n=== Improvement 1: Free Time Estimate ===")
    totals = daily_totals(activities)
    available_after_school = 6 * 60  # 4 PM to 10 PM

    for day in DAYS:
        free_time = available_after_school - totals[day]
        if free_time < 0:
            free_time = 0
        print(f"- {day}: {minutes_to_pretty(free_time)} free")


def prioritize_a_day(activities, chosen_day="Friday"):
    print("\n=== Improvement 2: Priority Order ===")
    day_activities = []
    for activity in activities:
        if activity["day"] == chosen_day:
            day_activities.append(activity)

    day_activities.sort(key=lambda item: item["priority"], reverse=True)

    print(f"Recommended order for {chosen_day}:")
    for activity in day_activities:
        print(
            f"- Priority {activity['priority']}: {activity['activity']} "
            f"({activity['start_time']} - {activity['end_time']})"
        )


def interactive_day_lookup(activities):
    print("\n=== Improvement 3: Day Lookup ===")
    user_day = input("Enter a day to view schedule: ")

    found = False
    for activity in activities:
        if activity["day"].lower() == user_day.lower():
            print(
                f"- {activity['activity']} | {activity['start_time']} - {activity['end_time']} "
                f"| priority {activity['priority']}"
            )
            found = True

    if not found:
        print("No activities found for that day.")


def detect_conflicts(activities):
    print("\n=== Improvement 4: Conflict Detection ===")
    any_conflict = False

    for day in DAYS:
        day_activities = []
        for activity in activities:
            if activity["day"] == day:
                day_activities.append(activity)

        day_activities.sort(key=lambda item: item["start_minutes"])

        for i in range(len(day_activities) - 1):
            current_activity = day_activities[i]
            next_activity = day_activities[i + 1]

            if current_activity["end_minutes"] > next_activity["start_minutes"]:
                any_conflict = True
                print(
                    f"- Conflict on {day}: {current_activity['activity']} overlaps with {next_activity['activity']}"
                )

    if not any_conflict:
        print("No conflicts found in the current dataset.")


def main():
    activities = read_activities(FILENAME)
    show_free_time(activities)
    prioritize_a_day(activities, "Friday")
    detect_conflicts(activities)
    print("\nRun interactive_day_lookup(activities) if you want keyboard input during the demo.")


if __name__ == "__main__":
    main()
