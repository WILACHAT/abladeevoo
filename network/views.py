from __future__ import print_function

from enum import unique
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import Http404
from django.shortcuts import redirect, render
from django.urls import reverse
from .models import User, Reservation, Reviews, Postandmessage, Userinfo, Requesteddara, Views, FeedBack, Maillistlist, ReportTable, PasswordReset, PasswordAdmin
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
import uuid
from django.db.models import Q, Count, Case, Value, When
import re
from datetime import datetime
import time
from datetime import timedelta  
from django.conf import settings
from django.contrib.auth import login as authd_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth import REDIRECT_FIELD_NAME, get_user_model
from django.contrib.auth.decorators import login_required
import time
import random

import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from pprint import pprint

from celery import Celery
from celery.schedules import crontab
import secrets
import hashlib



UserModel = get_user_model()

import datetime
from datetime import date
from django.db.models import F, Q, When

from django.contrib.auth import views as auth_views
from django.contrib.auth.forms import (
    AuthenticationForm,
    PasswordChangeForm,
    PasswordResetForm,
    SetPasswordForm,
)
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.core.exceptions import ImproperlyConfigured, ValidationError
from django.http import HttpResponseRedirect, QueryDict
from django.shortcuts import resolve_url
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
#from django.utils.deprecation import RemovedInDjango50Warning
from django.utils.http import url_has_allowed_host_and_scheme, urlsafe_base64_decode
import base64
from django.utils.translation import gettext_lazy as _
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView


from django.http import JsonResponse
from datetime import datetime
import json
from json import dumps
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
import cloudinary
import cloudinary.uploader
import cloudinary.api

from cloudinary.api import delete_resources_by_tag, resources_by_tag
from cloudinary.uploader import upload
from cloudinary import CloudinaryVideo

from cloudinary.utils import cloudinary_url
import subprocess
import os
import omise
from django.conf import settings
from django.core.mail import send_mail




omise.api_secret = 'skey_5shjbrowd3pn15m4wsq'


##CELERYBEAT_SCHEDULE = {
  #  "runs-every-30-seconds": {
      #  "task": "tasks.add",
       # "schedule": timedelta(seconds=30),
       # "args": (16, 16)
   # },
#}

#@periodic_task(run_every=crontab(hour=22, minute=57))
def every_monday_morning():
    print("This is run every Monday morning at 7:30")


def current_milli_time():
        return round(time.time() * 1000)

def aboutus(request):
    return render(request, "network/aboutus.html")

def index(request):
    seconds = time.time()
    
    # Configure API key authorization: api-key

    #internet banking
    #chrg_test_5rum3y82hqozzcladoc
    #chrg_test_5rumbtxocxkiobgb6m8

   # charge = omise.Charge.retrieve('chrg_test_5rumbtxocxkiobgb6m8')
    #refund = charge.refund(amount=charge.amount)
    #chrg_test_5rumavrji0q0vxmlyq5
   # 
    print("Time in seconds since the epoch:", seconds)  
    '''OK, so how was the react show suggestion portal done???? 
    essentially first you go to index html here essentially to access index html
    then after that in index html it links to a javascript/react page/ from that js 
    you fetch the allportal url which is a api page (consisting of data
    created in the allportal in views with the help of serialization in models you then
    pack the api into the format you want then send it back to the js using jsonresponse
    then from that on you use the data and input it into ReactDOM render into a react class
    '''
    

   # portals = Portal.objects.all()
    influencers = User.objects.all().filter(influencer_ornot=1)
    
    #influencers = User.objects.values('username').get(influencer_ornot = 1)

  #  print(portals)
    return render(request, "network/index.html", {"portalshown": influencers})

def allstars(request):
    print("at least its here??")
    return render(request, "network/allstars.html")

def functionforsorting(value):

    print("this is value", value)
    newdata = []
    #influencers = User.objects.all().filter(influencer_ornot=1)
    if value == "" or value == "none":
        influencers = Userinfo.objects.filter()
    elif value == "pricehighlow":
        influencers = Userinfo.objects.filter().order_by('-price').exclude(price__isnull=True)

    elif value == "pricelowhigh":
        influencers = Userinfo.objects.filter().order_by('price').exclude(price__isnull=True)

    elif value == "followershighlow":
        print("hi")

    elif value == "followerslowhigh":
        print("hi")

    elif value == "numreviews":
        newlist = []
        review = Reviews.objects.values('user_id_reviewed_id').annotate(dcount=Count('user_id_reviewed_id')).order_by('-dcount')[:10]
        for i in range(len(review)):
            print(review[i]['user_id_reviewed_id'])
            newlist.append(review[i]['user_id_reviewed_id'])
            influencers = Userinfo.objects.filter(influencer_id__in = newlist)

            #print("review count", review[i]['user_id_reviewed_id'])

    elif value == "catinflu":
        influencers = Userinfo.objects.filter(category = 'influencer')
        print(influencers)

    elif value == "catactor":
        influencers = Userinfo.objects.filter(category = 'actor')

    
    elif value == "catathelete":
        influencers = Userinfo.objects.filter(category = 'athelete')

    
    elif value == "catstreamer":
        influencers = Userinfo.objects.filter(category = 'gamer')

    
    elif value == "catothers":
        influencers = Userinfo.objects.filter(category = 'others')


    
    for influencer in influencers:
        puller = influencer.serialize()
        checker = User.objects.filter(id = influencer.influencer_id)

        for i in checker:
            puller["username"] = i.username

        newdata.append(puller)
        newdata = newdata
        return_request = newdata


    return return_request

def allstarsapi(request):
    print("what is going on?")
    if request.method == "POST":
        data = json.loads(request.body)
        if data["type"] == "sort":
            print("this is data sorting value", data['sortingvalue'])
            return_request = functionforsorting(data['sortingvalue'])
        else:
            listofcloseuser = searchyea(data["searchvalue"], "allstarpage")
            print("listofcloser", listofcloseuser)
            influencers = Userinfo.objects.filter(influencer_id__in = listofcloseuser)

            newdata = []
            for influencer in influencers:
                puller = influencer.serialize()
                checker = User.objects.filter(id = influencer.influencer_id)

                for i in checker:
                    puller["username"] = i.username

                newdata.append(puller)

            newdata = newdata
            print("this is newdata", newdata)
            return_request = newdata

    else:
        return_request = functionforsorting("")
  


    return JsonResponse(return_request, safe=False)




def usersetting(request):

  


    return render(request, "network/usersetting.html")
def usersettingapi(request):
    if request.method == "POST":
        data = json.loads(request.body)

        try:
            print("does it even comes in here")
            User.objects.filter(id = request.user.id).update(normal_user_pic = data["profilepic"], first_name = data["firstname"], last_name = data["lastname"]
            ,email = data["email"], username = data["username"])

        except IntegrityError as e:
            error_message = e.__cause__
            error_message = str(error_message)
            print(error_message)
            if "Key (e" in error_message:
                print("in the error")
                return_request = {"error":"mail"}

                return JsonResponse(return_request, safe=False)

            else:
                return_request = {"error":"username"}

                return JsonResponse(return_request, safe=False)

        
 
    
    return_request = {"what":"ngong"}
    normal_user_info = User.objects.filter(id = request.user.id)

    
    data = []

    for i in normal_user_info:
        data.append(i.serialize())
        return_request = {"data":data}

    return JsonResponse(return_request, safe=False)
    
def searchyea(searchvalue, wheresearch):
    print("this is wheresearch", wheresearch)
    listofcloseuser = []
    newinfluencers = User.objects.all().filter(influencer_ornot=1)
    print("this is fucking print")
    print(newinfluencers.count())
    wa = Userinfo.objects.filter()
 
    for i in newinfluencers:
        match = re.search(f"{searchvalue}",i.username, re.IGNORECASE)
        
        if match:
            listofcloseuser.append(i.id)
    
    for a in wa:
        match = re.search(f"{searchvalue}", str(a.profile_fullname), re.IGNORECASE)
        
        if match:
            listofcloseuser.append(a.influencer_id)

   

    
    return listofcloseuser

def inzwerg4jgnsd9aadif67(request):

    #influencer essentially a page that uses serialize to display all the influencers
    '''
    randomnumber = Userinfo.objects.all().count()
    print("randomstuff1", randomnumber)
    if randomnumber <= 9:
        randomstuff  = random.sample(range(1, randomnumber), 5)
        print("randomstuff2", randomnumber)


    else:
        randomstuff  = random.sample(range(1, randomnumber), 9)
        print("randomstuff3", randomnumber)
    '''

    list = []
    randomnumber = Userinfo.objects.all()
    for i in randomnumber:
        list.append(i.influencer_id)

    randomstuff = random.sample(list, 8)
    



    influencers = Userinfo.objects.filter(influencer_id__in = randomstuff)
    checker = Userinfo.objects.all().filter()
    view = Views.objects.values('influencer_id').annotate(dcount=Count('influencer_id')).order_by('-dcount')[:9]
    populardata = []
    newdata = []

    
    
    t1 = current_milli_time()
    for i in view:
        newinfluencers = Userinfo.objects.filter(influencer_id=i["influencer_id"])
        for w in newinfluencers:

            popularpuller = w.serialize()
            popularpuller["profile_picture"] = w.profile_picture
            popularpuller["fullname"] = w.profile_fullname
            users = User.objects.filter(id=i["influencer_id"])
            for user in users:
                popularpuller["username"] = user.username

        

            populardata.append(popularpuller)
    t2 = current_milli_time()
    print("this is the amount of time wasted", t2 - t1)
    #influencers = Views.objects.all()order_by('-pub_date', 'headline')

    if request.method == "POST":
        data = json.loads(request.body)
        if data["searchvalue"] != "":
            listofcloseuser = searchyea(data["searchvalue"], "mainpage")
        else:
            listofcloseuser = randomstuff
            
   
      
            
        influencers = Userinfo.objects.filter(influencer_id__in = listofcloseuser)
            
    for influencer in influencers:
        puller = influencer.serialize()
        checker = User.objects.filter(id = influencer.influencer_id)

        for i in checker:
            puller["username"] = i.username
            
            w = Userinfo.objects.filter(influencer_id = i.id)
            for j in w:
                puller["profile_fullname"] = j.profile_fullname


        newdata.append(puller)

    newdata = newdata

    what = ""
    return_request = {"newdata":newdata, "populardata":populardata}
    return JsonResponse(return_request, safe=False)

def ininfluencer(request, ininfluencer):
    '''the request, ininfluencer -> ininfluencer came from urls.py
     and its value behindininfluence/str:ininfluence 
     *influencer needs to have the same name as the /ininfluencer of url'''
 



   
    return render(request, "network/ininfluencer.html", {'username': ininfluencer})
def gotoinfluencer(request, username, feedtype):
    return_request = {}
    alldata = []
    hidedata = []
    userinfodata = []
    influencerid = User.objects.values('id', 'accountstatus').get(username=username)  

   

    accountstatus = influencerid.get('accountstatus')

    influencerid = influencerid['id']


    viewcheck = Views.objects.filter(viewer_id = request.user.id, influencer_id = influencerid)
    

    if viewcheck.exists():
        print("what")
    else:
        view = Views(viewer_id = request.user.id, influencer_id = influencerid)
        view.save()

    reviewedinfo = Reviews.objects.filter(user_id_reviewed = influencerid)
    averagestars = 0
    for i in reviewedinfo:
        averagestars = i.review_stars + averagestars

    if len(reviewedinfo) == 0:
        reviewnum = 0

    else:
        reviewnum = len(reviewedinfo)
        averagestars = averagestars / reviewnum

    

    print("fadf")
    userinfo = Userinfo.objects.filter(influencer_id = influencerid)

    if userinfo.exists():
        print("info does exist")
        for info in userinfo:
            userinfodata.append(info.serialize())
    else:
        print("doesnt fucking exists")
    
    currentuserid = request.user.id
    sameperson = 0
    if influencerid == currentuserid:
        sameperson = 1

    if feedtype == "main":
            #postandmessage = Postandmessage.objects.filter(poster_id = influencerid)
            
            if sameperson == 1:
                postandmessage = Postandmessage.objects.filter(poster_id = influencerid ,reservation_ofpost__show__icontains=False).order_by('-id')
                for i in postandmessage:
                    alldata.append(i.video)
                    hidedata.append(i.hide)
            else:
                postandmessage = Postandmessage.objects.filter(poster_id = influencerid, hide = 0,reservation_ofpost__show__icontains=False).order_by('-id')[:9]
                for i in postandmessage:
                    alldata.append(i.video)

            #do something
            #query something from the influencer's post and send it back 
    else:
        #can be fixed somehow??
        reviews = Reviews.objects.filter(user_id_reviewed_id = influencerid)
        for i in reviews:
            userreviewer= User.objects.filter(id = i.user_id_reviewer_id,is_active = True)
            for w in userreviewer:
                w.username
                w.normal_user_pic
            

                reviewdict = {"username": w.username, "picture":w.normal_user_pic, "review":i.review}
                break
            alldata.append(reviewdict)
   
    
    return_request = {"username":username, "sameperson": sameperson, "accountstatus": accountstatus, "alldata":alldata, "feedtype":feedtype, "userinfodata":userinfodata, "hidedata":hidedata,
    "reviewnum":reviewnum, "averagestars":averagestars}
        
    
    return JsonResponse(return_request, safe=False)

def editprofile(request):
    if request.method == "POST":

        data = json.loads(request.body)
        if data["type"] == "fullname":
            checker = Userinfo.objects.filter(influencer_id = request.user.id)
            if checker.exists():
                checker.update(profile_fullname=data['idfullname'],
                influencer_id=request.user.id)
        
        else:
            checker = Userinfo.objects.filter(influencer_id = request.user.id)
            if checker.exists():
                checker.update(profile_description=data['iddescription'],
                influencer_id=request.user.id)


   
        
        #else: 
           # userinfo = Userinfo(profile_fullname=data['idfullname'],profile_description=data['iddescription'],
           # first_url=data['idurl1'], second_url=data['idurl2'], third_url=data['idurl3'], influencer_id=request.user.id)
           # userinfo.save()
    

    return_request = {"thebest":"waan"}
    
    return JsonResponse(return_request, safe=False)
def hidepost(request):
    if request.method == "POST":
        data = json.loads(request.body)
        hide = ""
        checker = Postandmessage.objects.filter(poster_id = request.user.id, video = data["publicid"])
        

        if (data["hide"] == "Unhide"):
            checker.update(hide = 0)
            hide = "Hide"

        else:
            checker.update(hide = 1)
            hide = "Unhide"



            
    return_request = {"hide": hide}
    return JsonResponse(return_request, safe=False)

@login_required(login_url='/login') 
 
def book(request, username):
    print("tell me that the thing came here or not")
    currentuserid = request.user.id
    influencerid = User.objects.values('id', 'accountstatus').get(username=username)
    accountstatus = influencerid.get('accountstatus')
    influencerid = influencerid["id"]
    waki = Userinfo.objects.filter(influencer_id = influencerid)
    for i in waki:
        price = int(i.price)


    '''
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        print("this is datetime", data["datetime"])
        #date_time_obj = datetime.strptime(data["datetime"], '%Y-%m-%d')

        bookrequest =  Reservation(typeintro=data['typeintro'],
        tointro=data['tointro'], fromintro=data['fromintro'], typeoccasion=data['typeoccasion'],
        firstinputoccasion=data['firstinputocca'],secondinputoccasion=data['secondinputocca'],
        thirdinputoccasion=data['thirdinputocca'],fourthinputoccasion=data['fourthinputocca'],
        user_id_reserver_id=currentuserid,user_id_influencerreserve_id=influencerid, duedate=data["datetime"], 
        show=data["inputcheck"])
        
        bookrequest.save()
    '''
  
    return render(request, "network/book.html", {'username': username, "price": price * 100, "shittyprice": price, "accountstatus":accountstatus})

def gotobook(request, username):
    return_request = {"username":username}
    return JsonResponse(return_request, safe=False)

def inbox(request):
    currentuser = request.user.id
    
    username = User.objects.values('username').get(id = currentuser)
    username = username["username"]

    return render(request, "network/inbox.html", {"currentuser": currentuser, "username":username})
def gotozjguen484s9gj302g(request, paginationid):

    currentuser = request.user.id
    checkifinfluencer = User.objects.values('influencer_ornot').get(id = currentuser)
    reviewvalue = ""
    checkifinfluencer = checkifinfluencer["influencer_ornot"]

    # DUE DATE 2022-05-01 
    # 
    # MINUS TODAY 2022-05-03
    # TODAY 2022-05-05
    day = date.today() - timedelta(days=2)
    #Reservation.objects.filter(Case(When(completed= False, then=duedate__gte=day))
    
    print("I FUCKING HATE QUERIES")

  #  ngongdaek = Reservation.objects.filter(typeintro=Case(When(completed=False, duedate__gte=day, chargestatus = True)), user_id_reserver = currentuser)
   # for w in ngongdaek:
      #  print("I FUCKING HATE QUERIES", w)

    
   # what = When(completed=False, then='Reservation', duedate__gte=day)
    reserveinfo = Reservation.objects.filter(Q(completed=True) | Q(duedate__gte=day), user_id_reserver = currentuser, chargestatus = True, expired = False)


    type = "inbox"
    hide = 0
    sort = 0
    propicandusername = []
    postandmessageinfo = ""
    if request.method == "PUT":   
        data = json.loads(request.body)
        #FOUND THE PROBLEM AND IT IS HERE ALRIGHT U GOT THIS NEXT DK WHEN data["from"]/data["type "] is wrong
        if data["from"] == "inbox":
            print("cehck data type", data["type"])
            if data["type"] == "myrequesthtml":
                type= "request"
                reserveinfo = Reservation.objects.filter(user_id_influencerreserve = currentuser, completed = False, expired = False, duedate__gte=date.today(), chargestatus = True)
                hide = 0
            #some of this will have to change so yea
            elif data["type"] == "mycompletehtml":
                type= "complete"
                reserveinfo = Reservation.objects.filter(user_id_influencerreserve = currentuser, expired = False, completed = True, chargestatus = True)
                hide = 0

            elif data["type"] == "hidecompleted":
                print("what is it in hidecomltejkldnfljkasdnfkljnasdfkjnd")
                type= "inbox"
                hide = 1

                reserveinfo = Reservation.objects.filter(user_id_reserver = currentuser, expired = False, completed = False, duedate__gte=day, chargestatus = True)
                for i in reserveinfo:
                    print(i.id)
                    print(i.reviewcompleted)

            elif data["type"] == "mysorttime":
                reserveinfo = Reservation.objects.filter(user_id_influencerreserve = currentuser, expired = False, completed = False, duedate__gte=date.today(), chargestatus = True).order_by('duedate')
                type = "request"
                for i in reserveinfo:
                    print(i.duedate)
                    hide = 0
                    sort = 1


        elif data["from"] == "eachreserve":
            print("data", data)
            print("ide", data["reservationid"])
            if data["type"] == "request":
                type = "request"


            reserveinfo = Reservation.objects.filter(id = data["reservationid"], expired = False, chargestatus = True)

            for i in reserveinfo:
            #print("reserveeeeeeeeeeeeeeeee;leme;lme;lme;emleeeeeee", reserveinfo.user_id_reserver_id)
                userreviewer= User.objects.filter(id = i.user_id_reserver_id ,is_active = True)
            
                for w in userreviewer:
                    propicandusername.append(w.username)
                    propicandusername.append(w.normal_user_pic)
                    break
                    

            #YOU ARE RIGHT HERE
            
            postandmessageinfo = Postandmessage.objects.filter(reservation_ofpost_id = data["reservationid"])
            try:
                reviewvalue = Reviews.objects.values('review').get(reservation_foreign_id = data["reservationid"])
                reviewvalue = reviewvalue["review"]
            except ObjectDoesNotExist:
                reviewvalue = ""

    newdata = []
    forpostdata = []



    # you are currently here right now waan next step is to do this

    for post in postandmessageinfo:
        posta = str(post.post_info)
        videoa = post.video

        forpostdata.append(posta)
        forpostdata.append(videoa)

    
    for reserve in reserveinfo:
        newdata.append(reserve.serialize())

    pagination = Paginator(newdata, 9)
    
    

    paginationid = int(paginationid)
    print("why does this not change", paginationid)
    num_pages = pagination.num_pages
    print("number of page: ", num_pages)


    data = []


    return_request = {"checkifinfluencer": checkifinfluencer, "data": newdata, "type":type, 
    "forpostdata":forpostdata, "reviewvalue":reviewvalue, "num_pages":num_pages, "paginationid":paginationid, "data":data, "hide":hide,"sort":sort, "propicandusername":propicandusername}

    print("paginationid before doing the work", paginationid)
    for row in pagination.page(paginationid).object_list:  
        return_request["data"].append(row)
    
    return JsonResponse(return_request, safe=False)

def eachreserve(request, reservationid):
    reservationid = ""
    if request.method == "POST":
        data = json.loads(request.body)
        print("this is the id to fetch whatever", data)
        print("this is the id to fetch whatever")

        reservationid = data["reservationid"]
    return render(request, "network/eachreserve.html", {"reservationid":reservationid})

    
def gotoeachreserve(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print("just checking mofo", data["type"])
        #print("data value", data["value"])
        #print("data reserve id", data["reserveid"])

        if data["type"] == "submitvdo":
            print("inside the submit video")
            postandmessage = Postandmessage(post_info = data["value"], 
            reservation_ofpost_id = data["reserveid"], video = data["videoid"], poster_id = request.user.id)
            postandmessage.save()
            today = date.today()
            

            heho = Userinfo.objects.filter(influencer_id = request.user.id)
            for i in heho:
                omiserecipent = i.omiserecipent

            heho = Reservation.objects.filter(id = data["reserveid"])
            for w in heho:
                price = int(w.chargedprice)

            

            price = (price * 0.85)  * 100
            recipientinfluencer = omise.Recipient.retrieve(omiserecipent)
            transfer = omise.Transfer.create(
            amount=price, recipient=recipientinfluencer.id,paid=True, sent=True)
            
     #       send_mail(
     #   'Your Video is done',
     #   "you are cool, and you are doing good",
     #   "vidma@vidma.tv",
     #   ['waanwaanwilachat@gmail.com'],
     #   )

            reservethingy = Reservation.objects.filter(id=data["reserveid"], expired = False)
            for i in reservethingy:
                reservethingy = i.user_id_reserver_id
                reserveinfluencer = i.user_id_influencerreserve_id
            reservethingy = User.objects.filter(id=reservethingy)
            influencerthingy = User.objects.filter(id=reserveinfluencer)

            for i in reservethingy:
                emailofuser = i.email
                usernameofuser = i.username
            for i in influencerthingy:
                usernameofinfluencer = i.username


            

            
            Reservation.objects.filter(id=data["reserveid"]).update(completed = True, completiondate = today)
            
            configuration = sib_api_v3_sdk.Configuration()
            configuration.api_key['api-key'] = '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'

      


            api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
            sender = {"name":"Vidma","email":"vidma@vidma.tv"}
            to = [{"email":emailofuser,"name":usernameofuser}]
            templateId = 1
       
            send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(to=to,template_id = templateId, sender=sender, params={"name": usernameofinfluencer})
       

            try:
                api_response = api_instance.send_transac_email(send_smtp_email)
                print(api_response)
            except ApiException as e:
                print("Exception when calling SMTPApi->send_transac_email: %s\n" % e)
        
        elif data["type"] == "submitreview":
            print("is it in submitreview?")

            userid = User.objects.values('id').get(username = data["influencername"])
            userid = userid["id"]
            print("this is userid", userid)
            Reservation.objects.filter(id=data["reserveid"]).update(reviewcompleted = True)
            reviews = Reviews(review = data["value"], user_id_reviewer_id = request.user.id,
            user_id_reviewed_id = userid, reservation_foreign_id = data["reserveid"], review_stars = data["reviewstars"])
            reviews.save()

    elif request.method == "PUT":
        data = json.loads(request.body)
        #there needs to be a mail for report and for mai ao ok??
        if data["type"] == "report":
            print("print for no reason")
            reporttable = ReportTable(reservation_foreign_id = data["reservationid"], influencer = data["influencer"],
            requester = data["requester"], report_value = data["value"])
            reporttable.save()
            Reservation.objects.filter(id=data["reservationid"]).update(expired = True)

        else:
            print("unlucky really")
            Reservation.objects.filter(id=data["reservationid"]).update(expired = True)



    return_request = {"reservationid":"hi"}

    return JsonResponse(return_request, safe=False)




def legal(request):
    return render(request, "network/legal.html")

def setting(request):
    if request.method == "POST":
        return_response = 1
        print(request.body)
        print(request.body)
        what = str(request.body)
        print("important", what)
        if what == "b'delete'":
            print("delete")
            #User.objects.filter(id = request.user.id).delete()
        elif what == "b'pause'":
            User.objects.filter(id = request.user.id).update(accountstatus = 3)
            return JsonResponse(return_response, safe=False)

        
        else:
            User.objects.filter(id = request.user.id).update(accountstatus = 1)
            return JsonResponse(return_response, safe=False)



    return render(request, "network/helpcenter.html")

#TWO BUTTONS WHICH IS TWO DIFFERENT FUNCTION IN THE REACT WAY


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

    

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        print("what pls work", request.POST["g-recaptcha-response"])
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "password"
            })
        if request.POST["g-recaptcha-response"] == "":
            return render(request, "network/register.html", {
                "message": "captcha"
            })


        # Attempt to create new user
        try:
            print("does it even comes in here")

            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError as e:
            print("probably not")
            error_message = e.__cause__
            print(error_message)
            error_message = str(error_message)
            if "Key (e" in error_message:
                print("mailerror")
                return render(request, "network/register.html", {
                "message": "email"
            })

            else:
                print("messageerror")
                return render(request, "network/register.html", {
                "message": "username"
            })

           
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")




def forupload(request, type):
    if request.method == "POST":
        return_response = {}
        print("is this the type", type)
        if 'media' in request.FILES.keys():
            id = uuid.uuid1()
            uniquepostingid = str(id) + str(request.user.id)
            #uniquepostingid = uniquepostingid.split('.')[0]
           # print("check wtf is going on with id", uniquepostingid)
            print("this is THE TYPE", type)
            if type == "video":
                print("BUGGY IN VIDEO 1")

                print("inside video?")
                request.FILES['media']

                uploaded_response = upload_files_videos(request.FILES['media'], uniquepostingid)
            
                return_response = {"url": uploaded_response['public_id']}

            elif type == "image":
                print("BUGGY IN IMAGE 2")

                print("whawhatwha", uniquepostingid)
                uploaded_response = upload_files(request.FILES['media'], uniquepostingid)
                return_response = {"url": uploaded_response['resources'][0]['url']}

            elif type == "imageinprofile":
                print("BUGGY IN IMAGE 3")

                uploaded_response = upload_files(request.FILES['media'], uniquepostingid)
                print("this is something wrong lolololol", uploaded_response)
                if uploaded_response != "error":
                    checker = Userinfo.objects.filter(influencer_id = request.user.id)
                    if checker.exists():
                        userinfo = checker.update(profile_picture=uploaded_response['resources'][0]['public_id'])
        
                    else:
                        userinfo = Userinfo(profile_picture=uploaded_response['resources'][0]['public_id'], influencer_id=request.user.id)
                        userinfo.save()
                    User.objects.filter(id = request.user.id).update(normal_user_pic = uploaded_response['resources'][0]['public_id'])
        
                    return_response = {"url": uploaded_response['resources'][0]['public_id']}
                else:
                    return_response = {"error": "pic but upload vid"}
            elif type == "imageinprofilefornormal":
                uploaded_response = upload_files(request.FILES['media'], uniquepostingid)
                if uploaded_response != "error":
                    User.objects.filter(id = request.user.id).update(normal_user_pic = uploaded_response['resources'][0]['public_id'])
                    return_response = {"url": uploaded_response['resources'][0]['public_id']}
                else:
                    return_response = {"error": "pic but upload vid"}
            else:
                print("BUGGY IN 4")
                uploaded_response = upload_files_videos(request.FILES['media'], uniquepostingid)
                checker = Userinfo.objects.filter(influencer_id = request.user.id)
                if checker.exists():
                     userinfo = checker.update(profile_video=uploaded_response['public_id'])
    
                else:
                    userinfo = Userinfo(profile_video=uploaded_response['public_id'], influencer_id=request.user.id)
                    userinfo.save()
                return_response = {"url": uploaded_response['public_id']}

            
    return JsonResponse(return_response, safe=False)

def dump_response(response):
    print("Upload response:")
    for key in sorted(response.keys()):
        print("  %s: %s" % (key, response[key]))

def upload_files(file, fileid):
    print("this is in upload_files")
    try:
        cloudinary.uploader.upload(file, public_id = fileid)
        successful = cloudinary.api.resources_by_ids([fileid])

    except:
        successful = "error"
        
    
    
    return successful

def upload_files_videos(file, fileid):
 
    cloudinary.uploader.upload_large(file, resource_type = "video", public_id = fileid, chunk_size = 6000000)

    successful = cloudinary.api.resource(resource_type = "video", public_id = fileid)
    
    return successful

def HAC1zaAnMB(request, token):
    validlink = False
    hashedtoken = hashlib.sha256(token.encode()).hexdigest()
    #QDTja2YryNKgxbEGiaLNDYzHiXHSWvUxwARbVBTk1DckmyDjm8rMDICMZpwi4MWx80H-FLox2qAD6fTAdSVLqg

    print("justincase", hashedtoken)
    expirationtime = datetime.now().strftime('%Y-%m-%d %H:%M')
    prdatabase = PasswordAdmin.objects.filter(token = hashedtoken)

    for i in prdatabase:
        idofuser = i.user_id
        expirationtimebefore = i.expiration


    checkifexist = prdatabase.count()

    if checkifexist == 1 and expirationtimebefore > expirationtime:
        validlink = True
        dayminus = date.today() - timedelta(days=1)
        ok = Reservation.objects.filter(duedate = dayminus).count()

        alltheinfo = Requesteddara.objects.filter(daradone = 0)
  



        print("athheinfo", alltheinfo)
        data = []
        
  


        refundnum = ok
        return render(request, "network/superaccess.html", {"validlink": validlink, "refundnum":refundnum, "alltheinfo":alltheinfo})

    else: 
        validlink = False

    return render(request, "network/superaccess.html", {"validlink": validlink})


def superusersuperpassword(request):
        if request.method == "POST":
            yea = request.POST["superuserpassword"]
            if yea == "p;e_HDfdZVJRulcwBYU{~s*TWQLnv|":
                print("clutch")
                checkuser = User.objects.filter(id = request.user.id)
                for i in checkuser:
                    if i.is_superuser == 1:
                        print("real hihi")
                        
                
                        token = secrets.token_urlsafe(65)
                        
                        hashedtoken = hashlib.sha256(token.encode()).hexdigest()

                        expirationtime = datetime.now() + timedelta(minutes = 10)
                        myobj = expirationtime.strftime('%Y-%m-%d %H:%M')
                        print(myobj)

                        passwordadmin = PasswordAdmin(user_id = request.user.id, token = hashedtoken, expiration = myobj)
                        passwordadmin.save()

                        linktoreset = 'https://plankton-app-d8rml.ondigitalocean.app/HAC1zaAnMB/' + token


                        
                        configuration = sib_api_v3_sdk.Configuration()
                        configuration.api_key['api-key'] = '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'

                        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
                        subject = "My Subject"
                        html_content = "<html><body><h1 style='color:#FF336F; font-family:'Bangers';'>VIDMA!</h1><h1>super user super user</h1><a href=" + linktoreset + ">กดเพื่อไปดู</a></body></html>"
                        sender = {"name":"Vidma","email":"vidma@vidma.tv"}
                        to = [{"email":"waanwaanwilachat@hotmail.com","name":"Wilachat Weesakul"}]

                        headers = {"Some-Custom-Name":"unique-id-1234"}
                        send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(to=to, headers=headers, html_content=html_content, sender=sender, subject=subject)

                        try:
                            api_response = api_instance.send_transac_email(send_smtp_email)
                            print(api_response)
                        except ApiException as e:
                            print("Exception when calling SMTPApi->send_transac_email: %s\n" % e)
                        
                        return render(request, "network/superuserpassword.html")

            else:
                print("clutchfail")



        return render(request, "network/superuserpassword.html")






def superuserrefund(request):
   
    if request.method == "POST":
        dayminus = date.today() - timedelta(days=1)
        ok = Reservation.objects.filter(duedate = dayminus).count()

        refundnum = ok
        print("hihihi")
        
        
        day = date.today() 
        dayminus = date.today() - timedelta(days=1)
        ok = Reservation.objects.filter(duedate = dayminus)
        print(ok)
    
        for i in ok:
            print("this is reservation", i.omisecharge)
                    
            charge = omise.Charge.retrieve(i.omisecharge)
            amounttorefund = charge.amount
            refund = charge.refund(amount=amounttorefund)
        
        
    
    return render(request, "network/superaccess.html", {"refundnum":refundnum})

def superusermail(request):
    maillist = Maillistlist.objects.filter()
    stu = {
        "maillistinfo":maillist
    }
    return render(request, "network/superusermail.html", stu)



def superuserfeedback(request):
    feedback = FeedBack.objects.filter()
    stu = {
        "feedbackinfo": feedback
    }
  
    return render(request, "network/superuserfeedback.html", stu)
def superuserreport(request):
    report = ReportTable.objects.filter()
    stu = {
        "reportlist":report
    }
  
    return render(request, "network/superuserreport.html", stu)

def superuser(request):
  


    if request.method == "POST":
        Requesteddara.objects.filter(requested_user_id = request.POST["idofuser"]).update(daradone = 1)
        User.objects.filter(id = request.POST["idofuser"]).update(influencer_ornot = 1)

        
        userinfo = Userinfo(profile_fullname=request.POST["firstname"], influencer_id=request.POST["idofuser"], category = request.POST["category"])
        userinfo.save()
        


    return render(request, "network/superaccess.html")

def dara(request):
    if request.method == "POST":
        name = request.POST["name"]
        email = request.POST["email"]
        phonenumber = request.POST["phonenumber"]
        findwhere = request.POST["findwhere"]
        usernamefindwhere = request.POST["usernamefindwhere"]
        followerfindwhere = request.POST["followerfindwhere"]
        category = request.POST["category"]
        print("this is for category", category)

        try:

            requestdara = Requesteddara(name = name,email = email, phone = phonenumber,
            find = findwhere, findusername = usernamefindwhere, followernum = followerfindwhere, 
            requested_user_id = request.user.id, category = category)
            requestdara.save()
            return render(request, "network/dara.html", {
            "message": "success"})

        except IntegrityError as e:
            return render(request, "network/dara.html", {
                "message": "error"})

        

    return render(request, "network/dara.html")

def feedbackmaillist(request):
    return_response = "ye"
    if request.method == "POST":
        data = json.loads(request.body)
  
        if data["type"] == "feedbackinputid":
        
            feedback = FeedBack(feedback = data["value"])
            feedback.save()
        
        else:
            maillist = Maillistlist(mail = data["value"])
            maillist.save()
  
        
    return JsonResponse(return_response, safe=False)

def payment(request):
    print("wtfplstellme1")

    
    heho = Userinfo.objects.filter(influencer_id = request.user.id)
    for i in heho:
       
        if i.omiserecipent == None:
            type = "notexist"
        else:
            type = "exist"


    return render(request, "network/payment.html", {"type": type})

def paymentsetupapi(request):
    return_response = "hi"
    print("hisdfmsadfkms")
    checker = ""

    if request.method == "POST":
        print("we are one fuck u")
        data = json.loads(request.body)
        haha = Userinfo.objects.filter(influencer_id = request.user.id)
        for i in haha:
            if i.omiserecipent and i.price == None:
                checker = "new"
                omiserecipent = i.omiserecipent
                print("we are", omiserecipent)
            else:
                print("whatwhat")
                price = i.price
                omiserecipent = i.omiserecipent

        if data["type"] == "exist":
            try:
                recipient = omise.Recipient.retrieve(omiserecipent)
                bankinfo = recipient.bank_account
                return_response = {"name" : bankinfo.name, "brand" : bankinfo.brand, "number":bankinfo.last_digits, "price": price, "email": recipient.email}


            except:
                print("An exception occurred")
                return_response = {"name" : "awkward"}

           
       
        elif data["type"] == "notexistpost":
            print("is the shit came in here")
            recipient = omise.Recipient.create(
                name= data["fullname"],
                email= data["email"],
                type="individual",
                bank_account=dict(brand=data["bank"], number=data["accountnumber"], name=data["fullname"]),
            )
            print("this is id", recipient.id)
            bankinfo = recipient.bank_account

            print("WILACHAT WEESAKUL IS ON FIRE")
            print(request.user.id)

            if Userinfo.objects.filter(influencer_id=request.user.id).exists():
                Userinfo.objects.filter(id = request.user.id).update(omiserecipent = recipient.id)
            else:
                userinfo = Userinfo(influencer_id = request.user.id, omiserecipent = recipient.id)
                userinfo.save()

  

            return_response = {"name" : bankinfo.name, "brand" : bankinfo.brand, "number":bankinfo.last_digits, "email": recipient.email, "price":data["price"], "lol":"dumb"}

            Userinfo.objects.filter(influencer_id = request.user.id).update(omiserecipent = recipient.id, price = data["price"])

        elif data["type"] == "existpostupdate":
            recipient = omise.Recipient.retrieve(omiserecipent)
            recipient.update(
                name= data["fullname"],
                email= data["email"],
                type="individual",
                bank_account=dict(brand=data["bank"], number=data["accountnumber"], name=data["fullname"]),
            )
            bankinfo = recipient.bank_account
            return_response = {"name" : bankinfo.name, "brand" : bankinfo.brand, "number":bankinfo.last_digits, "email": recipient.email}

            Userinfo.objects.filter(influencer_id = request.user.id).update(omiserecipent = recipient.id)

        elif data["type"] == "paymentchange":
            print("data", data["price"])
            return_response = {"price" : data["price"]}
            Userinfo.objects.filter(influencer_id = request.user.id).update(price = data["price"])

        else:
            return_response = {"new":checker}
    return JsonResponse(return_response, safe=False)

def password_reset(request):
    if request.method == "POST":
        print("submited email")
        email = request.POST["email"]
        

        okchecker = User.objects.filter(email = email)
        for i in okchecker:
            username = i.username
            idofuser = i.id
        okchecker = okchecker.count()

        #reset token
      

        if okchecker == 0:
            return HttpResponseRedirect(reverse("password_reset_done"))

        else:
            token = secrets.token_urlsafe(64)
            #hashed version of token that needs to be store in db

            hashedtoken = hashlib.sha256(token.encode()).hexdigest()
        
            expirationtime = datetime.now() + timedelta(minutes = 10)
            myobj = expirationtime.strftime('%Y-%m-%d %H:%M')
            print(myobj)
            passwordreset = PasswordReset(user_id = idofuser, token = hashedtoken, expiration = myobj)
            passwordreset.save()

            linktoreset = 'https://plankton-app-d8rml.ondigitalocean.app/resetpass/' + token
            
            configuration = sib_api_v3_sdk.Configuration()
            configuration.api_key['api-key'] = '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'

            api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
            sender = {"name":"Vidma","email":"vidma@vidma.tv"}
            to = [{"email":email,"name":username}]
            templateId = 3
       
            send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(to=to,template_id = templateId, sender=sender, params={"username": username, "link":linktoreset})

            try:
                api_response = api_instance.send_transac_email(send_smtp_email)
                print(api_response)
            except ApiException as e:
                print("Exception when calling SMTPApi->send_transac_email: %s\n" % e)
            
            
            return HttpResponseRedirect(reverse("password_reset_done"))


    return render(request, "network/password_reset_form.html")

def resetpass(request, token):
    print("this is in resetpass")
    hashedtoken = hashlib.sha256(token.encode()).hexdigest()
    #QDTja2YryNKgxbEGiaLNDYzHiXHSWvUxwARbVBTk1DckmyDjm8rMDICMZpwi4MWx80H-FLox2qAD6fTAdSVLqg

    print("justincase", hashedtoken)
    expirationtime = datetime.now().strftime('%Y-%m-%d %H:%M')
    prdatabase = PasswordReset.objects.filter(token = hashedtoken)

    for i in prdatabase:
        idofuser = i.user_id
        expirationtimebefore = i.expiration


    checkifexist = prdatabase.count()

    if checkifexist == 1 and expirationtimebefore > expirationtime:
        validlink = True
    else: 
        validlink = False

    if request.method == "POST":
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/password_reset_confirm.html", {
                "message": "password"
            })

        expirationtime = datetime.now().strftime('%Y-%m-%d %H:%M')
        if expirationtimebefore > expirationtime:
            u = User.objects.get(id=idofuser)
            u.set_password(password)
            u.save()
            return HttpResponseRedirect(reverse("password_reset_complete"))

            
        else:
            return render(request, "network/password_reset_confirm.html", {
            "message": "timeout"
        })




    #checkeverythinghere
    return render(request, "network/password_reset_confirm.html", {"validlink":validlink})

def password_reset_done(request):
    return render(request, "network/password_reset_done.html")

def password_reset_complete(request):
    return render(request, "network/password_reset_complete.html")

def paymentresponse(request):
    chargestuff = Reservation.objects.filter(user_id_reserver_id=request.user.id).order_by('-creationtime')[0]

    print(chargestuff.id)
    print(chargestuff.omisecharge)
    print(chargestuff.paymentmethod)


    chargo = chargestuff.omisecharge

    
    charge = omise.Charge.retrieve(chargo)
    print("what is charge", charge)
    print("what is charge id", charge.id)
    print("this is to check the status eh", charge.status)

    print(charge.status)



    if chargestuff.paymentmethod == "tm":
        if charge.status == "successful" or charge.status == "pending":
            status = "successful"
            Reservation.objects.filter(user_id_reserver_id=request.user.id).update(chargestatus = True)
        else:
            status = "fail"

    else:
        if charge.status == "successful":
            status = "successful"
            Reservation.objects.filter(user_id_reserver_id=request.user.id).update(chargestatus = True)

        else:
            status = "fail"

    return render(request, "network/paymentresponse.html", {"status":status})

def paymentapi(request, username):
    return_response = "hi"
    hehe = ""
    print("ypyp")
    if request.method == "POST":
        print("this is allrequest.post", request.POST)
        
        influencerid = User.objects.values('id').get(username=username)
        influencerid = influencerid["id"]
        chek = Userinfo.objects.filter(influencer_id = influencerid)
        chargedprice = 0
        for i in chek:
            chargedprice = int(i.price)
            price = chargedprice * 100
            
        data = json.loads(request.body)
        print("wilachat jong jaroen")

        print(data["data"])
        print("token", data["token"])
        dictnow = json.loads(data["data"])
        print(dictnow["typeintro"])
        print("this is the payment method", data["paymentmethod"])

        token = data["token"]
        if token.startswith('tokn_'):
            charge = omise.Charge.create(
            amount=price,
            return_uri="https://plankton-app-d8rml.ondigitalocean.app/paymentresponse",
            currency="thb",
            card=token)
            
        else:
            omise.api_version = "2019-05-29"
            charge = omise.Charge.create(
            amount=price,
            currency="thb",
            capture=True,
            return_uri = "https://plankton-app-d8rml.ondigitalocean.app/paymentresponse",
            source=token
            )
            print("fuck you", charge.authorize_uri)
            if data["paymentmethod"] == "pp":
                ye = charge.source
                lol = ye.scannable_code 
                print("this is image", lol.image)
                hehe = lol.image
                print(hehe.download_uri)

       
        id = uuid.uuid1()
        uniqueid = str(id) + str(request.user.id)

        bookrequest =  Reservation(typeintro=dictnow['typeintro'],
        tointro=dictnow['tointro'], fromintro=dictnow['fromintro'], typeoccasion=dictnow['typeoccasion'],
        firstinputoccasion=dictnow['firstinputocca'],secondinputoccasion=dictnow['secondinputocca'],
        thirdinputoccasion=dictnow['thirdinputocca'],fourthinputoccasion=dictnow['fourthinputocca'],orderid = uniqueid,
        user_id_reserver_id=request.user.id,user_id_influencerreserve_id=influencerid, duedate=dictnow["datetime"], 
        show=dictnow["inputcheck"], omisecharge = charge.id, paymentmethod = data["paymentmethod"], chargedprice = chargedprice)
        
        bookrequest.save()
        if data["paymentmethod"] == "pp":
            print("this is scannable coe", hehe.download_uri)
            return JsonResponse(hehe.download_uri, safe=False)


        else:
            return JsonResponse(charge.authorize_uri, safe=False)



    return redirect("paymentresponse")

def errorpage(request):
    return render(request, "network/errorpage.html")


