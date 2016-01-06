# This file creates a container that runs a {package} caliopen web-client-ng
# Important:
# Author: Caliopen
# Date: 2016-01-05

FROM node:4
MAINTAINER Caliopen
ADD . /usr/share/caliopen/web-client-ng
RUN useradd docker
RUN mkdir -p /srv/caliopen && ln -s /usr/share/caliopen/web-client-ng/dist /srv/caliopen/web-client-ng
RUN chmod 755 -R /usr/share/caliopen/web-client-ng/dist
RUN chown docker -R /srv/caliopen/web-client-ng

WORKDIR /usr/share/caliopen/web-client-ng
VOLUME /srv/caliopen/web-client-ng

RUN cp /usr/share/caliopen/web-client-ng/docker/entrypoint.sh /docker-entrypoint.sh
RUN chmod 750  /docker-entrypoint.sh
RUN chown docker /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["bin/install"]
