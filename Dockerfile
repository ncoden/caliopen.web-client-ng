FROM busybox
ADD dist/ /srv/caliopen/web-client-ng
CMD /bin/true
