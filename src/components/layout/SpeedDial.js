import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 100,
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
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

export default function SpeedDialTooltipOpen() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const handleVisibility = () => {
        setHidden((prevHidden) => !prevHidden);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            
            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}
