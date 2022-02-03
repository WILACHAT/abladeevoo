
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("gotoportal/<str:portalname>", views.gotoportal, name="gotoportal"),
    ##API##
    path("allportal", views.allportal, name="allportal"),
    path("portal/<int:id>/<int:paginationid>", views.portal, name="portal"),

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
