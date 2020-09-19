import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const useStyles = makeStyles((theme) => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    exampleWrapper: {
        position: 'relative',
        marginTop: theme.spacing(3),
        height: 380,
    },
    radioGroup: {
        margin: theme.spacing(1, 0),
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
}));

const actions = [
    { icon: <FontAwesomeIcon icon="test" />, name: 'Test' },
    { icon: <FontAwesomeIcon icon="pills" />, name: 'Medicication' },
    { icon: <FontAwesomeIcon icon="allergies" />, name: 'Allergies' },
    { icon: <FontAwesomeIcon icon="comment-medical" />, name: 'Diagnosis' },
    { icon: <FontAwesomeIcon icon="procedures" />, name: 'Procedure' },
    { icon: <FontAwesomeIcon icon="calendar" />, name: 'Appointment' }
];

export default function SpeedDials() {
    const classes = useStyles();
    const [direction, setDirection] = React.useState('up');
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const handleDirectionChange = (event) => {
        setDirection(event.target.value);
    };

    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <FormControlLabel
                control={<Switch checked={hidden} onChange={handleHiddenChange} color="primary" />}
                label="Hidden"
            />
            <FormLabel className={classes.radioGroup} component="legend">
                Direction
            </FormLabel>
            <RadioGroup
                aria-label="direction"
                name="direction"
                value={direction}
                onChange={handleDirectionChange}
                row
            >
                <FormControlLabel value="up" control={<Radio />} label="Up" />
                <FormControlLabel value="right" control={<Radio />} label="Right" />
                <FormControlLabel value="down" control={<Radio />} label="Down" />
                <FormControlLabel value="left" control={<Radio />} label="Left" />
            </RadioGroup>
            <div className={classes.exampleWrapper}>
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    className={classes.speedDial}
                    hidden={hidden}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction={direction}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={handleClose}
                        />
                    ))}
                </SpeedDial>
            </div>
        </div>
    );
}