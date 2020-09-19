import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { faVial } from '@fortawesome/free-solid-svg-icons';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import { faAllergies } from '@fortawesome/free-solid-svg-icons';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import { faProcedures } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: 'absolute',
        bottom: '4%',
        right: '3%',
        zIndex: theme.zIndex.drawer + 2,
    },
    backDrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const actions = [
    { icon: <FontAwesomeIcon icon={faVial} />, name: 'Test' },
    { icon: <FontAwesomeIcon icon={ faPills } />, name: 'Medicication' },
    { icon: <FontAwesomeIcon icon={faAllergies} />, name: 'Allergies' },
    { icon: <FontAwesomeIcon icon={faCommentMedical} />, name: 'Diagnosis' },
    { icon: <FontAwesomeIcon icon={faProcedures} />, name: 'Procedure' },
    { icon: <FontAwesomeIcon icon={faCalendar} />, name: 'Appointment' }
];

export default function SpeedDialTooltipOpen() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

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
