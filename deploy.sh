#! /bin/bash

BRANCH=$1
STAGE=''

# exit when any command fails
set -e

if [ "$BRANCH" == "develop" ] ; then
  STAGE='dev'
elif [ "$BRANCH" == "master" ] ; then
  STAGE='prod'
fi

if [ ! -z "$STAGE" ] ; then
  echo "Deploying new version of bug-bounty on $STAGE"
 ./node_modules/.bin/sls deploy --stage $STAGE --config ./serverless.yml

else
  echo "Stage not defined for '$BRANCH' branch, skipping..."
fi