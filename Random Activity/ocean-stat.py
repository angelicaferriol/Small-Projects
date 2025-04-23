import random

stats = [("Sea Surface Temp", 28.5), ("Ocean pH", 7.9), ("Species Observed", 100)]
stat_name, value = random.choice(stats)
threshold = float(input(f"🌡️ Is the {stat_name} above or below 27.0? Enter a number: "))

if threshold < value:
    print("🔼 It’s higher!")
else:
    print("🔽 It’s lower!")

print(f"📊 Actual {stat_name}: {value}")
