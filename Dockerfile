FROM debian:jessie

MAINTAINER Shaun Sweet <shaun@shaunsweet.com>

RUN apt-get update \
	&& apt-get upgrade -y \
	&& apt-get install -y unzip wget build-essential \
		cmake git pkg-config libswscale-dev \
		python3-dev python3-numpy \
		libtbb2 libtbb-dev libjpeg-dev \
		libpng-dev libtiff-dev libjasper-dev curl

RUN cd \
	&& wget https://github.com/opencv/opencv/archive/3.1.0.zip \
	&& unzip 3.1.0.zip \
	&& cd opencv-3.1.0 \
	&& mkdir build \
	&& cd build \
	&& cmake .. \
	&& make -j3 \
	&& make install \
	&& cd \
	&& rm 3.1.0.zip

RUN apt-get install -y python-software-properties && curl -sL https://deb.nodesource.com/setup_6.11 | sudo -E bash -\
&& apt-get -y install nodejs
RUN mkdir -p /usr/app

COPY . /usr/app
EXPOSE 3001
WORKDIR /usr/app

RUN npm install

CMD ["npm", "run", "server"]
