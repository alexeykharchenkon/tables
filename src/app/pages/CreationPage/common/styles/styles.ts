import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
        justifyContent: 'start',
        flexDirection: 'column',
    },
    addSelectLeftUp: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addDate: {
        background: '#efffff',
        marginBottom: '10px',
        border: '1px solid #ededee',
        boredRadius: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    addNumber: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10px',
    },
  }));