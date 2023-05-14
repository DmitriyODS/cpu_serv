import asyncio

import psutil

from models.cpu_info import CPUInfo
from store.db import Store

store = Store('./store/root_db')


def get_cur_status_cpu():
    cpu = psutil.cpu_percent()
    return cpu


async def update_db_data_cpu_info():
    cpu_info = CPUInfo()
    count_err = 0

    while True:
        cpu_info.value = get_cur_status_cpu()
        r = store.add_new_cpu_info(cpu_info)

        if r == 0:
            count_err += 1
            print("Error add new cpu info")

            if count_err > 5:
                print("Error add new cpu info more than 5 times")
                return
        else:
            count_err = 0

        await asyncio.sleep(5)


def get_cpu_info_line_list() -> (list, bool):
    data = store.get_cpu_info_for_last_hour()
    if len(data) == 0:
        return [], False

    res_data = [data[0].value]
    for i in range(1, len(data)):
        sub_res = data[i].date_unix - data[i - 1].date_unix

        if sub_res > 10:
            for _ in range(sub_res // 5):
                res_data.append(-1)

        res_data.append(data[i].value)

    return res_data, False


def get_cpu_info_middle_list() -> (list, bool):
    data = get_cpu_info_line_list()[0]
    res_data = []

    cur_index = 0
    while cur_index < len(data):
        if data[cur_index] == -1:
            cur_index += 1
            continue

        middle_sum = 0
        err_calc = False
        for _ in range(12):
            middle_sum += data[cur_index]
            cur_index += 1

            if cur_index >= len(data):
                err_calc = True
                break

            if data[cur_index] == -1:
                cur_index += 1
                err_calc = True
                break

        if err_calc:
            continue

        middle_sum /= 12
        res_data.append(round(middle_sum))

    return res_data, False
