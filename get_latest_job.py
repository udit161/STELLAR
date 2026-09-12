import sqlite3

db = sqlite3.connect(
    "SatQueryAI/ai_agent/satquery_audit.db"
)

row = db.execute(
    "SELECT job_id, status FROM queries ORDER BY id DESC LIMIT 1"
).fetchone()

print("Latest job:", row)

db.close()
