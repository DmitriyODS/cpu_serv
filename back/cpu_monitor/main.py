import asyncio

from aiohttp import web

from api import routes
from middlewares import cors_middleware
from service import update_db_data_cpu_info


async def init_app():
    app = web.Application()
    app.add_routes(routes)
    app.middlewares.append(cors_middleware)

    asyncio.create_task(update_db_data_cpu_info())

    return app


def main():
    app = init_app()
    web.run_app(app, port=8080)


if __name__ == '__main__':
    main()
