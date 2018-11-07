# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
ARG BASE_CONTAINER=jupyter/minimal-notebook
FROM $BASE_CONTAINER

LABEL maintainer="Fabien BERNARD <fabien@contiamo.com>"

# Install Ijavascript
RUN npm install -g ijavascript && \
  ijsinstall