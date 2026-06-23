import psycopg2

try:
    conn = psycopg2.connect(
        dbname="survuday",
        user="root",
        password="admin",
        host="127.0.0.1",
        port="5432"
    )
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute("DROP TABLE IF EXISTS chat_histories CASCADE;")
    cur.execute("DROP TABLE IF EXISTS chat_sessions CASCADE;")
    print("Successfully dropped chat tables.")
    cur.close()
    conn.close()
except Exception as e:
    print("Error:", e)
