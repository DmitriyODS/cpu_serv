from aiohttp import web

from models.response import make_response_data, make_response_error
from service import get_cpu_info_line_list, get_cpu_info_middle_list

routes = web.RouteTableDef()


@routes.get('/api/v1/cpu_line')
async def get_line_cpu_info(request):
    data, is_err = get_cpu_info_line_list()
    if is_err:
        response_data = make_response_error("Error get cpu info")
    else:
        response_data = make_response_data(data)

    return web.json_response(response_data.get_json_obj())


@routes.get('/api/v1/cpu_middle')
async def get_middle_cpu_info(request):
    data, is_err = get_cpu_info_middle_list()
    if is_err:
        response_data = make_response_error("Error get cpu info")
    else:
        response_data = make_response_data(data)

    return web.json_response(response_data.get_json_obj())
