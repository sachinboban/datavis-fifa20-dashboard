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
import Link from '@material-ui/core/Link';
import Dashboard from "./dashboard";
import Story from "./story";
import LinkIcon from '@material-ui/icons/Link';
import fifaLogo from './img/fifa-logo.png';
import SwipeableViews from 'react-swipeable-views';

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img alt="" width="100px" src={fifaLogo}/>
                    <Tabs value={value} onChange={handleChange} style={{flex: 1, marginLeft: 10}}>
                        <Tab label="Dashboard" {...tabProps(0)} />
                        <Tab label="Story" {...tabProps(1)} />
                    </Tabs>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<LinkIcon/>}
                            style={{backgroundColor: '#1976d2'}}
                        >
                            Process Book
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<LinkIcon/>}
                            style={{backgroundColor: '#1976d2'}}
                        >
                            Demo video
                        </Button>

                        <Link href="https://github.com/sachinboban/datavis-fifa20-dashboard" target="_blank"
                              rel="noopener">
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<LinkIcon/>}
                                style={{backgroundColor: '#1976d2'}}
                            >
                                Github repo
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
                    <Dashboard/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Story/>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

export default Navbar;
