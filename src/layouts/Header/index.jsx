import {
  AppBar,
  Button,
  CssBaseline,
  Dialog,
  DialogContent,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme
} from '@material-ui/core';
import { AccountCircle, Close } from '@material-ui/icons';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../../components/Login';
import { checkToken } from '../../utils/localStorage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  title: {
    flexGrow: 1
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));
const drawerWidth = 240;
function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const history = useHistory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const handleModalOpen = () => {
    setIsDialogOpen(true);
  };
  const handleModalClose = () => {
    setIsDialogOpen(false);
  };
  const navigateHomePage = () => {
    history.push('/');
  };
  const navigateNewsPage = () => {
    history.push('/news');
  };
  const navigateRegisterPage = () => {
    history.push('/register');
  };
  const handleMenuOpen = e => {
    setIsMenuOpen(e.currentTarget);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(null);
  };
  const navigateProfile = () => {
    history.push('/profile');
  };
  const handleLogoutClick = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    enqueueSnackbar('Đăng xuất thành công', { variant: 'success' });
    history.push('/news');
  };
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {checkToken() && (
        <List>
          <ListItem button key="Home" onClick={navigateHomePage}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      )}
      <Divider />
      <List>
        <ListItem button key="News" onClick={navigateNewsPage}>
          <ListItemIcon>
            <BurstModeIcon />
          </ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>
      </List>
      <List>
        <ListItem button key="Register" onClick={navigateRegisterPage}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="secondary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {!checkToken() && (
            <Button color="inherit" onClick={handleModalOpen}>
              Login
            </Button>
          )}
          {checkToken() && (
            <IconButton onClick={handleMenuOpen} style={{ color: 'white' }}>
              <AccountCircle color="inherit" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={isMenuOpen}
        keepMounted
        open={Boolean(isMenuOpen)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={navigateProfile}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <Dialog
        open={isDialogOpen}
        onClose={handleModalClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <IconButton className={classes.closeButton} onClick={handleModalClose}>
          <Close></Close>
        </IconButton>
        <DialogContent>
          {/* {mode === "register" && ( */}
          <>
            <Login closeDialog={handleModalClose} />
          </>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
