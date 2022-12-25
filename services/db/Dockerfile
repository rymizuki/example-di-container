FROM --platform=linux/amd64 mysql:8.0.28

RUN apt-get update \
  && apt-get install -y --no-install-recommends locales \
  && echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen ja_JP.UTF-8 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

ENV LANG="ja_JP.UTF-8" LC_ALL="ja_JP.UTF-8"
