# This file creates a container that runs a {package} caliopen web-client-ng
# Important:
# Author: Caliopen
# Date: 2016-01-05

FROM node:4
MAINTAINER Caliopen
ADD . /usr/share/caliopen/web-client-ng

WORKDIR /usr/share/caliopen/web-client-ng
RUN mkdir -p /srv/caliopen && ln -s /usr/share/caliopen/web-client-ng/dist /srv/caliopen/web-client-ng
RUN bin/install

RUN useradd docker
RUN cp /usr/share/caliopen/web-client-ng/docker/entrypoint.sh /docker-entrypoint.sh
RUN chmod 750  /docker-entrypoint.sh
RUN chown docker /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
VOLUME /srv/caliopen/web-client-ng
CMD ["bin/start"]
