import sqlite3

from models.cpu_info import CPUInfo

INSERT_CPU_INFO = """
INSERT INTO cpu_info (value)
VALUES (?)
RETURNING id;
"""

SELECT_CPU_INFO_FOR_LAST_HOUR = """
SELECT id,
       value,
       date_unix
FROM cpu_info
WHERE date_unix >= strftime('%s', 'now', '-1 hour');
"""

DELETE_CPU_INFO_BEFORE_LAST_HOUR = """
DELETE FROM cpu_info
WHERE date_unix < strftime('%s', 'now', '-1 hour');
"""

FOREIGN_ON = """
PRAGMA foreign_keys = ON;
"""


class Store:
    db = None

    def __new__(cls, *args, **kwargs):
        if cls.db is None:
            cls.db = super().__new__(cls)
        return cls.db

    def __init__(self, path_db: str):
        self._connect = sqlite3.connect(path_db)
        self._connect.row_factory = sqlite3.Row
        self._init_db()
        self._connect.execute(FOREIGN_ON)

    def _init_db(self):
        with open("./store/init_db.sql") as sql_script:
            self._connect.executescript(sql_script.read())

    def add_new_cpu_info(self, cpu_info: CPUInfo) -> int:
        try:
            with self._connect:
                cur = self._connect.execute(INSERT_CPU_INFO, cpu_info.insert_placeholder())
                data: sqlite3.Row = cur.fetchone()
                if data is None:
                    return 0
                return data[0]
        except sqlite3.Error as err:
            print(err)
            return 0

    def get_cpu_info_for_last_hour(self) -> list[CPUInfo]:
        cpu_info_lst: list[CPUInfo] = list()

        try:
            with self._connect:
                cur = self._connect.execute(SELECT_CPU_INFO_FOR_LAST_HOUR)
                for item in cur:
                    cpu_info = CPUInfo()
                    cpu_info.select_placeholder(*item)
                    cpu_info_lst.append(cpu_info)

                self._connect.execute(DELETE_CPU_INFO_BEFORE_LAST_HOUR)
        except sqlite3.Error as err:
            print(err)

        return cpu_info_lst

    def __del__(self):
        self._connect.close()
