from selenium import webdriver
from bs4 import BeautifulSoup
import csv
import pandas as pd

#class to represent a team
class Team:
    def __init__(self):
        self.name = ""
        self.league = ""
        self.ATT = 0
        self.MID = 0
        self.DEF = 0
        self.OVR = 0
        self.icon = ""

    def __iter__(self):
        return iter([self.name, self.league, self.ATT, self.MID, self.DEF, self.OVR, self.icon])

    def __str__(self):
        return self.name+" "+self.league+" ATT:"+str(self.ATT)+" MID:"+str(self.MID)+" DEF:"+str(self.DEF)+" OVR:"+str(self.OVR)

driver=webdriver.Chrome("C:/Program Files (x86)/Google/Chrome/Application/chromedriver") #configure webdriver to use as Chrome browser

teams=[] #a list of team objects
for i in range(1, 24):
    driver.get("https://www.fifaindex.com/teams/"+str(i)+"/")
    content = driver.page_source #load webapage html content
    soup = BeautifulSoup(content, features="html.parser")

    try:
        for row in soup.findAll('tr'): #from each row
            team_curr = Team() #create team object

            #Icon Link
            cols = row.findAll("td")
            if(cols==None or len(cols)==0):
                continue
            col_icon = cols[0].find('a')
            if(col_icon!=None):
                team_curr.icon = (col_icon.find('img'))["src"]

            #Team Name
            col_name = row.find("td", attrs={"data-title":"Name"})
            if(col_name!=None):
                team_curr.name = (col_name.find('a', attrs={"class":"link-team"}).text)

            #League Name
            col_league = row.find("td", attrs={"data-title":"League"})
            if(col_league!=None):
                team_curr.league = (col_league.find('a', attrs={"class":"link-league"}).text)

            #Attack
            col_att = row.find("td", attrs={"data-title":"ATT"})
            if(col_att!=None):
                team_curr.ATT = int(col_att.find('span', attrs={"class":"badge"}).text)

            #Midfield
            col_mid = row.find("td", attrs={"data-title":"MID"})
            if(col_mid!=None):
                team_curr.MID = int(col_mid.find('span', attrs={"class":"badge"}).text)

            #Defense
            col_def = row.find("td", attrs={"data-title":"DEF"})
            if(col_def!=None):
                team_curr.DEF = int(col_def.find('span', attrs={"class":"badge"}).text)

            #Overall
            col_ovr = row.find("td", attrs={"data-title":"OVR"})
            if(col_ovr!=None):
                team_curr.OVR = int(col_ovr.find('span', attrs={"class":"badge"}).text)

            if(len(team_curr.name)!=0):
                teams.append(team_curr)
    except Exception as e:
        print(e)
    finally:
        driver.quit()
        driver=webdriver.Chrome("C:/Program Files (x86)/Google/Chrome/Application/chromedriver")

driver.quit()

#write team objects from list to csv file
with open("team-league.csv", 'w', newline="", encoding="utf-8") as csv_file:
    wr = csv.writer(csv_file, delimiter=',')
    wr.writerow(["Name", "League", "ATT", "MID", "DEF", "OVR", "Logo"])
    for t in teams:
        wr.writerow(t)


