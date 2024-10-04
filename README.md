/home

  ├── frontend
  
  │   └── src   # React + TypeScript for you to edit!
  
  ├── backend
  
  │   └── src   # Flask code for you to edit!


When it comes to running the code, first download docker. Once you have downloaded
Docker, start the deamon and run ./build-container. This only has to be done once.
After running this command, run ./start-container. 

To run frontend code, do npm run dev while in the frontend folder. You can open up
a browser and should be able to see the website on http://localhost:5173

To run backend code, open a new terminal, enter the dev container, navigate to the
backend folder. Run source ./env/bin/activate to enter the virtual python environment
for the project. Then naviagate into src and run python3 app.py. 

Calls to http://localhost:5173/api/* are forwarded to the backend using the Vite 
development proxy. For production, we will use Nginx as a reverse proxy to achieve
this same behavior. 
