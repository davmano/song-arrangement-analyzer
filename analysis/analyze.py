import sys
import json

# Accept filepath from command line
file_path = sys.argv[1]

# TODO: Use librosa here. For now, return mocked structure:
structure = [
    {"label": "Intro", "start": 0.0, "end": 12.5},
    {"label": "Verse", "start": 12.5, "end": 40.0},
    {"label": "Chorus", "start": 40.0, "end": 60.0},
    {"label": "Verse", "start": 60.0, "end": 88.0},
    {"label": "Chorus", "start": 88.0, "end": 108.0},
    {"label": "Outro", "start": 108.0, "end": 120.0}
]

print(json.dumps(structure))

