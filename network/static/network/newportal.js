document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#compose-form').onsubmit=save_post;

});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function save_post()
{
    console.log("to check")
    const getcooked = getCookie('csrftoken')



    console.log(document.getElementById('portaldesid'))  
    fetch(`/newportal`, {
      method: 'POST',
      headers:{'X-CSRFToken': getcooked},
      body: JSON.stringify({
          portal_name: document.querySelector('#portalnameid').value,
          portal_des: document.querySelector('#portaldesid').value,
          portal_url: document.querySelector('#portalurlid').value

      })
    })
 
    .then(result => {
        window.location.href = "/";
    });
    return false;
    
}