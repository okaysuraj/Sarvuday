FROM postgres:17-alpine
RUN apk add --no-cache pgbouncer
USER postgres
ENTRYPOINT ["pgbouncer"]
CMD ["/etc/pgbouncer/pgbouncer.ini"]
