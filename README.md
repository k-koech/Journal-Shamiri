# KKBlog
#### Personal Journaling App, 10/07/2023
#### **By Kelvin Kipchumba**
## Project Description
    The goal of this project is to develop a mobile application and a backend service for personal journaling. Users should be able to create, manage, and categorize journal entries, as well as view summaries of their entries over specific periods.
    
## Setup/Installation Requirements
    - Download a file in the code section to the desired folder
    - Extract the files
    - Open the folder with vs code.

##### For Backend (Django)
###### Backend (Django REST Framework App)
- Python (3.7 or higher recommended)
- Pipenv

- Open a new terminal in VScode,  Navigate to backend folder ```cd backend```
- Run ```pipenv install``` to install its packages, then run ```pipenv shell``` to open the environment
- Run ```python manage.py runserver 0.0.0.0:8000``` in the terminal to strt your server.
- Go to your main terminal na run  ```ifconfig``` for linux OR ```ipconfig``` and find your network address i.e somewhere near ``inet`` in the data that popped up i.e for me it is ``192.168.100.6``. Now copy this and add the 8000 as the port number and make a url like this i.e ```http://192.168.100.6:8000/api```
- Copy this url and navigate to the client folder- then config.json and replace the server url there to this url i.e to
    ```
    {
    "server_url": "http://192.168.100.6:8000/api"
    } 
    ```
- And the backend is ready 


##### For Frontend(Expo App)
###### Prerequisites
- Node.js and npm

- Open your terminal, ```cd client ``` and install dependencies using ```npm install```
- Then run ```npm start```
- Open your expo app in your phone and scan the QRcode taht it appeared after running npm start and you are good to go

       

## Known Bugs
    Application works perfectly well, no bugs.

## Technologies used
##### Frontend
    - Expo React Native
    - Slider
    - React 
    - Google Fonts
    - TailwindCSS

##### Backend
    - Django
    - Django Rest Framework
    - Simple JWT
    - SQLite3 for testing purposes

## Support and contact details
    - email :: kelvinkipchumba002@gmail.com
    - phone :: +254725801772

### License
*Licenced under the [MT-licence](https://github.com/k-koech/Journal-Shamiri/blob/master/LICENSE.md)*
Copyright (c) 2024 **Kelvin Kipchumba
