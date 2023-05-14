class Response:
    def __init__(self, ok=True, data=None, description=None):
        self.ok = ok
        self.data = data
        self.description = description

    def get_json_obj(self):
        return {
            "ok": self.ok,
            "data": self.data,
            "description": self.description
        }


def make_response_data(data: any):
    return Response(ok=True, data=data)


def make_response_error(description: str):
    return Response(ok=False, description=description)
