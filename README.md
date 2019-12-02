# FIFA20 Dashboard

A dashboard tool to visualize and compare the skills of soccer players based on the data from the game FIFA 20.

## Overview
The data used for the project is under the directory [src/data/][data-src]. 
Source code for the project is present in [src/][src] under which all .js files are react components created by the team. 
The stylesheets can be found under [src/css/][css-src].
The library files were installed through npm, hence all dependencies can be found in package.json

## Links
* [Project Proposal][doc-prop]
* [Process Book][doc-proc-bk]
* [Demo video][video-demo]
* [Project website][proj-website]

## Features

* The dashboard page has a table view and a player comparison card. The table view is pretty simple to use with sorting, grouping and filtering functionalities.
* Selecting a player or two will show the player comparison card with comparison radar plot and other skills.
* The comparison radar plot can show comparison between skills of players in four categories: Attack, defense, midfield and goal keeping.
The users can toggle between these categories by clicking on any of the skills that are visible on the plot.
* The story view walks the users through the famous comparison between Cristiano Ronaldo and Lionel Messi.

## Installation

Clone the repo and install dependencies using

```bash
cd datavis-fifa20-dashboard
npm install
```

## Local Usage

Start the node server using
```bash
npm start
```
Navigate to [localhost:3000/][localhost] on your browser to view the app.

[doc-prop]: docs/proposal.md
[doc-proc-bk]: docs/process_book.pdf
[raw-data]: src/data/raw.csv
[data-src]: https://www.kaggle.com/sagunsh/fifa-20-complete-player-dataset
[video-demo]: https://www.youtube.com/watch?v=ryY7GoNn4Dk&feature=youtu.be
[localhost]: localhost:3000/
[proj-website]: https://laknaren16.github.io/fifa20-dashboard/index.html
[data-src]: src/data
[src]: src/
[css-src]: src/css