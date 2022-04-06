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
    if feedtype == "main":
        print("this is main")
        #do something
        #query something from the influencer's post and send it back 

    else:
        print("this is review")
        #do something
        #query reviews of the influencer post and show it 


    return_request = {"username":username}
    

    
    return JsonResponse(return_request, safe=False)
 
def book(request, username):
    print("tell me that the thing came here or not")
    if request.method == "POST":
        data = json.loads(request.body)
        print("lets check if the data is here", data)

    return render(request, "network/book.html", {'username': username})

def gotobook(request, username):
    return_request = {"username":username}
    return JsonResponse(return_request, safe=False)


def explore(request):
    return render(request, "network/explore.html")

def subscription(request):
    return render(request, "network/subscription.html")

def upload(request):
    return render(request, "network/upload.html")

def updateportal(request):
    return render(request, "network/updateportal.html")

@login_required

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
