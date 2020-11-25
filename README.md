# J4U WebApp Setup

* Install npm (node package manager)

* Clone the git repo :
```
    git clone https://github.com/petlab-unil/J4U-WebApp
```

* Create a .env file inside the cloned folder :
```
    cd J4U-WebApp/
    vim .env
```

* Install all packages required (specified inside packages.json) :
```
    npm i
```
* Run the server in development mode :
```
    npm run dev
```

.env template example : 

    NEXT_GRAPHQL_PROXY_URI=http://localhost:3000/api/graphql
    NEXT_GRAPHQL_PROXY_URI=http://localhost:5000/graphql
    GRAPHQL_URI=http://localhost:5000/graphql
    API_URI=http://localhost:5000
