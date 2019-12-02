import React, {Component} from "react";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
import Tour from "reactour";

class IntroTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTourOpen: props.isTourOpen
        };
        this.tourConfig = [
            {
                selector: '.player-card-head',
                content: `Cristiano Ronaldo and Lionel Messi are the two greats of international soccer who perform consistently at the club and international levels.`
            },
            {
                selector: '.selected-row-1',
                content: `The 32-year old Messi has the highest overall rating of 94. He played his first official match for FC Barcelona on 
16 October 2004 and has been with the team since then, scoring a whopping 614 club goals for the team. `
            },
            {
                selector: '.selected-row-1',
                content: `Messi has won a record 6 FIFA Ballon d'or/Best FIFA Men's Player awards. He has led Barcelona to 10 La Liga titles, 4 UEFA Champions League titles and 6 Copa del Rey titles so far.`
            },
            {
                selector: '.selected-row-0',
                content: `The 34-year old Cristiano Ronaldo has the second highest overall rating of 93. He began his soccer career with Sporting CP and went on to play with 
                Manchester United, Real Madrid and Juventus scoring 608 club goals in total. He currently plays for Juventus in the Serie A league in Italy.`
            },
            {
                selector: '.selected-row-0',
                content: `Ronaldo has won 5 FIFA Ballon d'or/Best FIFA Men's Player awards and several club titles including 6 league titles, 5 UEFA Champions Leagues
                , 1 UEFA European Championship, and 1 UEFA Nations League.`
            },
            {
                selector: '.radar-chart svg g',
                content: `From the radar plot, it can be seen that Ronaldo has higher penalty skills than Messi. Proving that fact in real life, 
                 Ronaldo has scored 114 of the 139 penalties with a conversion rate of 82%. Meanwhile, Messi has scored 84 of his 110 penalties
                  with a conversion rate of 76%.`
            },
            {
                selector: '.height-comp',
                content: `Cristiano Ronaldo's tall stature (6'2'') has helped him score 100 header goals
                 whereas Messi who is 5'7'' has scored only 24 goals with his head.`
            },
            {
                selector: '.foot-comp',
                content: `Cristiano Ronaldo is right footed and has a scoring rate of 20% on his weak foot(left).
                 Messi meanwhile is left footed and only has a scoring rate of 12.5% with his weak foot(right).`
            },
            {
                selector: '.physical-comp',
                content: `Cristiano Ronaldo has higher physical skills (78) against Messi's (66).
                This is an important factor contributing to the shot power of the players. 
                As it can be seen from the radar plot, Ronaldo has higher shot power than Messi.`
            },
        ];
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isTourOpen !== this.props.isTourOpen) {
            this.setState({
                isTourOpen: this.props.isTourOpen
            })
        }
    }

    disableBody = target => disableBodyScroll(target);
    enableBody = target => enableBodyScroll(target);

    render() {
        return (
            <div>
                <Tour
                    onRequestClose={this.props.closeTour}
                    steps={this.tourConfig}
                    isOpen={this.state.isTourOpen}
                    maskClassName="mask"
                    className="helper"
                    rounded={5}
                    accentColor={"#1976d2"}
                    onAfterOpen={this.disableBody}
                    onBeforeClose={this.enableBody}
                    startAt={0}
                />
            </div>
        );
    }
}

export default IntroTour;
