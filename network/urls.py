
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("gotoportal/<int:id>/<int:pagination>", views.gotoportal, name="gotoportal"),
    path("subscribeornot/<int:id>", views.subscribeornot, name="subscribeornot"),

    ##API##
    path("allportal", views.allportal, name="allportal"),
    path("portal/<str:portalname>", views.portal, name="portal"),

    path("aboutus", views.aboutus, name="aboutus"),
    path("explore", views.explore, name="explore"),
    path("subscription", views.subscription, name="subscription"),
    path("newportal", views.newportal, name="newportal"),

    path("upload", views.upload, name="upload"),
    path("banking", views.banking, name="banking"),
    path("settings", views.settings, name="settings"),
    path("legal", views.legal, name="legal"),
    path("helpcenter", views.helpcenter, name="helpcenter"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")

]
