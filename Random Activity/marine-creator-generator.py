import random

prefixes = ["Glow", "Aqua", "Void", "Neon", "Crusty", "Psycho", "Sponge"]
suffixes = ["sucker", "tentacle", "fin", "blob", "eel", "shrimp"]
powers = ["shoots glitter", "eats anxiety", "controls tides", "gives bad advice", "vibes too hard"]

creature = random.choice(prefixes) + random.choice(suffixes)
power = random.choice(powers)

print(f"🐙 Meet the {creature} — it {power}.")