
from django.urls import path
from django.contrib.auth import views as auth_views
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView



from . import views

urlpatterns = [
    path("", views.index, name="index"),

    ##API##
    #index main influecer api 
    path("inzwerg4jgnsd9aadif67", views.inzwerg4jgnsd9aadif67, name="inzwerg4jgnsd9aadif67"),
    path("ininfluencer/<str:ininfluencer>", views.ininfluencer, name="ininfluencer"),
    path("usersetting", views.usersetting, name="usersetting"),
    path("usersettingapi", views.usersettingapi, name="usersettingapi"),


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
    path("superuserreport", views.superuserreport, name="superuserreport"),
    path("superuserfeedback", views.superuserfeedback, name="superuserfeedback"),
    path("superusermail", views.superusermail, name="superusermail"),
    path("paymentapi/<str:username>", views.paymentapi, name="paymentapi"),
    path("paymentresponse", views.paymentresponse, name="paymentresponse"),


    path("payment", views.payment, name="payment"),
    path("paymentsetupapi", views.paymentsetupapi, name="paymentsetupapi"),




    path("dara", views.dara, name="dara"),


    path("aboutus", views.aboutus, name="aboutus"),
    path("legal", views.legal, name="legal"),
    path("setting", views.setting, name="setting"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("feedbackmaillist", views.feedbackmaillist, name="feedbackmaillist"),




    path('password_reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='network/password_reset_done.html'),
     name='password_reset_done'),

    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='network/password_reset_confirm.html'), name='password_reset_confirm'),
    
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='network/password_reset_form.html'), name='password_reset'),
    
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='network/password_reset_complete.html'),
     name='password_reset_complete'),

    path("forupload/<str:type>", views.forupload, name="forupload")

]
