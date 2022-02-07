from django.contrib.auth.models import AbstractUser
from django.db import models
import json
from django.http import JsonResponse
from datetime import timezone, datetime, timedelta

#what is going on here
class User(AbstractUser):
    pass

#How do i do the category? EZ, essentially put category name in the database
#and whenever category is involve just query stuff from your database
#portal
class Category(models.Model):
    category_name = models.CharField(max_length=64)
    def __str__(self):
        return self.category_name

class Portal(models.Model):
    portal_name = models.CharField(max_length=256, null=True)
    portal_des =  models.CharField(max_length=256, null=True)
    owner = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='postcreator')
    portal_price =  models.CharField(max_length=256, null=True)
    creationtime = models.DateTimeField(auto_now_add=True)
    websiteurl = models.URLField(max_length=256, null=True)
    portal_pic = models.URLField(max_length=256, null=True)
    portalbgcolor = models.CharField(max_length=256, null=True)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)


    def serialize(self):
        return {
            "id":self.id,
            "portalname":self.portal_name,
            "portaldes":self.portal_des,
            "portalprice":self.portal_price,
            "creationtime":self.creationtime,
            "websiteurl":self.websiteurl,
            "portal_pic":self.portal_pic,
            "portalbgcolor":self.portalbgcolor
            #"subscribers":self.portal_id_subscribing.filter(subscribe_ornot = 1).count()
        }


class Subscribe(models.Model):
    user_id_subsriber = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='subsriber') 
    portal_id_subscribing = models.ForeignKey(Portal, null=True, blank=True, on_delete=models.CASCADE, related_name='subscribing')
    subsribe_ornot = models.BooleanField(default=True)


class Posts(models.Model):
    portal_id_posts = models.ForeignKey(Portal, null=True, blank=True, on_delete=models.CASCADE, related_name='portalidposts')
    post_info = models.CharField(max_length=256)
    type_posts = models.CharField(max_length=256)
    creationtime = models.DateTimeField(auto_now_add=True)
    modify_date = models.DateTimeField(auto_now=True)
    user_id = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='postposts')

    def serialize(self):
         return {
            "id": self.id,
            "portal_id": self.portal_id_posts.id,
            "post_info": self.post_info,
            "type_posts": self.type_posts,
            "timestamp":  self.modify_date.strftime("%b %-d %Y, %-I:%M %p"),
            "user_id": self.user_id,
            
        }   

