### Galdra ###                                     
-----------------
Galdra official repository.

** Version 0.1 **

### Installation ###
------------------
**NGinx required.**

Edit nginx config for example:

```
 server {
        listen 12100;
        server_name galdra-app;

        root "<project-path>";
        
        location /api/ {
            proxy_pass http://localhost:9010/;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location / {
                rewrite ^(.*)$ /index.html break;
        }

        location ~* \.(jpg|jpeg|gif|png|ico|css|zip|tgz|gz|rar|bz2|doc|xls|exe|pdf|ppt|txt|tar|mid|midi|wav|bmp|rtf|js|html|ttf)$ {
                gzip on;
                gzip_min_length 1100;
                gzip_buffers 16 8k;
                gzip_proxied expired no-cache no-store private auth;
                gzip_types text/plain application/xml application/x-javascript text/css;
                gzip_disable "msie6"
                gzip_comp_level 4;
        }
    }
```

Then restart nginx via:

```
nginx -s stop
nginx
```

And open in your browser:
[http://localhost:12100](http://localhost:12100)

### Developer ###
------------------
**Boris Povod:**

    * skype: b.povod
    * email: mrpovod@gmail.com
    

### Author ###
**Mirko Mannucci**

    * skype: mircosearch
    * email: mirco@holomathics.com
