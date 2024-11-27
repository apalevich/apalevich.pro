#!/bin/bash
PROJECT_DIR="/var/www/apalevich.pro"
LOG_FILE="/var/www/apalevich.pro/logs/deploy.log"

echo "---- Deployment started: $(date) ----" >> $LOG_FILE

cd $PROJECT_DIR || exit
git reset --hard >> $LOG_FILE 2>&1
git pull origin main >> $LOG_FILE 2>&1
npm ci >> $LOG_FILE 2>&1
npm run build >> $LOG_FILE 2>&1

echo "---- Deployment finished: $(date) ----" >> $LOG_FILE