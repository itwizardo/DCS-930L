#!/bin/sh
# re-generate SSL Server Keys
cd /etc_ro
mkdir /usr/local
mkdir /usr/local/ssl
cp openssl.cnf /usr/local/ssl
openssl genrsa -out serverkey.pem 1024
openssl req -new -sha256 -x509 -keyout serverkey.pem -out servercert.pem -days 1825 -newkey rsa:1024 -nodes -subj "/C=TW/ST=Taiwan/L=Taipie/O=D-LINK/OU=DHPD Dept./CN=www.dlink.com"
#export SAN=DNS:127.0.0.1,DNS:Current's IP,DNS=DDNS Host Name
#openssl req -new -sha256 -x509 -extensions v3_req -keyout serverkey.pem -out servercert.pem -days 1825 -newkey rsa:1024 -nodes -subj "/C=TW/ST=Taiwan/L=Taipie/O=D-LINK/OU=DHPD Dept./CN=www.dlink.com"
#openssl x509 -text -in /etc_ro/servercert.pem
cd /
