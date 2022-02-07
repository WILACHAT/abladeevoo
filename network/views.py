from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import Http404
from django.shortcuts import redirect, render
from django.urls import reverse
from .models import User, Portal, Subscribe, Posts
from django.http import JsonResponse
from datetime import datetime
import pytz
import json
from json import dumps
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator

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
    portals = Portal.objects.all()
    print(portals)
    return render(request, "network/index.html", {"portalshown": portals})

def allportal(request):
    portals = Portal.objects.all()
    newdata = []
    for portal in portals:
        newdata.append(portal.serialize())

    print("this is fucking newdata" ,newdata)
    print(portals)
    newdata = newdata
    return_request = newdata
    return JsonResponse(return_request, safe=False)

def gotoportal(request, id, pagination):
    return_request = request.user.id
    print("helloo how are you doing")
    portalone = Posts.objects.filter(portal_id_posts_id = id)
    portalname = Portal.objects.values('portal_name').get(id=id)
    print("portalname", portalname['portal_name'])

    if request.method == "PUT":
        data = json.loads(request.body)
        portalid = Portal.objects.values('id').get(portal_name=data['portalname'])
        portalid = portalid["id"]
        post =  Posts(portal_id_posts_id=portalid,
        post_info=data['postvalue'], type_posts=data['posttype'], 
        id=request.user.id)
        post.save() 
    
    newdata = []
    for posts in portalone:
        newdata.append(posts.serialize())
    return_request = {"data":newdata,"portalname":portalname}


    return JsonResponse(return_request, safe=False)

def portal(request, portalname):
    print("check for portalname", portalname)
    portalid = Portal.objects.values('id').get(portal_name=portalname)
    print("check", portalid["id"])
    

    '''Portal HTML page will include the divs of everything in a portal including
    community, reddit forum, blah2, calls, marketplace, etc
    let me explain to you the (request, portalname ok??? where does it comes from???
    so basically this is the portal/portalname type shit thats all
    PAE ALL I COULD EZILY DO IS TO PUT EVERYTHING IN HTML AND PASS BUT YE EXTRA'''
    #user = User.objects.get(id = id)
    #curuser = request.user.id
    #user = user.username

    

    return render(request, "network/portal.html", {'portalid': portalid["id"]})


def explore(request):
    return render(request, "network/explore.html")

def subscription(request):
    return render(request, "network/subscription.html")

def upload(request):
    return render(request, "network/upload.html")

def updateportal(request):
    return render(request, "network/updateportal.html")

@login_required
def newportal(request):
    
    if request.method == "POST":

        '''Post is created in the javascript page when submit after post 
        the data and stuff will come to this post and then we save it into the 
        database'''

        print("is this even post")
        data = json.loads(request.body)
        print(request.user.id)
        portal =  Portal(portal_name=data['portal_name']
        ,portal_des=data['portal_des'], websiteurl=data['portal_url'], owner_id=request.user.id)
        portal.save()

        return JsonResponse({"message": data}, status=201)  
    
    return render(request, "network/newportal.html")

def banking(request):
    return render(request, "network/banking.html")

def settings(request):
    return render(request, "network/settings.html")

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
