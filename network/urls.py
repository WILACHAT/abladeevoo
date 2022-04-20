
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
    path("inbox", views.inbox, name="inbox"),
    path("gotozjguen484s9gj302g/<int:paginationid>", views.gotozjguen484s9gj302g, name="gotozjguen484s9gj302g"),
    
    path("eachreserve/<int:reservationid>", views.eachreserve, name="eachreserve"),
    path("gotoeachreserve", views.gotoeachreserve, name="gotoeachreserve"),
    path("editprofile", views.editprofile, name="editprofile"),
    path("hidepost", views.hidepost, name="hidepost"),
    path("superuser", views.superuser, name="superuser"),
    path("dara", views.dara, name="dara"),







    path("aboutus", views.aboutus, name="aboutus"),
    path("legal", views.legal, name="legal"),
    path("helpcenter", views.helpcenter, name="helpcenter"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("forupload/<str:type>", views.forupload, name="forupload")

]
