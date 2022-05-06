


<div class="container">
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark justify-content-between">

      <a class="navbar-brand" href="{% url 'index' %}"><h4 class="videme">Vidme!</h4></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="justify-content-start collapse navbar-collapse" id="navbarSupportedContent">

              <ul class="navbar-nav">
                  {% if user.is_authenticated %}
                    {% if user.influencer_ornot == 1 %}
                      <li class="nav-item mt-2 ml-4">
                          <a id="navprofile" class="wa" href="{% url 'ininfluencer' user.username %}"><strong>{{ user.username }}</strong></a>
                      </li>
                    {% else %}
                    <!--this will go to edit profile page of the account-->
                      <li class="nav-item mt-2 ml-4">
                        <a id="navprofile" class="wa" href="{% url 'usersetting' %}"><strong>{{ user.username }}</strong></a>
                      </li>
                    {% endif %}
                    {% if user.is_superuser == 1 %}
                      <li class="nav-item">
                        <a id="navprofile" class="wa" href="{% url 'superuser' %}"><strong>Super User</strong></a>
                      </li>
                    {% endif %}
                 {% endif %}
          
                  <li class="nav-item mt-2 ml-4">
                    <a class="wa" href="{% url 'index' %}">หน้าหลัก</a>
                  </li>   
                {% if user.is_authenticated %}
                  <li class="nav-item mt-2 ml-4">
                    <a class="wa" href="{% url 'inbox' %}">อินบ็อกซ์</a>
                  </li>    
                  {% if user.influencer_ornot != 1 %}

                    <li class="nav-item mt-2 ml-4">
                      <a class="wa" href="{% url 'dara' %}">สมัครเป็นสตาร์</a>
                    </li> 

                  {% endif %}

                    
            </div>
              <div>
                  <div class="dropdown dropleft">
                    <button class="dropdownbutton btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    อื่นๆ
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <a class="nav-link" href="{% url 'legal' %}">Legal</a>
                      <a class="nav-link" href="{% url 'helpcenter' %}">Help Center</a>
                      <a class="nav-link" href="{% url 'aboutus' %}">About Us</a>
                      <a class="nav-link" href="{% url 'logout' %}">Log Out</a>

                    </ul>
                  
                </div>
              </div>
                
                   
                {% else %}
                    <li class="nav-item">
                        <a class="wa" href="{% url 'login' %}">Log In</a>
                    </li>
                    <li class="nav-item">
                        <a class="wa" href="{% url 'register' %}">Register</a>
                    </li>
                {% endif %}
              </ul>
            </div>
            


          </div>
        </nav>
      </div>