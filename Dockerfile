FROM node:4
ADD . /usr/share/caliopen/web-client-ng
RUN mkdir -p /srv/caliopen && ln -s /usr/share/caliopen/web-client-ng/dist /srv/caliopen/web-client-ng
WORKDIR /usr/share/caliopen/web-client-ng
VOLUME /srv/caliopen/web-client-ng
CMD npm install && npm run build
