# Northcoders News API

Instructions on how to create the environment variables for anyone who wishes to clone this project and run it locally:

Step 1: clone the repository

- git clone https://github.com/SO-1993/nc-news.git
- cd nc-news

Step 2: create environemnt files

- As the environent files (.env.\*) are not included in the repo (they are ignored when placed in .gitignore), you must create your own .env files to configure the environment vriables.
- To achieve this, refer to the steps below:
  1. create new file .env.development and paste the following: PGDATABASE=nc_news
  2. create new file .env.test and paste the following: PGDATABASE=nc_news_test
  3. check for the command '.env.\*' in .gitignore (if not present, paste it within)

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
