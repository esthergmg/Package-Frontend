# Projet: PackageFrontend

Le projet package traker est une application web pour le suivi de colis. Il est détaillé en trois sous application tels que :

- Web Tracker: est une application web client destinée aux clients, leur permettant de suivre leurs colis en utilisant un identifiant de colis. L'application récupère les détails du colis via des appels d'API REST et, si le colis est en cours de livraison, établit une connexion WebSocket pour recevoir les mises à jour de la livraison en temps réel. L'application affiche les détails du colis et de la livraison, et met à jour la carte avec les emplacements source, destination et actuel de la livraison.

- Web Driver est une application client web (SPA) développée avec Angular pour permettre aux conducteurs de livraison de suivre et de mettre à jour la géolocalisation des colis en temps réel. Cette application communique avec les API du backend pour récupérer les détails des livraisons en cours et mettre à jour la géolocalisation.

- Web Admin est l'interface d'administration pour le système de suivi de colis. 


## Prérequis
Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js : https://nodejs.org (version v18.16.0 ou ultérieure)
- NPM (Node Package Manager) : Généralement installé automatiquement avec Node.js
- Angular CLI : Vous pouvez l'installer en exécutant la commande suivante dans votre terminal : npm install -g @angular/cli

## Récupération du Projet
Clonez le dépôt du projet en utilisant la commande suivante :

git clone https://github.com/your-username/Web-Tracker.git

## Installation du projet

npm install

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

## Remaining task
- Review map display functions ( I get a success code but the map doesn't display)

- Problem displaying response after package id search ( I get a success code with my datat but nothing is displayed on the front )

- Same for the web driver



