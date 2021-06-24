import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    navbarToolbar: {
        background: '#7aab7f',
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
        border: '1px solid #7d7d7d',
        borderRadius: 5,        
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
    tableCoRow: {
        
    },
    fillingCo: {
        width: '100%',
        background: '#bde7ec',
        borderColor: '#000000',
        borderRadius: 5,
        padding: '15px 15px',
    },
    fillingHeadComponent: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    fillingHeadAddTableComponent: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    chooseTable: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginBottom: '25px',
    },
    chooseTableList: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        border: '1px solid #7aab7f',
        boredRadius: 5,
    },
    chooseTableListItem: {
        display: 'flex',
        maxWidth: '250px',
    },
    fillingTableCoHead: {
        background: '#abebeb',
    },
    fillingTableCo:{
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.grey[200],
            border: '1px solid #ededee',
            boredRadius: 5,
        }
    },
    fillingTablesList: {
        padding: '10px',
    },
    fillingTable: {
        marginTop: '5px',
        border: '1px solid #ededee',
        boredRadius: 5,
        padding: '10px',
    },
    addRowFillingTable: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    fillingTableTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addSelect: {
        background: '#efffff',
        marginBottom: '10px',
        border: '1px solid #ededee',
        boredRadius: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    addSelectLeft: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    addSelectLeftUp: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
  }));