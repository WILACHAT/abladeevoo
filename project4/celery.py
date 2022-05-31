
from __future__ import absolute_import, unicode_literals

import os

from celery import Celery
from datetime import datetime
from celery.schedules import crontab
from datetime import timedelta



BROKER_URL = 'django://'
timezone = 'Asia/Bangkok'


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project4.settings')

app = Celery('project4')

app.config_from_object('django.conf:settings', namespace='CELERY')


app.conf.beat_schedule = {
    'add-every-5-seconds': {
        'task': 'network.tasks.refund_user',
       #utc thai time -8
        'schedule': crontab(minute=2, hour=16)
    },
    'printhithatisall': {
        'task': 'network.tasks.checkwork',
        'schedule': timedelta(seconds=30)

    }
}

app.conf.timezone = 'UTC'

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print("fuck me hard")
    print('Request: {0!r}'.format(self.request))
