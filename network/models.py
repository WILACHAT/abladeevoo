from django.contrib.auth.models import AbstractUser
from django.db import models
import json
from django.http import JsonResponse
from datetime import timezone, datetime, timedelta
from django.db import models
from cloudinary.models import CloudinaryField

#what is going on here
class User(AbstractUser):
    influencer_ornot = models.BooleanField(default=False)
    freeze_account = models.BooleanField(default=True)
    pass
    def serialize(self):
        return {
            "id":self.id,
            "username":self.username,
            "email":self.email,
            "influencer_ornot":self.influencer_ornot,
            "freeze_account":self.freeze_account
        }
#How do i do the category? EZ, essentially put category name in the database
#and whenever category is involve just query stuff from your database
#portal
class Category(models.Model):
    category_name = models.CharField(max_length=64)
    def __str__(self):
        return self.category_name

class Reservation(models.Model):
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
    
    def serialize(self):
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
            "reviewcompleted":self.reviewcompleted
        } 


class Postandmessage(models.Model):
    #we need a video for database as well or maybe not entirely sure
    post_info = models.CharField(max_length=256, null=True)
    creationtime = models.DateTimeField(auto_now_add=True, null=True)
    reservation_ofpost = models.ForeignKey(Reservation, null=True, blank=True, on_delete=models.CASCADE, related_name='reservationofpost')
    poster = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='posterid')
    video = models.CharField(max_length=256, null=True)


    def serialize(self):
         return {
            "id": self.id,
            "post_info": self.post_info,
            "timestamp":  self.creationtime,
            "reservation_ofpost": self.reservation_ofpost_id,
        }   

class Reviews(models.Model):
    review = models.CharField(max_length=256, null=True)
    user_id_reviewer = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='reviewer') 
    user_id_reviewed = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='reviewed') 
    reservation_foreign = models.ForeignKey(Reservation, null=True, blank=True, on_delete=models.CASCADE, related_name='reservation_foreign') 

