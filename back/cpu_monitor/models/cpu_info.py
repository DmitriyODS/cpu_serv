class CPUInfo:
    def __init__(self):
        self.id: int = 0
        self.value: str = ''
        self.date_unix: int = 0

    def select_placeholder(self, *args) -> bool:
        if len(args) < 3:
            return False

        self.id = args[0]
        self.value = args[1]
        self.date_unix = args[2]

        return True

    def insert_placeholder(self) -> tuple:
        return self.value,

    def __str__(self):
        return f"id: {self.id}, value: {self.value}, date_unix: {self.date_unix}"
