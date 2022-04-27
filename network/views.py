from enum import unique
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import Http404
from django.shortcuts import redirect, render
from django.urls import reverse
from .models import User, Reservation, Reviews, Postandmessage, Userinfo, Requesteddara, Views
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
import uuid
from django.db.models import Q, Count
import re
from datetime import datetime


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

def usersetting(request):


    return render(request, "network/usersetting.html")
def usersettingapi(request):
    if request.method == "POST":
        data = json.loads(request.body)
        User.objects.filter(id = request.user.id).update(normal_user_pic = data["profilepic"], first_name = data["firstname"], last_name = data["lastname"]
        ,email = data["email"], username = data["username"])
    return_request = {"what":"ngong"}
    normal_user_info = User.objects.filter(id = request.user.id)

    
    data = []

    for i in normal_user_info:
        i.influencer_id
        data.append(i.serialize())
        return_request = {"data":data}

    return JsonResponse(return_request, safe=False)
    

def inzwerg4jgnsd9aadif67(request):

    #influencer essentially a page that uses serialize to display all the influencers
    
    influencers = User.objects.all().filter(influencer_ornot=1)[:10]
    checker = Userinfo.objects.all().filter()
    view = Views.objects.values('influencer_id').annotate(dcount=Count('influencer_id')).order_by('-dcount')[:10]
    populardata = []
    

    for i in view:
        print(i["influencer_id"])
        newinfluencers = Userinfo.objects.filter(id=i["influencer_id"])
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

            
    
    #influencers = Views.objects.all()order_by('-pub_date', 'headline')

    if request.method == "POST":
        print("ok in here forsearch")
        data = json.loads(request.body)
        searchvalue = data["searchvalue"]
        print("this is the search value", searchvalue)
        if searchvalue != "":

            listofcloseuser = []
            newinfluencers = User.objects.all().filter(influencer_ornot=1)

            for i in newinfluencers:
                i.username
                match = re.search(f"{searchvalue}",i.username)
                if match:
                    listofcloseuser.append(i.id)
            
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
    influencerid = User.objects.values('id').get(username=username)  

   


    influencerid = influencerid["id"]
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
            if sameperson == 1:
                postandmessage = Postandmessage.objects.filter(poster_id = influencerid)
                for i in postandmessage:
                    alldata.append(i.video)
                    hidedata.append(i.hide)
            else:
                postandmessage = Postandmessage.objects.filter(poster_id = influencerid, hide = 0).order_by('-id')[:9]
                for i in postandmessage:
                    alldata.append(i.video)

            #do something
            #query something from the influencer's post and send it back 
    else:
        print("this is review")
        #can be fixed somehow??
        reviews = Reviews.objects.filter(user_id_reviewed_id = influencerid)
        for i in reviews:
            userreviewer= User.objects.filter(id = i.user_id_reviewer_id)
            for w in userreviewer:
                w.username
                w.normal_user_pic
            

                reviewdict = {"username": w.username, "picture":w.normal_user_pic, "review":i.review}
                break
            alldata.append(reviewdict)
   
    print("this is alldata", alldata)
    
    return_request = {"username":username, "sameperson": sameperson, "alldata":alldata, "feedtype":feedtype, "userinfodata":userinfodata, "hidedata":hidedata,
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
        
        else: 
            userinfo = Userinfo(profile_fullname=data['idfullname'],profile_description=data['iddescription'],
            first_url=data['idurl1'], second_url=data['idurl2'], third_url=data['idurl3'], influencer_id=request.user.id)
            userinfo.save()
    

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
        user_id_reserver_id=currentuserid,user_id_influencerreserve_id=influencerid, duedate=data['datetime'])
        
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
def gotozjguen484s9gj302g(request, paginationid):

    currentuser = request.user.id
    checkifinfluencer = User.objects.values('influencer_ornot').get(id = currentuser)
    reviewvalue = ""
    checkifinfluencer = checkifinfluencer["influencer_ornot"]
    
    reserveinfo = Reservation.objects.filter(user_id_reserver = currentuser)
    type = "inbox"
    hide = 0
    propicandusername = []
    postandmessageinfo = ""
    if request.method == "PUT":   
        data = json.loads(request.body)
        #FOUND THE PROBLEM AND IT IS HERE ALRIGHT U GOT THIS NEXT DK WHEN data["from"]/data["type "] is wrong
        if data["from"] == "inbox":
            print("cehck data type", data["type"])
            if data["type"] == "myrequesthtml":
                type= "request"
                reserveinfo = Reservation.objects.filter(user_id_influencerreserve = currentuser)
                hide = 0
            elif data["type"] == "hidecompleted":
                print("what is it in hidecomlted")
                type= "request"
                hide = 1

                reserveinfo = Reservation.objects.filter(user_id_influencerreserve = currentuser, completed = False)
                for i in reserveinfo:
                    print(i.id)
                    print(i.reviewcompleted)



        elif data["from"] == "eachreserve":
            print("ide", data["reservationid"])
            reserveinfo = Reservation.objects.filter(id = data["reservationid"])

            for i in reserveinfo:
            #print("reserveeeeeeeeeeeeeeeee;leme;lme;lme;emleeeeeee", reserveinfo.user_id_reserver_id)
                userreviewer= User.objects.filter(id = i.user_id_reserver_id)
            
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
    "forpostdata":forpostdata, "reviewvalue":reviewvalue, "num_pages":num_pages, "paginationid":paginationid, "data":data, "hide":hide, "propicandusername":propicandusername}

    print("paginationid before doing the work", paginationid)
    for row in pagination.page(paginationid).object_list:  
        print("this is row", row)
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

            Reservation.objects.filter(id=data["reserveid"]).update(completed = True)
        elif data["type"] == "submitreview":
            print("is it in submitreview?")

            userid = User.objects.values('id').get(username = data["influencername"])
            userid = userid["id"]
            print("this is userid", userid)
            Reservation.objects.filter(id=data["reserveid"]).update(reviewcompleted = True)
            reviews = Reviews(review = data["value"], user_id_reviewer_id = request.user.id,
            user_id_reviewed_id = userid, reservation_foreign_id = data["reserveid"], review_stars = data["reviewstars"])
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
                checker = Userinfo.objects.filter(influencer_id = request.user.id)
                if checker.exists():
                     userinfo = checker.update(profile_picture=uploaded_response['resources'][0]['public_id'])
    
                else:
                    userinfo = Userinfo(profile_picture=uploaded_response['resources'][0]['public_id'], influencer_id=request.user.id)
                    userinfo.save()
    
                return_response = {"url": uploaded_response['resources'][0]['public_id']}

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
    cloudinary.uploader.upload(file, public_id = fileid)
    
    
    successful = cloudinary.api.resources_by_ids([fileid])
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
def superuser(request):
    alltheinfo = Requesteddara.objects.filter(daradone = 0)
    print("athheinfo", alltheinfo)
    data = []
    stu = {
    "alltheinfo": alltheinfo
    }
    if request.method == "POST":
        Requesteddara.objects.filter(requested_user_id = request.POST["idofuser"]).update(daradone = 1)
        User.objects.filter(id = request.POST["idofuser"]).update(influencer_ornot = 1)

        Userinfo.objects.filter(influencer_id = request.POST["idofuser"]).update(category = request.POST["category"])




        print("ok it works thanks the christ")

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

        requestdara = Requesteddara(name = name,email = email, phone = phonenumber,
        find = findwhere, findusername = usernamefindwhere, followernum = followerfindwhere, 
        requested_user_id = request.user.id, category = category)
        requestdara.save()

        return HttpResponseRedirect(reverse("index"))


    return render(request, "network/dara.html")
