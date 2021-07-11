import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

HighlightCard.propTypes = {};
const useStyles = makeStyles({
  wrapper: props => {
    if (props.type === 'cases') {
      return { borderLeft: '5px solid #c9302c' };
    }
    if (props.type === 'recovered') {
      return { borderLeft: '5px solid #28a745' };
    } else {
      return { borderLeft: '5px solid gray' };
    }
  },
  title: {
    fontSize: 18,
    marginBottom: 5
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

function HighlightCard(props) {
  const { notableNumber } = props;
  const { type, title, number } = notableNumber;
  const styles = useStyles({ type });
  return (
    <Card className={styles.wrapper}>
      <CardContent>
        <Typography component="p" variant="body2" className={styles.title}>
          {title}
        </Typography>
        <Typography component="span" variant="body2" className={styles.number}>
          {number}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HighlightCard;
