import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { faVial } from '@fortawesome/free-solid-svg-icons';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import { faAllergies } from '@fortawesome/free-solid-svg-icons';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import { faProcedures } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'absolute',
    bottom: '4%',
    right: '3%',
    zIndex: theme.zIndex.drawer + 2,
  },
  backDrop: {
    color: 'rgba(0, 0, 0, 1.0)',
  },
}));

const SpeedDialToolTip = ({ setCurrentForm }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const actions = [
    {
      icon: (
        <FontAwesomeIcon icon={faVial} onClick={() => setCurrentForm('Test')} />
      ),
      name: 'Test',
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faPills}
          onClick={() => setCurrentForm('Medication')}
        />
      ),
      name: 'Medication',
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faAllergies}
          onClick={() => setCurrentForm('Allergy')}
        />
      ),
      name: 'Allergy',
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faCommentMedical}
          onClick={() => setCurrentForm('Diagnosis')}
        />
      ),
      name: 'Diagnosis',
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faProcedures}
          onClick={() => setCurrentForm('Procedure')}
        />
      ),
      name: 'Procedure',
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faCalendar}
          onClick={() => setCurrentForm('Appointment')}
        />
      ),
      name: 'Appointment',
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = name => {
    setOpen(false);
    setCurrentForm(name);
  };

  const style = {
    zIndex: 100,
  };

  return (
    <div className={classes.root}>
      <Backdrop style={style} open={open} />
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleClick(action.name)}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default SpeedDialToolTip;
