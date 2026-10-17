FROM mysql:8.0.33

ENV MYSQL_ROOT_PASSWORD=root \
    MYSQL_DATABASE=taskdb

LABEL maintainer="ABISHEK"

VOLUME /var/lib/mysql

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD mysqladmin ping -h 127.0.0.1 -u root -p"$MYSQL_ROOT_PASSWORD" --silent || exit 1
