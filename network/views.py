from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import Http404
from django.shortcuts import redirect, render
from django.urls import reverse
from .models import User, Reservation, Reviews, Postandmessage
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
import uuid

from django.http import JsonResponse
from datetime import datetime
import pytz
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
from cloudinary.utils import cloudinary_url


def aboutus(request):
    return render(request, "network/aboutus.html")

def index(request):
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


def inzwerg4jgnsd9aadif67(request):



    #influencer essentially a page that uses serialize to display all the influencers

    influencers = User.objects.all().filter(influencer_ornot=1)

    

    newdata = []
    for influencer in influencers:
        newdata.append(influencer.serialize())

    newdata = newdata
    return_request = newdata
    return JsonResponse(return_request, safe=False)
def ininfluencer(request, ininfluencer):
    '''the request, ininfluencer -> ininfluencer came from urls.py
     and its value behindininfluence/str:ininfluence 
     *influencer needs to have the same name as the /ininfluencer of url'''

   
    return render(request, "network/ininfluencer.html", {'username': ininfluencer})
def gotoinfluencer(request, username, feedtype):
    return_request = {}
    alldata = []
    influencerid = User.objects.values('id').get(username=username)  
    print("influencerid", influencerid)
    influencerid = influencerid["id"]
    print("influencerid22", influencerid)

    currentuserid = request.user.id
    print("yoyoyoyyyyo")
    sameperson = 0
    if influencerid == currentuserid:
        sameperson = 1

    if feedtype == "main":

            print("this is main")
            #do something
            #query something from the influencer's post and send it back 

    else:
        print("this is review")
        reviews = Reviews.objects.filter(user_id_reviewed_id = influencerid)
        for i in reviews:
            alldata.append(str(i.review))
   


    print("this is alldata", alldata)
    
    return_request = {"username":username, "sameperson": sameperson, "alldata":alldata}
        
    
    return JsonResponse(return_request, safe=False)
 
def book(request, username):
    print("tell me that the thing came here or not")
    currentuserid = request.user.id
    influencerid = User.objects.values('id').get(username=username)
    influencerid = influencerid["id"]

 
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
  
        bookrequest =  Reservation(typeintro=data['typeintro'],
        tointro=data['tointro'], fromintro=data['fromintro'], typeoccasion=data['typeoccasion'],
        firstinputoccasion=data['firstinputocca'],secondinputoccasion=data['secondinputocca'],
        thirdinputoccasion=data['thirdinputocca'],fourthinputoccasion=data['fourthinputocca'],
        user_id_reserver_id=currentuserid,user_id_influencerreserve_id=influencerid)
        
        bookrequest.save()
        




    return render(request, "network/book.html", {'username': username})

def gotobook(request, username):
    return_request = {"username":username}
    return JsonResponse(return_request, safe=False)

def inbox(request):
    currentuser = request.user.id
    
    username = User.objects.values('username').get(id = currentuser)
    username = username["username"]

    return render(request, "network/inbox.html", {"currentuser": currentuser, "username":username})
def gotozjguen484s9gj302g(request):
    currentuser = request.user.id
    checkifinfluencer = User.objects.values('influencer_ornot').get(id = currentuser)
    reviewvalue = ""
    checkifinfluencer = checkifinfluencer["influencer_ornot"]
    
    reserveinfo = Reservation.objects.filter(user_id_reserver = currentuser)
    checker = 0
    type = "inbox"
    postandmessageinfo = ""
    if request.method == "PUT":   
        data = json.loads(request.body)
        print("data", data)


        if data["from"] == "inbox":
            if data["type"] == "myrequesthtml":
                type= "request"
                reserveinfo = Reservation.objects.filter(user_id_influencerreserve = currentuser)
                checker = 1
        elif data["from"] == "eachreserve":
            reserveinfo = Reservation.objects.filter(id = data["reservationid"])
            postandmessageinfo = Postandmessage.objects.filter(id = data["reservationid"])
            try:
                reviewvalue = Reviews.objects.values('review').get(reservation_foreign_id = data["reservationid"])
                reviewvalue = reviewvalue["review"]
            except ObjectDoesNotExist:
                reviewvalue = ""
        print("this is the reviewvalue", reviewvalue)            

    newdata = []
    fornamedata = []
    forpostdata = []
    saver = ""

    print("this is forpostdata before", postandmessageinfo)

    for post in postandmessageinfo:
        posta = str(post.post_info)
        forpostdata.append(posta)
    
    print("this is forpostdata", forpostdata)
    for reserve in reserveinfo:
        if checker == 1:   
            saver = str(reserve.user_id_reserver)
            fornamedata.append(saver)
        else:
            saver = str(reserve.user_id_influencerreserve)
            fornamedata.append(saver)


        newdata.append(reserve.serialize())

    return_request = {"checkifinfluencer": checkifinfluencer, "data": newdata, "fornamedata":fornamedata, "type":type, 
    "forpostdata":forpostdata, "reviewvalue":reviewvalue}
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
        print(data["value"])
        print(data["reserveid"])
        if data["type"] == "submitvdo":
            postandmessage = Postandmessage(post_info = data["value"], 
            reservation_ofpost_id = data["reserveid"])
            postandmessage.save()
            Reservation.objects.filter(id=data["reserveid"]).update(completed = True)

        elif data["type"] == "submitreview":

            userid = User.objects.values('id').get(username = data["influencername"])
            userid = userid["id"]
            print("this is userid", userid)
            Reservation.objects.filter(id=data["reserveid"]).update(reviewcompleted = True)
            reviews = Reviews(review = data["value"], user_id_reviewer_id = request.user.id,
            user_id_reviewed_id = userid, reservation_foreign_id = data["reserveid"])
            reviews.save()


    return_request = {"reservationid":"hi"}

    return JsonResponse(return_request, safe=False)


@login_required


def legal(request):
    return render(request, "network/legal.html")

def helpcenter(request):
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
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            print("does it even comes in here")
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def forupload(request, type):
    if request.method == "POST":
        #upload_files("hi")
        print("is this the type", type)
        if 'media' in request.FILES.keys():

            print(request.FILES.keys())
            print("not sure will work", request.FILES)
            print("part secondto", request.FILES['media'])
            print("video or not", type)
            id = uuid.uuid1()
            uniquepostingid = str(id) + str(request.user.id)
            print("whawhatwha", uniquepostingid)
            uploaded_response = upload_files(request.FILES['media'], uniquepostingid)
       

            return_response = {"url_image": uploaded_response['resources'][0]['url']}
    return JsonResponse(return_response, safe=False)

def dump_response(response):
    print("Upload response:")
    for key in sorted(response.keys()):
        print("  %s: %s" % (key, response[key]))

def upload_files(file, fileid):
    print("does this work", file)
    print("lets go cuz life is good")
    
    response = cloudinary.uploader.upload(file, public_id = fileid)
    dump_response(response)
    url, options = cloudinary_url(
        response['public_id'],
        format=response['format'],
        width=200,
        height=150,
        crop="fill"
    )
    print("Fill 200x150 url: " + url)
    print("options? ", options)
    print("reponseid", response['public_id'])

    print("")
    successful = cloudinary.api.resources_by_ids([fileid])
    print("am i successful?", successful)
    return successful
    
