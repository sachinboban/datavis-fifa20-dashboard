import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dashboard from "./dashboard";
import Story from "./story";
import LinkIcon from '@material-ui/icons/Link';
import fifaLogo from './img/fifa-logo.png';
import SwipeableViews from 'react-swipeable-views';
import IntroTour from "./introTour";
import Link from "@material-ui/core/Link";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={2}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function tabProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        // padding: 10,
        display: 'inline-block'
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
        display: 'inline-block'
    },
    button: {
        margin: theme.spacing(1),
    }
}));


function Navbar() {

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [isTourOpen, setIsTourOpen] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const handleOpenTour = () => {
        setIsTourOpen(true);
    };

    const handleCloseTour = () => {
        setIsTourOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img alt="" width="100px" src={fifaLogo}/>
                    <Tabs value={value} onChange={handleChange} style={{flex: 1, marginLeft: 10}}>
                        <Tab label="Dashboard" {...tabProps(0)} />
                        {/*<Tab label="Story" {...tabProps(1)} />*/}
                    </Tabs>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            style={{backgroundColor: '#1976d2'}}
                            onClick={handleOpenTour}
                        >
                            Story view
                        </Button>
                        <Link href="https://github.com/sachinboban/datavis-fifa20-dashboard/blob/master/docs/process_book.pdf" target="_blank" rel="noreferrer">
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<LinkIcon/>}
                                style={{backgroundColor: '#1976d2'}}
                            >
                                Process Book
                            </Button>
                        </Link>
                        <Link href="https://www.youtube.com/watch?v=ryY7GoNn4Dk&feature=youtu.be" target="_blank" rel="noreferrer">
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<LinkIcon/>}
                                style={{backgroundColor: '#1976d2'}}
                            >
                                Demo video
                            </Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0}>
                    <Dashboard isDemoOn={isTourOpen}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Story/>
                </TabPanel>
            </SwipeableViews>
            <IntroTour isTourOpen={isTourOpen} closeTour={handleCloseTour}/>
        </div>
    );
}

export default Navbar;
