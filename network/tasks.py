
from __future__ import absolute_import, unicode_literals

from celery import shared_task
from celery import Celery
import omise
from datetime import date, timedelta
from .models import User, Reservation





@shared_task
def refund_user():
    day = date.today() 
    dayminus = date.today() - timedelta(days=1)
    ok = Reservation.objects.filter(duedate = dayminus)
    print(ok)
  
    for i in ok:
        print("this is reservation", i.omisecharge)
                
        charge = omise.Charge.retrieve(i.omisecharge)
        amounttorefund = charge.amount
        refund = charge.refund(amount=amounttorefund)


       # charge = omise.Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
       # refund = charge.refund(amount=10000)


    #print(day)
   # print(dayminus)
   # charge = omise.Charge.retrieve("chrg_test_5rtm4r4uygzmoz6teo8")
   # print(charge.amount)@shared_task
@shared_task
def checkwork():
    print("hi")