
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),

    ##API##
    #index main influecer api 
    path("inzwerg4jgnsd9aadif67", views.inzwerg4jgnsd9aadif67, name="inzwerg4jgnsd9aadif67"),
    path("ininfluencer/<str:ininfluencer>", views.ininfluencer, name="ininfluencer"),
    path("gotoinfluencer/<str:username>/<str:feedtype>", views.gotoinfluencer, name="gotoinfluencer"),


    path("book/<str:username>", views.book, name="book"),
    path("gotobook/<str:username>", views.gotobook, name="gotobook"),



    path("aboutus", views.aboutus, name="aboutus"),
    path("explore", views.explore, name="explore"),
    path("subscription", views.subscription, name="subscription"),

    path("upload", views.upload, name="upload"),
    path("banking", views.banking, name="banking"),
    path("settings", views.settings, name="settings"),
    path("legal", views.legal, name="legal"),
    path("helpcenter", views.helpcenter, name="helpcenter"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")

]
