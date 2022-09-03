import React from 'react'
import "./MessageDialog.css";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(25)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.success.light,
        '&:hover': {
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '4rem',
        }
    }
}))

export default function MessageDialog(props) {

    const { messageDialog, setMessageDialog } = props;
    const classes = useStyles()

    return (

        <Dialog open={messageDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
            <IconButton disableRipple className={classes.titleIcon}>
                    <CheckCircleOutlineIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {messageDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {messageDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
              
                    <div className="view_cart_button">
                        <button
                            onClick={messageDialog.onViewCart}>
                            View Cart
                    </button>
                    </div>
                    <div className="keep_shopping_button">
                        <button
                            onClick={messageDialog.onKeepShopping}>
                            Keep Shopping
                    </button>
                    </div>
           
            </DialogActions>
        </Dialog>

    )
}