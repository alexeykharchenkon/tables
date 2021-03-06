import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
    fillingTableTable: {
        display: 'flex',
        flexDirection: 'column',
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
  }));