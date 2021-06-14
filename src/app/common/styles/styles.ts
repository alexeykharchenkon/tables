import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    navbarToolbar: {
        background: '#7bae7ec',
    },
    navbarButton: {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: '#ffffff',
        textShadow: "#000000",
    },
    creationCo: {
        width: '100%',
        background: '#bde7ec',
        borderColor: '#000000',
        borderRadius: 5,
        padding: '15px 15px',
    },
    creationCoUp: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableCo: {
        background: '#cbebeb',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '15px',
    },
    tableCoHead: {
        background: '#abebeb',
    },
    tableCoUp: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10px',
    },
    tableCoSelect: {
        width: '200px',
    },
  }));