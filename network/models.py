from django.contrib.auth.models import AbstractUser
from django.db import models
import json
from django.http import JsonResponse
from datetime import timezone, datetime, timedelta
from django.db import models
from cloudinary.models import CloudinaryField

#what is going on here
class User(AbstractUser):
    #1 active #2 "deleted" #3 hide
    influencer_ornot = models.BooleanField(default=False)
    freeze_account = models.BooleanField(default=True)
    normal_user_pic = models.CharField(max_length=256, null=True)
    accountstatus = models.IntegerField(null=False, default = 1)

    pass
    def serialize(self):
        return {
            "id":self.id,
            "username":self.username,
            "email":self.email,
            "influencer_ornot":self.influencer_ornot,
            "freeze_account":self.freeze_account,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "normal_user_pic":self.normal_user_pic,
            "accountstatus":self.accountstatus

        }

class Userinfo(models.Model):
    profile_description = models.CharField(max_length=256, null=True)
    profile_video = models.CharField(max_length=256, null=True)
    profile_fullname = models.CharField(max_length=256, null=True)
    profile_picture = models.CharField(max_length=256, null=True)
    first_url = models.URLField(max_length=256, null=True)
    second_url = models.URLField(max_length=256, null=True)
    third_url = models.URLField(max_length=256, null=True)
    influencer = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='influencer_userinfo') 
    category = models.CharField(max_length=256, null=True)
    omiserecipent = models.CharField(max_length=256, null=True)
    price = models.IntegerField(null=True)


    def serialize(self):
        return {
            "id":self.id,
            "profile_description":self.profile_description,
            "profile_video":self.profile_video,
            "profile_fullname":self.profile_fullname,
            "profile_picture":self.profile_picture,
            "first_url":self.first_url,
            "second_url":self.second_url,
            "third_url":self.third_url,
            "influencer":str(self.influencer),
            "category":self.category,
            "price": self.price
        } 
class Views(models.Model):
    viewer = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='viewer') 
    influencer = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='influencer_view') 



#How do i do the category? EZ, essentially put category name in the database
#and whenever category is involve just query stuff from your database
#portal
def now():
     return timezone.now()

class Reservation(models.Model):
    #you can and should add bai sed and stuff here

    typeintro = models.CharField(max_length=256, null=True)
    tointro = models.CharField(max_length=256, null=True)
    fromintro = models.CharField(max_length=256, null=True)
    typeoccasion = models.CharField(max_length=256, null=True)
    firstinputoccasion = models.CharField(max_length=256, null=True)
    secondinputoccasion = models.CharField(max_length=256, null=True)
    thirdinputoccasion = models.CharField(max_length=256, null=True)
    fourthinputoccasion = models.CharField(max_length=256, null=True)
    completed = models.BooleanField(default=False)
    reviewcompleted = models.BooleanField(default=False)
    creationtime = models.DateTimeField(auto_now_add=True, null=True)
    user_id_reserver = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='reserver') 
    user_id_influencerreserve = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='influencerreserve')
    duedate = models.CharField(max_length=256, null=True)
    expired = models.BooleanField(default=False)
    realduedate = models.DateTimeField(null=True)
    completiondate = models.DateTimeField(null=True)
    show = models.BooleanField(default=False)
    omisecharge = models.CharField(max_length=256, null=True)
    paymentmethod = models.CharField(max_length=256, null=True)
    chargedprice = models.IntegerField(null=True)

    chargestatus = models.BooleanField(default=False)
    orderid = models.CharField(max_length=256, null=True)



    def serialize(self):
       # print("checking if this is correct", self.user_id_reserver)
      #  user_username = User.objects.values('username').get(id = self.user_id_reserver)
      #  user_username["username"]
       # print(user_username["username"])
        pic = User.objects.values('normal_user_pic').get(id = self.user_id_influencerreserve.id)
        normalpic = User.objects.values('normal_user_pic').get(id = self.user_id_reserver.id)
        pic = pic['normal_user_pic']
        normalpic = normalpic['normal_user_pic']

        return {
            "id":self.id,
            "typeintro":self.typeintro,
            "tointro":self.tointro,
            "fromintro":self.fromintro,
            "typeoccasion":self.typeoccasion,
            "firstinputoccasion":self.firstinputoccasion,
            "secondinputoccasion":self.secondinputoccasion,
            "thirdinputoccasion":self.thirdinputoccasion,
            "fourthinputoccasion":self.fourthinputoccasion,
            "timestamp":  self.creationtime,
            "completed":self.completed,
            "reviewcompleted":self.reviewcompleted,
            "username":str(self.user_id_reserver),
            "username_influencer":str(self.user_id_influencerreserve),
            "duedate":self.duedate,
            "influencer_pic":pic,
            "normal_pic":normalpic,
            "show":self.show,
            "omisecharge":self.omisecharge,
            "orderid":self.orderid,
            "chargedprice":self.chargedprice,
            "paymentmethod":self.paymentmethod

        } 



#Recently viewed + Most popular
class Viewing(models.Model):
    khondoo = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='khondoo') 
    influencer = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='influencerkhondoo')    
    creationtime = models.DateTimeField(auto_now_add=True, null=True)

class Postandmessage(models.Model):
    #we need a video for database as well or maybe not entirely sure
    post_info = models.CharField(max_length=256, null=True)
    creationtime = models.DateTimeField(auto_now_add=True, null=True)
    reservation_ofpost = models.ForeignKey(Reservation, null=True, blank=True, on_delete=models.CASCADE, related_name='reservationofpost')
    poster = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='posterid')
    video = models.CharField(max_length=256, null=True)
    hide = models.BooleanField(default=False)

    def serialize(self):
         return {
            "id": self.id,
            "post_info": self.post_info,
            "timestamp":  self.creationtime,
            "reservation_ofpost": self.reservation_ofpost_id,
        }   

class Reviews(models.Model):
    review = models.CharField(max_length=256, null=True)
    review_stars = models.IntegerField(null=True)
    user_id_reviewer = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='reviewer') 
    user_id_reviewed = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='reviewed') 
    reservation_foreign = models.ForeignKey(Reservation, null=True, blank=True, on_delete=models.CASCADE, related_name='reservation_foreign') 

class Requesteddara(models.Model):
    name = models.CharField(max_length=256, null=True)
    email = models.CharField(max_length=256, null=True)
    phone = models.CharField(max_length=256, null=True)
    find = models.CharField(max_length=256, null=True)
    findusername = models.CharField(max_length=256, null=True)
    followernum = models.CharField(max_length=256, null=True)
    requested_user = models.OneToOneField(User, unique=True, null=True, on_delete=models.CASCADE, related_name='requested_user') 
    daradone= models.BooleanField(default=False)
    category = models.CharField(max_length=256, null=True)

class Maillistlist(models.Model):
    mail = models.CharField(max_length=256, null=True)

class FeedBack(models.Model):
    feedback = models.CharField(max_length=256, null=True)

class ReportTable(models.Model):
    reservation_foreign = models.ForeignKey(Reservation, null=True, blank=True, on_delete=models.CASCADE, related_name='reservation_foreign_report') 
    report_value = models.CharField(max_length=256, null=True)
    influencer = models.CharField(max_length=256, null=True)
    requester = models.CharField(max_length=256, null=True)


    

class PasswordReset(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='resetuser') 
    token = models.CharField(max_length=256, null=True)
    expiration = models.CharField(max_length=256, null=True)

class PasswordAdmin(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='adminpassword') 
    token = models.CharField(max_length=256, null=True)
    expiration = models.CharField(max_length=256, null=True)













