from enum import unique
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import Http404
from django.shortcuts import redirect, render
from django.urls import reverse
from .models import User, Reservation, Reviews, Postandmessage, Userinfo, Requesteddara, Views, FeedBack, Maillistlist, ReportTable
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

from celery import Celery
from celery.schedules import crontab


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
from django.contrib.auth.decorators import login_required
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




omise.api_secret = 'skey_test_5rsxnq9a82ys6gtgf92'


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
    

def inzwerg4jgnsd9aadif67(request):

    #influencer essentially a page that uses serialize to display all the influencers
    influencers = User.objects.all().filter(influencer_ornot=1)[:10]
    checker = Userinfo.objects.all().filter()
    view = Views.objects.values('influencer_id').annotate(dcount=Count('influencer_id')).order_by('-dcount')[:10]
    populardata = []
    
    
    t1 = current_milli_time()
    for i in view:
        print(i["influencer_id"])
        newinfluencers = Userinfo.objects.filter(influencer_id=i["influencer_id"])
        for w in newinfluencers:

            popularpuller = w.serialize()
            popularpuller["profile_picture"] = w.profile_picture
            popularpuller["fullname"] = w.profile_fullname
            users = User.objects.filter(id=i["influencer_id"])
            for user in users:
                popularpuller["username"] = user.username

            print(w.profile_picture)
            print(w.profile_fullname)

            populardata.append(popularpuller)
    t2 = current_milli_time()
    print("this is the amount of time wasted", t2 - t1)
    #influencers = Views.objects.all()order_by('-pub_date', 'headline')

    if request.method == "POST":
        print("ok in here forsearch")
        data = json.loads(request.body)
        searchvalue = data["searchvalue"]
        print("this is the search value", searchvalue)
        if searchvalue != "":

            listofcloseuser = []
            newinfluencers = User.objects.all().filter(influencer_ornot=1)
            print("this is fucking print")
            print(newinfluencers.count())
            wa = Userinfo.objects.filter()
          #  for q in wa:
           #     print("hehe", q.profile_fullname)

           # for z in newinfluencers:
           #     print("hehe",z.username)


           # print(len(wa))

            #for i,a in zip(newinfluencers, wa):
             #   match = re.search(f"{searchvalue}",i.username, a.profile_fullname)
                
              #  if match:
               #     listofcloseuser.append(i.id)


            for i in newinfluencers:
                match = re.search(f"{searchvalue}",i.username, re.IGNORECASE)
                
                if match:
                    listofcloseuser.append(i.id)
            
            for a in wa:
                match = re.search(f"{searchvalue}", str(a.profile_fullname), re.IGNORECASE)
                
                if match:
                    listofcloseuser.append(a.influencer_id)

            
            
            influencers = User.objects.filter(id__in = listofcloseuser)
            
       
    newdata = []
    for influencer in influencers:
        puller = influencer.serialize()
        
        checker = Userinfo.objects.filter(influencer = puller["id"])
        for i in checker:
            puller["profile_picture"] = i.profile_picture
            puller["fullname"] = i.profile_fullname


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
    
    print("here it comes")
    print(request.user.id)
    print(influencerid)

    print(viewcheck)
    if viewcheck.exists():
        print("what")
    else:
        view = Views(viewer_id = request.user.id, influencer_id = influencerid)
        view.save()

    reviewedinfo = Reviews.objects.filter(user_id_reviewed = influencerid)
    averagestars = 0
    for i in reviewedinfo:
        print("this is the review stars", i.review_stars)
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
    
    print("this is userinfodata", userinfodata)
    currentuserid = request.user.id
    sameperson = 0
    if influencerid == currentuserid:
        sameperson = 1

    if feedtype == "main":
            print("this is main")
            #postandmessage = Postandmessage.objects.filter(poster_id = influencerid)
            
            if sameperson == 1:
                postandmessage = Postandmessage.objects.filter(poster_id = influencerid ,reservation_ofpost__show__icontains=False)
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
        print("this is review")
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
   
    print("this is alldata", alldata)
    
    return_request = {"username":username, "sameperson": sameperson, "accountstatus": accountstatus, "alldata":alldata, "feedtype":feedtype, "userinfodata":userinfodata, "hidedata":hidedata,
    "reviewnum":reviewnum, "averagestars":averagestars}
        
    
    return JsonResponse(return_request, safe=False)

def editprofile(request):
    if request.method == "POST":
        print(request.user.id)

        data = json.loads(request.body)
     
        checker = Userinfo.objects.filter(influencer_id = request.user.id)
        if checker.exists():
            userinfo = checker.update(profile_fullname=data['idfullname'],profile_description=data['iddescription'],
            first_url=data['idurl1'], second_url=data['idurl2'], third_url=data['idurl3'], influencer_id=request.user.id)
        
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
        print("publicid", data["publicid"])
        print("hide", data["hide"])

        if (data["hide"] == "Unhide"):
            checker.update(hide = 0)
            hide = "Hide"

        else:
            checker.update(hide = 1)
            hide = "Unhide"


            
    return_request = {"hide": hide}
    return JsonResponse(return_request, safe=False)

@login_required
def book(request, username):
    print("tell me that the thing came here or not")
    currentuserid = request.user.id
    influencerid = User.objects.values('id', 'accountstatus').get(username=username)
    accountstatus = influencerid.get('accountstatus')
    influencerid = influencerid["id"]
    checker = Userinfo.objects.values('price').get(influencer_id = influencerid)
    price = int(checker['price'])

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
  
    return render(request, "network/book.html", {'username': username, "price": price * 100, "accountstatus":accountstatus})

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
    reserveinfo = Reservation.objects.filter(Q(completed=True) | Q(duedate__gte=day), user_id_reserver = currentuser, chargestatus = True)


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
                reserveinfo = Reservation.objects.filter(user_id_influencerreserve = currentuser, completed = False, duedate__gte=date.today(), chargestatus = True)
                hide = 0
            #some of this will have to change so yea
            elif data["type"] == "mycompletehtml":
                type= "complete"
                reserveinfo = Reservation.objects.filter(user_id_influencerreserve = currentuser, completed = True, chargestatus = True)
                hide = 0

            elif data["type"] == "hidecompleted":
                print("what is it in hidecomltejkldnfljkasdnfkljnasdfkjnd")
                type= "inbox"
                hide = 1

                reserveinfo = Reservation.objects.filter(user_id_reserver = currentuser, completed = False, duedate__gte=day, chargestatus = True)
                for i in reserveinfo:
                    print(i.id)
                    print(i.reviewcompleted)

            elif data["type"] == "mysorttime":
                reserveinfo = Reservation.objects.filter(user_id_influencerreserve = currentuser, completed = False, duedate__gte=date.today(), chargestatus = True).order_by('duedate')
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


            reserveinfo = Reservation.objects.filter(id = data["reservationid"], chargestatus = True)

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
            
            checker = Userinfo.objects.values('omiserecipent', 'price').get(influencer_id = request.user.id)

            price = (int(checker['price']) * 0.85)  * 100
            recipientinfluencer = omise.Recipient.retrieve(checker['omiserecipent'])
            transfer = omise.Transfer.create(
            amount=price, recipient=recipientinfluencer.id,paid=True, sent=True)
            
            Reservation.objects.filter(id=data["reserveid"]).update(completed = True, completiondate = today)
        
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
       
        reporttable = ReportTable(reservation_foreign_id = data["reservationid"], influencer = data["influencer"],
        requester = data["requester"], report_value = data["value"])
        reporttable.save()







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
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "password"
            })

        # Attempt to create new user
        try:
            print("does it even comes in here")
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError as e:
            error_message = e.__cause__
            error_message = str(error_message)
            if "Key (e" in error_message:
                return render(request, "network/register.html", {
                "message": "email"
            })

            else:
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
                print("inside video?")
                request.FILES['media']

                uploaded_response = upload_files_videos(request.FILES['media'], uniquepostingid)
            
                return_response = {"url": uploaded_response['public_id']}

            elif type == "image":
                print("whawhatwha", uniquepostingid)
                uploaded_response = upload_files(request.FILES['media'], uniquepostingid)
                return_response = {"url": uploaded_response['resources'][0]['url']}

            elif type == "imageinprofile":
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
            
            else:
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
   # print("inside upload files videos", fileid)
   # print("file", file)
    cloudinary.uploader.upload_large(file, resource_type = "video", public_id = fileid, chunk_size = 6000000)
  #  dump_response(response)
   # url, options = cloudinary_url(
   #     response['public_id']
   # )
   # print("waan's response in video", response)
   # print("Fill 200x150 url: " + url)
   # print("options? ", options)
   # print("id", response['public_id'])

    #print("")
    #print("fileid last minuete", fileid)
    #print("wanna celebrate bro?", cloudinary.api.resources(publics_id = fileid))

   # print("resources for vid", cloudinary.api.resources())
    #print("something inside?", cloudinary.api.resource(resource_type = "video", public_id = fileid))
    successful = cloudinary.api.resource(resource_type = "video", public_id = fileid)
    
  #  print("am i successful?", successful)
    return successful
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
    alltheinfo = Requesteddara.objects.filter(daradone = 0)
    feedback = FeedBack.objects.filter()
    maillist = Maillistlist.objects.filter()
    report = ReportTable.objects.filter()



    print("athheinfo", alltheinfo)
    data = []
    stu = {
    "alltheinfo": alltheinfo,"feedbackinfo": feedback,
    "maillistinfo":maillist, "reportlist":report
    }
  

    for i in stu["alltheinfo"]:
        print("this is feedback", i.name)

    for w in stu["feedbackinfo"]:
        print("this is feedback", w.feedback)
    
    for k in stu["maillistinfo"]:
        print("this is maillist", k.mail)

     
    for z in stu["reportlist"]:
        print("this is reportlist", z.report_value)


    if request.method == "POST":
        Requesteddara.objects.filter(requested_user_id = request.POST["idofuser"]).update(daradone = 1)
        User.objects.filter(id = request.POST["idofuser"]).update(influencer_ornot = 1)

        
        userinfo = Userinfo(profile_fullname=request.POST["firstname"], influencer_id=request.POST["idofuser"], category = request.POST["category"])
        userinfo.save()
        


    return render(request, "network/superuser.html", stu)

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
    
    try:
        Userinfo.objects.values('omiserecipent').get(influencer_id = request.user.id)
        type = "exist"

    except Userinfo.DoesNotExist:
        type = "notexist"

    print("this is the type", type)




    return render(request, "network/payment.html", {"type": type})

def paymentsetupapi(request):
    return_response = "hi"
    

    if request.method == "POST":
        data = json.loads(request.body)
        try:
            checker = Userinfo.objects.values('omiserecipent', 'price').get(influencer_id = request.user.id)
        except Userinfo.DoesNotExist:
            checker = "new"


        if data["type"] == "exist":
            recipient = omise.Recipient.retrieve(checker['omiserecipent'])
           
            bankinfo = recipient.bank_account
       

            return_response = {"name" : bankinfo.name, "brand" : bankinfo.brand, "number":bankinfo.last_digits, "price": checker['price'], "email": recipient.email}

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
            recipient = omise.Recipient.retrieve(checker['omiserecipent'])
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


class PasswordContextMixin:
    extra_context = None

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(
            {"title": self.title, "subtitle": None, **(self.extra_context or {})}
        )
        return context

class PasswordResetView(PasswordContextMixin, FormView):
    email_template_name = "registration/password_reset_email.html"
    extra_email_context = None
    form_class = PasswordResetForm
    from_email = None
    html_email_template_name = None
    subject_template_name = "registration/password_reset_subject.txt"
    success_url = reverse_lazy("password_reset_done")
    template_name = "registration/password_reset_form.html"
    title = _("Password reset")
    token_generator = default_token_generator

    @method_decorator(csrf_protect)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def form_valid(self, form):
        opts = {
            "use_https": self.request.is_secure(),
            "token_generator": self.token_generator,
            "from_email": self.from_email,
            "email_template_name": self.email_template_name,
            "subject_template_name": self.subject_template_name,
            "request": self.request,
            "html_email_template_name": self.html_email_template_name,
            "extra_email_context": self.extra_email_context,
        }
        form.save(**opts)
        return super().form_valid(form)


INTERNAL_RESET_SESSION_TOKEN = "_password_reset_token"


class PasswordResetDoneView(PasswordContextMixin, TemplateView):
    template_name = "registration/password_reset_done.html"
    title = _("Password reset sent")


class PasswordResetConfirmView(PasswordContextMixin, FormView):
    form_class = SetPasswordForm
    post_reset_login = False
    post_reset_login_backend = None
    reset_url_token = "set-password"
    success_url = reverse_lazy("password_reset_complete")
    template_name = "registration/password_reset_confirm.html"
    title = _("Enter new password")
    token_generator = default_token_generator

    @method_decorator(sensitive_post_parameters())
    @method_decorator(never_cache)
    def dispatch(self, *args, **kwargs):
        if "uidb64" not in kwargs or "token" not in kwargs:
            raise ImproperlyConfigured(
                "The URL path must contain 'uidb64' and 'token' parameters."
            )

        self.validlink = False
        self.user = self.get_user(kwargs["uidb64"])

        if self.user is not None:
            token = kwargs["token"]
            if token == self.reset_url_token:
                session_token = self.request.session.get(INTERNAL_RESET_SESSION_TOKEN)
                if self.token_generator.check_token(self.user, session_token):
                    # If the token is valid, display the password reset form.
                    self.validlink = True
                    return super().dispatch(*args, **kwargs)
            else:
                if self.token_generator.check_token(self.user, token):
                    # Store the token in the session and redirect to the
                    # password reset form at a URL without the token. That
                    # avoids the possibility of leaking the token in the
                    # HTTP Referer header.
                    self.request.session[INTERNAL_RESET_SESSION_TOKEN] = token
                    redirect_url = self.request.path.replace(
                        token, self.reset_url_token
                    )
                    return HttpResponseRedirect(redirect_url)

        # Display the "Password reset unsuccessful" page.
        return self.render_to_response(self.get_context_data())

    def get_user(self, uidb64):
        try:
            # urlsafe_base64_decode() decodes to bytestring
            uid = urlsafe_base64_decode(uidb64).decode()
            user = UserModel._default_manager.get(pk=uid)
        except (
            TypeError,
            ValueError,
            OverflowError,
            UserModel.DoesNotExist,
            ValidationError,
        ):
            user = None
        return user

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs["user"] = self.user
        return kwargs

    def form_valid(self, form):
        user = form.save()
        del self.request.session[INTERNAL_RESET_SESSION_TOKEN]
        if self.post_reset_login:
            auth_login(self.request, user, self.post_reset_login_backend)
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if self.validlink:
            context["validlink"] = True
        else:
            context.update(
                {
                    "form": None,
                    "title": _("Password reset unsuccessful"),
                    "validlink": False,
                }
            )
        return context


class PasswordResetCompleteView(PasswordContextMixin, TemplateView):
    template_name = "registration/password_reset_complete.html"
    title = _("Password reset complete")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["login_url"] = resolve_url(settings.LOGIN_URL)
        return context

def paymentresponse(request):
    chargestuff = Reservation.objects.filter(user_id_reserver_id=request.user.id).order_by('-creationtime')[0]

    print(chargestuff.id)
    print(chargestuff.omisecharge)

   
    chargo = chargestuff.omisecharge

    
    charge = omise.Charge.retrieve(chargo)
    print("what is charge", charge)
    print("what is charge id", charge.id)

    print(charge.status)

    if charge.status == "successful":
        status = "successful"
        Reservation.objects.filter(user_id_reserver_id=request.user.id).update(chargestatus = True)

    else:
        status = "fail"

    return render(request, "network/paymentresponse.html", {"status":status})

def paymentapi(request, username):
    return_response = "hi"
    print("ypyp")
    if request.method == "POST":
        
        influencerid = User.objects.values('id').get(username=username)
        influencerid = influencerid["id"]
        checker = Userinfo.objects.values('omiserecipent', 'price').get(influencer_id = influencerid)
        price = int(checker['price'])
        price = price * 100
        data = json.loads(request.POST["storevalue"])

        print("wawa", request.POST["storevalue"])

        if request.POST['omiseToken'] == "":
            token = request.POST['omiseSource']
            print("this is token", token)

            omise.api_version = "2019-05-29"
            charge = omise.Charge.create(
            amount=price,
            currency="thb",
            capture=True,
            return_uri = "http://127.0.0.1:8000/paymentresponse",
            source=token
            )

        else:
            token = request.POST['omiseToken']
            print("this is token", token)
            
            charge = omise.Charge.create(
            amount=price,
            currency="thb",
            capture=True,
            card=token)

        bookrequest =  Reservation(typeintro=data['typeintro'],
        tointro=data['tointro'], fromintro=data['fromintro'], typeoccasion=data['typeoccasion'],
        firstinputoccasion=data['firstinputocca'],secondinputoccasion=data['secondinputocca'],
        thirdinputoccasion=data['thirdinputocca'],fourthinputoccasion=data['fourthinputocca'],
        user_id_reserver_id=request.user.id,user_id_influencerreserve_id=influencerid, duedate=data["datetime"], 
        show=data["inputcheck"], omisecharge = charge.id)
        
        bookrequest.save()
        '''
        return_response = {"url":charge.authorize_uri}
        print("this is source of charge", charge.source)
        ye = charge.source
        lol = ye.scannable_code 
        print("this is image", lol.image)
        hehe = lol.image
        print(hehe.download_uri)

        return_response = {"url":hehe.download_uri}
        '''



        if request.POST['omiseToken'] == "":

            return redirect(charge.authorize_uri)
        else:

            return redirect("paymentresponse")


    return redirect("paymentresponse")

def errorpage(request):
    return render(request, "network/errorpage.html")


