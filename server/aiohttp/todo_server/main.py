from aiohttp import web
import nanoid

routes = web.RouteTableDef()

TASKS = [
    {'id': 'todo-0', 'name': 'Eat', 'completed': True},
    {'id': 'todo-1', 'name': 'Sleep', 'completed': False},
    {'id': 'todo-2', 'name': 'Repeat', 'completed': False},
]

APP_KEY_TASKS = 'todo_tasks'


@routes.get('/task')
async def handle_get_task(request):
    tasks = request.app[APP_KEY_TASKS]
    return web.json_response({APP_KEY_TASKS: tasks})


@routes.get('/task/{task_id}')
async def handle_get_task_by_id(request):
    task_id = request.match_info.get('task_id', None)
    tasks = request.app[APP_KEY_TASKS]
    try:
        task = tasks[task_id]
        return web.json_response(task)
    except KeyError:
        return web.Response(status=404)


@routes.post('/task')
async def handle_post_task(request):
    data = await request.json()
    tasks = request.app[APP_KEY_TASKS]
    task_id = nanoid.generate()
    task = {'id': task_id}
    try:
        task['name'] = data['name']
        task['completed'] = data['completed']
        tasks[task_id] = task
        return web.json_response(task)
    except KeyError:
        return web.Response(status=400)


@routes.put('/task/{task_id}')
async def handle_put_task(request):
    task_id = request.match_info.get('task_id', None)
    tasks = request.app[APP_KEY_TASKS]
    try:
        task = tasks[task_id]
    except KeyError:
        return web.Response(status=404)
    data = await request.json()
    if 'name' in data:
        task['name'] = data['name']
    if 'completed' in data:
        task['completed'] = data['completed']
    tasks[task_id] = task
    return web.json_response(status=200)


@routes.delete('/task/{task_id}')
async def handle_put_task(request):
    task_id = request.match_info.get('task_id', None)
    tasks = request.app[APP_KEY_TASKS]
    if task_id is None or task_id not in tasks:
        return web.Response(status=404)
    del tasks[task_id]
    return web.json_response(status=200)


def main():
    app = web.Application()
    app.add_routes(routes)
    # https://docs.aiohttp.org/en/stable/web_advanced.html#application-s-config
    tasks = {}
    for task in TASKS:
        tasks[task['id']] = task
    app[APP_KEY_TASKS] = tasks
    web.run_app(app)


if __name__ == '__main__':
    main()
