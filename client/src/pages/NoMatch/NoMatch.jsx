import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

const NoMatch = (props) => {
  const { classes, heading, message } = props;
  return (
    <>
      <div className={classes.div}>
        <Typography variant="h3" align="center" gutterBottom>
          {heading || "Not Found"}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {message || "Seems like the page you are looking after does not exist." }
        </Typography>
      </div>
    </>
  );
}

NoMatch.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(NoMatch);
