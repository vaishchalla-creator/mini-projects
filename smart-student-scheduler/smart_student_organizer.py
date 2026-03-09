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


def print_all_activities(activities):
    print("All scheduled activities:")
    for activity in activities:
        print(
            f"- {activity['day']}: {activity['activity']} "
            f"({activity['start_time']} - {activity['end_time']}) "
            f"[{activity['category']}] Priority {activity['priority']}"
        )
    print()


def print_daily_totals(totals):
    print("Total scheduled time by day:")
    for day in DAYS:
        print(f"- {day}: {minutes_to_pretty(totals[day])}")
    print()


def print_day_breakdown(activities):
    for day in DAYS:
        print(f"{day}:")
        found_any = False
        for activity in activities:
            if activity["day"] == day:
                print(
                    f"  - {activity['activity']} | {activity['start_time']} - {activity['end_time']} "
                    f"| {activity['category']} | priority {activity['priority']}"
                )
                found_any = True
        if not found_any:
            print("  - No scheduled activities")
        print()


def busiest_day(totals):
    return max(totals, key=totals.get)


def print_schedule_analysis(totals):
    print("Schedule analysis:")
    for day in DAYS:
        if totals[day] >= 180:
            print(f"- {day}: Busy day. Plan homework carefully and avoid extra commitments.")
        elif totals[day] >= 120:
            print(f"- {day}: Moderately busy. Keep a good plan.")
        else:
            print(f"- {day}: Lighter day. Good time for extra practice or rest.")
    print()


def print_recommendation(activities, totals):
    high_priority_count = 0
    for activity in activities:
        if activity["priority"] == 3:
            high_priority_count += 1

    print(f"Number of high-priority activities this week: {high_priority_count}")

    busiest_day = None
    busiest_minutes = 0

    for day, minutes in totals.items():
        if busiest_day is None or minutes > busiest_minutes:
            busiest_day = day
            busiest_minutes = minutes

    if busiest_minutes >= 480:
        print(f"Recommendation: {busiest_day} is extremely packed. Avoid adding anything extra that day.")
    elif busiest_minutes >= 300:
        print(f"Recommendation: {busiest_day} is very busy. Prepare homework or materials ahead of time.")
    elif busiest_minutes >= 180:
        print(f"Recommendation: {busiest_day} is busy. Keep a clear schedule.")
    else:
        print("Recommendation: Your week looks manageable. Use lighter days for extra practice or rest.")



def main():
    activities = read_activities(FILENAME)
    totals = daily_totals(activities)

    print("=== Smart Student Activity Organizer ===")
    print()
    print_all_activities(activities)
    print_daily_totals(totals)

    day = busiest_day(totals)
    print(f"Busiest day: {day} with {minutes_to_pretty(totals[day])}")
    print()

    print_day_breakdown(activities)
    print_schedule_analysis(totals)
    print_recommendation(activities, totals)



if __name__ == "__main__":
    main()
