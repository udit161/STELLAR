import sys
from pathlib import Path

# Add the parent directory (ai_agent) to sys.path so pytest can locate all agent modules
ai_agent_dir = Path(__file__).resolve().parent.parent
if str(ai_agent_dir) not in sys.path:
    sys.path.insert(0, str(ai_agent_dir))
